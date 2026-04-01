import { NextRequest, NextResponse } from 'next/server';

const SECRET_PASSWORD = process.env.HAIS_PASSWORD || 'inazumahideki2030';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password !== SECRET_PASSWORD) {
      return NextResponse.json(
        { error: 'アクセスキーが正しくありません' },
        { status: 401 }
      );
    }

    const token = Buffer.from(JSON.stringify({ verified: true, timestamp: Date.now() })).toString('base64');

    return NextResponse.json({
      success: true,
      token,
      message: '認証成功'
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: '認証処理でエラーが発生しました' },
      { status: 500 }
    );
  }
}
