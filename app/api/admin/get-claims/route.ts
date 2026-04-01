import { NextResponse } from 'next/server';

// 🚨 エラー回避：動的レンダリングを強制
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // DB接続エラーを回避するため、空のリストを返します
  return NextResponse.json({
    success: true,
    claims: [], 
    message: "DB connection temporarily disabled",
  });
}