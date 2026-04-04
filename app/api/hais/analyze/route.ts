// app/api/hais/analyze/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // 既存のprismaインスタンスを使用

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      walletAddress,
      omegaScore,
      neuralState,
      logicVersion = "Satsuma-v1.1", // ★ デフォルト値を設定
      f0Hz,
      jitterPct,
      shimmerPct,
      hnrDb
    } = body;

    if (!walletAddress || omegaScore === undefined) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }

    // 1. 記憶の引き出し（ユーザー特定・新規作成）
    const user = await prisma.user.upsert({
      where: { walletAddress },
      update: {},
      create: { walletAddress },
    });

    // 2. 新たな神経状態（ω）の刻印
    const scan = await prisma.scanHistory.create({
      data: {
        userId: user.id,
        omegaScore,
        neuralState,
        logicVersion, // ★ Satsuma-v1.1を刻印
        f0Hz,
        jitterPct,
        shimmerPct,
        hnrDb,
      },
    });

    // 3. 茹でガエルの罠（Trap）検知ロジック
    // キャリブレーションデータを取得または初期化
    let calibration = await prisma.peakCalibration.findUnique({
      where: { userId: user.id }
    });

    if (!calibration) {
      // 初回スキャンの場合は、現在のスコアを暫定Peakとする
      calibration = await prisma.peakCalibration.create({
        data: {
          userId: user.id,
          peakScore: omegaScore,
          lastScore: omegaScore,
        }
      });
    } else {
      // 既存ユーザーの場合：Peakとの比較
      const DEGRADATION_THRESHOLD = 0.7; // 30%以上の低下を検知
      const isTrapped = omegaScore < (calibration.peakScore * DEGRADATION_THRESHOLD);

      // スコアがPeakを更新した場合は、PeakScoreを更新（ただしTrap中ではない場合）
      const newPeakScore = Math.max(calibration.peakScore, omegaScore);

      // キャリブレーションの更新
      calibration = await prisma.peakCalibration.update({
        where: { userId: user.id },
        data: {
          peakScore: newPeakScore,
          lastScore: omegaScore,
          isTrapped: isTrapped,
          proposedSync: isTrapped, // ★ Trapされた場合のみ「波紋（SyncProposal）」をONにする
          syncReasonJa: isTrapped
            ? `本来のあなた（${calibration.peakScore.toFixed(0)}）より低下しています。再統合が必要です。`
            : null
        }
      });
    }

    // 4. 大脳（CrewAI Pythonバックエンド）への解析リクエスト
    let insightMessage = "AI Insight is preparing...";
    const crewAiUrl = process.env.CREWAI_BACKEND_URL || 'http://127.0.0.1:8000/analyze';

    try {
      const pyResponse = await fetch(crewAiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          omegaScore: omegaScore,
          neuralState: neuralState,
          isTrapped: calibration.isTrapped // ★ 脳にもTrap状態を通知
        })
      });

      if (pyResponse.ok) {
        const pyData = await pyResponse.json();
        if (pyData.success) {
          insightMessage = pyData.insight;
        }
      }
    } catch (pyError) {
      console.error("Failed to reach Python Brain:", pyError);
      insightMessage = "The Neural Architect is currently asleep. Please wake the Python server.";
    }

    // 5. フロントエンドへ結果を返す
    return NextResponse.json({
      success: true,
      scan,
      calibration: {
        isTrapped: calibration.isTrapped,
        proposedSync: calibration.proposedSync,
        reason: calibration.syncReasonJa
      },
      insight: insightMessage,
      message: calibration.isTrapped ? "TRAP_DETECTED: Proposal Active" : "Neural state recorded."
    });

  } catch (error: any) {
    console.error("HAIS Next.js API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}