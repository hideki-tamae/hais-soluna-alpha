import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      walletAddress,
      omegaScore, // ✅ コメントアウトを解除。これがないと計算ができません。
      neuralState,
      logicVersion = "Satsuma-v1.1",
      f0Hz,
      jitterPct,
      shimmerPct,
      hnrDb
    } = body;

    // バリデーション：omegaScoreが0の場合も考慮し、undefinedチェックを厳密に
    if (!walletAddress || omegaScore === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // 1. 記憶の引き出し
    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress, baseAcesScore: 4.0 },
    });

    // 2. 神経状態の刻印
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

    // 3. 茹でガエルの罠（Trap）検知ロジック
    let calibration = await prisma.peakCalibration.findUnique({
      where: { userId: user.id }
    });

    if (!calibration) {
      calibration = await prisma.peakCalibration.create({
        data: {
          userId: user.id,
          peakScore: omegaScore,
          isTrapped: false,
          proposedSync: false,
        }
      });
    } else {
      const DEGRADATION_THRESHOLD = 0.7;
      const isTrapped = omegaScore < (calibration.peakScore * DEGRADATION_THRESHOLD);
      const newPeakScore = Math.max(calibration.peakScore, omegaScore);

      calibration = await prisma.peakCalibration.update({
        where: { userId: user.id },
        data: {
          peakScore: newPeakScore,
          isTrapped: isTrapped,
          proposedSync: isTrapped, // ★ ここがUI表示のスイッチ
          syncReasonJa: isTrapped
            ? `本来のあなた（${calibration.peakScore.toFixed(0)}）より低下しています。再統合を推奨。`
            : null
        }
      });
    }

    // 4. 大脳（Python側）への解析リクエスト（非同期）
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