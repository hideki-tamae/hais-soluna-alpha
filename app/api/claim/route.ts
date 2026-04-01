// app/api/claim/route.ts
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

    // ▼▼▼ 修正ポイント：findUnique ではなく findFirst に変更しました ▼▼▼
    const existingClaim = await prisma.claim.findFirst({
      where: { walletAddress: walletAddress },
    });
    // ▲▲▲▲▲▲

    if (existingClaim) {
      return NextResponse.json(
        { error: 'このウォレットは既に申請済みです。お一人様1回までです。' },
        { status: 429 }
      );
    }

    // ID生成
    const claimId = `claim_${Math.random().toString(36).substring(2, 10)}`;
    
    const newClaim = await prisma.claim.create({
      data: {
        id: claimId,
        walletAddress: walletAddress,
        passphrase: passphrase,
        status: 'approved',
      },
    });

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