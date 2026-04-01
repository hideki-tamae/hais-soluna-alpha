// app/api/admin/logout/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'admin_session';

export async function POST() {
  try {
    // Cookieを削除（期限切れにしてブラウザから消去）
    cookies().set(COOKIE_NAME, '', { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 0, // 有効期限をゼロにする
      path: '/',
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}