// app/api/claim-wallet/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { signToken } from '@/lib/hmac'; // すでにある想定
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs'; 

// ---- Supabase クライアント（サーバー専用） ----
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { persistSession: false },
      })
    : null;

// ---- Cloudflare Turnstile 検証 ----
async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // 環境変数が未設定なら、バイパス（本番で使うなら必ず設定推奨）
    return { success: true };
  }

  const body = new URLSearchParams();
  body.append('secret', secret);
  body.append('response', token);

  const res = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body,
    }
  );

  if (!res.ok) {
    return { success: false };
  }

  return res.json();
}

export async function POST(req: NextRequest) {
  try {
    // ① クレーム受付フラグ
    if (process.env.CLAIM_OPEN !== '1') {
      return NextResponse.json(
        { message: 'Claim not open yet.' },
        { status: 403 }
      );
    }

    const body = (await req.json()) as {
      soluna?: string;
      phrase?: string;
      address?: string;
      wallet?: string;
      turnstile?: string;
    };

    const soluna = (body?.soluna || '').trim();
    const phrase = (body?.phrase || '').trim();
    const turnstile = (body?.turnstile || '').trim();
    const wallet = (body?.address || body?.wallet || '').trim();

    // ② 入力バリデーション
    if (!wallet) {
      return NextResponse.json(
        { message: 'Wallet address is required.' },
        { status: 400 }
      );
    }

    if (!soluna) {
      return NextResponse.json(
        { message: 'SOLUNA literal is required.' },
        { status: 400 }
      );
    }

    if (!phrase) {
      return NextResponse.json(
        { message: 'Passphrase is required.' },
        { status: 400 }
      );
    }

    // ③ SOLUNA の文字列チェック（例: 「SOLUNA」）
    const expectedSoluna =
      (process.env.NEXT_PUBLIC_SOLUNA_LITERAL || 'SOLUNA').trim();

    if (soluna.toUpperCase() !== expectedSoluna.toUpperCase()) {
      return NextResponse.json(
        { message: 'Invalid SOLUNA literal.' },
        { status: 400 }
      );
    }

    // ④ パスフレーズチェック
    const pass = (process.env.CLAIM_PASSPHRASE || '').trim();
    if (!pass) {
      console.error('CLAIM_PASSPHRASE is not set.');
      return NextResponse.json(
        { message: 'Server misconfiguration.' },
        { status: 500 }
      );
    }

    if (phrase !== pass) {
      return NextResponse.json(
        { message: 'Invalid passphrase.' },
        { status: 400 }
      );
    }

    // ⑤ Turnstile 検証（使っていなければ body.turnstile を空で送る or 省略でOK）
    if (turnstile) {
      const turnstileResult = await verifyTurnstile(turnstile);
      if (!turnstileResult?.success) {
        return NextResponse.json(
          { message: 'Turnstile verification failed.' },
          { status: 400 }
        );
      }
    }

    // ⑥ HMACトークン生成
    const secret = process.env.SIGNING_SECRET;
    if (!secret) {
      console.error('SIGNING_SECRET is not set.');
      return NextResponse.json(
        { message: 'Server misconfiguration.' },
        { status: 500 }
      );
    }

    const now = Math.floor(Date.now() / 1000);
    const exp = now + 60 * 10; // 10分有効

    const payload = {
      wallet,
      soluna: expectedSoluna,
      iat: now,
      exp,
    };

    const token = await signToken(payload, secret);

    // ⑦ Supabase へログを保存（テーブル名・カラムは後述の通り）
    if (supabase) {
      const ip =
        req.headers.get('x-forwarded-for') ||
        req.headers.get('cf-connecting-ip') ||
        null;
      const userAgent = req.headers.get('user-agent') || null;

      const { error } = await supabase.from('soluna_claims').insert({
        wallet,
        phrase,
        soluna_literal: expectedSoluna,
        token,
        ip,
        user_agent: userAgent,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Supabase insert error:', error);
        // ログ保存失敗は致命的ではないので、レスポンスは成功のまま返す
      }
    } else {
      console.warn('Supabase client is not initialized.');
    }

    // ⑧ フロント側へトークン返却
    return NextResponse.json(
      {
        token,
        expiresIn: 600,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Claim wallet error:', err);
    return NextResponse.json(
      { message: 'Internal server error.' },
      { status: 500 }
    );
  }
}
