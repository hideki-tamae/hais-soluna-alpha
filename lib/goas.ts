/**
 * Google Apps Script クライアント
 * HMAC署名付きでGoogle Apps Scriptへリクエストを送信
 */

import { signToken } from './hmac';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbz3kaMwjpQy5iX0e4AHNc0B_a7ujEkre8xtbCDamlOTBiWjmjiV-nZxlRJKBHWxs-QF/exec';
const SECRET_KEY = process.env.HAIS_SECRET_KEY || 'your-secret-key';

export async function sendToGAS(data: Record<string, any>) {
  try {
    // ペイロード作成
    const payload = {
      ...data,
      timestamp: new Date().toISOString()
    };

    // 署名生成
    const signature = await signToken(payload, SECRET_KEY);

    // Google Apps Script にPOST
    const response = await fetch(`${GAS_URL}?signature=${encodeURIComponent(signature)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`GAS API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('GAS request failed:', error);
    throw error;
  }
}
