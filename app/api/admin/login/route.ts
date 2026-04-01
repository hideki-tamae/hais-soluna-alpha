// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "soluna_admin_secret_key_2026";
const COOKIE_NAME = 'admin_session';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (password === ADMIN_PASSWORD) {
      // 1. 認証成功：セッションCookieを発行
      const sessionToken = ADMIN_PASSWORD; 
      
      cookies().set(COOKIE_NAME, sessionToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 24 * 7, // 7日間有効 
        path: '/',
      });

      return NextResponse.json({ success: true }, { status: 200 });

    } else {
      // 認証失敗
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Server error during login' }, { status: 500 });
  }
}