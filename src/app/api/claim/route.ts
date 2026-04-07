// src/app/api/claim/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// TypeScriptの型エラー回避用のおまじない
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();

// process.envの型チェックを回避
const env = process.env as any;

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const PASSPHRASE = env.CLAIM_PASSPHRASE || "SOLUNA2025";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 入力データが「文字列」であることを保証する
    const walletAddress = String(body.walletAddress);
    const passphrase = String(body.passphrase);

    // バリデーション
    if (!walletAddress || !passphrase || walletAddress === 'undefined' || passphrase === 'undefined') {
      return NextResponse.json(
        { error: 'ウォレットアドレスと合言葉は必須です' },
        { status: 400 }
      );
    }

    // 合言葉チェック
    if (passphrase !== PASSPHRASE) {
      return NextResponse.json(
        { error: '合言葉が間違っています' },
        { status: 403 }
      );
    }

    // 既存の申請をチェック
    const existingClaim = await prisma.claim.findFirst({
      where: { walletAddress: walletAddress },
    });

    if (existingClaim) {
      return NextResponse.json(
        { error: 'このウォレットは既に申請済みです。お一人様1回までです。' },
        { status: 429 }
      );
    }

    // ▼▼▼ 修正ポイント：Userモデルとの紐付けと必須項目(amount)の追加 ▼▼▼
    
    // 1. Userが未登録なら作成、登録済みなら取得
    const user = await prisma.user.upsert({
      where: { walletAddress: walletAddress },
      update: {},
      create: { walletAddress: walletAddress, baseAcesScore: 4.0 },
    });

    // ID生成
    const claimId = `claim_${Math.random().toString(36).substring(2, 10)}`;
    
    // 2. 必須項目を満たしてClaimデータを生成
    const newClaim = await prisma.claim.create({
      data: {
        id: claimId,
        userId: user.id,             // ✅ 追加: 誰の申請かをUserテーブルと紐付け
        walletAddress: walletAddress,
        passphrase: passphrase,
        amount: 100,                 // ✅ 追加: 付与するトークン量（ここでは100に設定）
        status: 'approved',
      },
    });
    // ▲▲▲▲▲▲

    return NextResponse.json({ 
      success: true, 
      id: newClaim.id,
      message: '申請を受け付けました' 
    });

  } catch (error) {
    console.error('Claim API Error:', error);
    return NextResponse.json(
      { error: 'サーバー内部エラーが発生しました' },
      { status: 500 }
    );
  }
}