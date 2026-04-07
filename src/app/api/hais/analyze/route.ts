import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      walletAddress,
      omegaScore,
      neuralState,
      logicVersion = "Satsuma-v1.1",
      f0Hz,
      jitterPct,
      shimmerPct,
      hnrDb
    } = body;

    // バリデーション
    if (!walletAddress || omegaScore === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // 1. ユーザーの取得または作成
    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress, baseAcesScore: 4.0 },
    });

    // 2. スキャン履歴の保存
    const scan = await prisma.scanHistory.create({
      data: {
        userId: user.id,
        omegaScore,
        neuralState,
        logicVersion,
        f0Hz,
        jitterPct,
        shimmerPct,
        hnrDb,
      },
    });

    // 3. 茹でガエルの罠（Trap）検知 & Calibration 更新
    let calibration = await prisma.peakCalibration.findUnique({
      where: { userId: user.id }
    });

    if (!calibration) {
      // 初回計測時
      calibration = await prisma.peakCalibration.create({
        data: {
          userId: user.id,
          peakScore: omegaScore,
          lastScore: omegaScore, // ✅ 初回値を保存
          isTrapped: false,
          proposedSync: false,
        }
      });
    } else {
      // 2回目以降の更新
      const DEGRADATION_THRESHOLD = 0.7;
      const isTrapped = omegaScore < (calibration.peakScore * DEGRADATION_THRESHOLD);
      const newPeakScore = Math.max(calibration.peakScore, omegaScore);

      calibration = await prisma.peakCalibration.update({
        where: { userId: user.id },
        data: {
          peakScore: newPeakScore,
          lastScore: omegaScore, // ✅ 最新の値を常に上書き保存
          isTrapped: isTrapped,
          proposedSync: isTrapped,
          syncReasonJa: isTrapped
            ? `本来のあなた（${calibration.peakScore.toFixed(0)}）より低下しています。再統合を推奨。`
            : null
        }
      });
    }

    // 4. AI解析（Python側）への非同期リクエスト
    let insightMessage = "AI Architect is processing...";
    try {
      const pyResponse = await fetch(process.env.CREWAI_BACKEND_URL || 'http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ omegaScore, neuralState, isTrapped: calibration.isTrapped })
      });
      if (pyResponse.ok) {
        const pyData = await pyResponse.json();
        insightMessage = pyData?.insight || insightMessage;
      }
    } catch (e) {
      console.warn("Python Brain offline - proceeding with local result.");
    }

    return NextResponse.json({
      success: true,
      scan,
      calibration: {
        isTrapped: calibration.isTrapped,
        proposedSync: calibration.proposedSync,
        reason: calibration.syncReasonJa
      },
      insight: insightMessage
    });

  } catch (error: any) {
    console.error("HAIS API Critical Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}