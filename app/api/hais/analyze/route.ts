import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      walletAddress, 
      omegaScore, 
      neuralState, 
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
        f0Hz,
        jitterPct,
        shimmerPct,
        hnrDb,
      },
    });

    // 3. 大脳（CrewAI Pythonバックエンド）への解析リクエスト
    let insightMessage = "AI Insight is preparing...";
    const crewAiUrl = process.env.CREWAI_BACKEND_URL || 'http://127.0.0.1:8000/analyze';

    try {
      // 8000番ポートで待機しているPythonサーバーへ、必要な2つの要素だけを狙撃送信
      const pyResponse = await fetch(crewAiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          omegaScore: omegaScore,
          neuralState: neuralState
        })
      });

      if (pyResponse.ok) {
        const pyData = await pyResponse.json();
        if (pyData.success) {
          // The Guardian of Meaningからの言葉（インサイト）を受け取る
          insightMessage = pyData.insight;
        } else {
          console.error("Python API internal error:", pyData.error);
        }
      } else {
         console.error("Python API responded with status:", pyResponse.status);
      }
    } catch (pyError) {
      // 脳（Python）がダウンしていても、身体（DB保存）の処理は止めない（耐障害性の担保）
      console.error("Failed to reach Python Brain:", pyError);
      insightMessage = "The Neural Architect is currently asleep. Please wake the Python server.";
    }

    // 4. フロントエンド（VoiceScanner）へ結果を返す
    return NextResponse.json({
      success: true,
      scan,
      insight: insightMessage,
      message: "Neural state recorded and analyzed."
    });

  } catch (error: any) {
    console.error("HAIS Next.js API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}