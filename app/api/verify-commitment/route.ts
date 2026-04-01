import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// ★修正点: ここで new OpenAI() をしない（削除）

export async function POST(req: Request) {
  try {
    // ★修正点: APIが呼ばれた瞬間に初めて初期化する（これでビルドエラー回避）
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const formData = await req.formData();
    // フロントエンドからの揺れを吸収
    const file = formData.get("image") as File || formData.get("file") as File;
    const type = formData.get("type") as string || "amazon"; 

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`;

    console.log(`[API] Processing Claim Type: ${type}`);

    let systemPrompt = "";

    if (type === 'kindle') {
      // Kindle Unlimited用プロンプト
      systemPrompt = `
        あなたはKindle Unlimitedの利用監査官です。
        画像が「Kindleのライブラリ画面」または「本の読み放題対象表示」であることを確認してください。
        出力はJSON形式のみ: { "success": boolean, "rewardAmount": 50, "reason": string }
        条件を満たせば success: true, rewardAmount: 50 としてください。
      `;
    } else {
      // Amazon History (Re-Verse購入) 用の「超・厳格」プロンプト
      systemPrompt = `
        あなたはAmazon注文履歴の冷酷な監査官です。
        あなたの目的は「承認すること」ではなく、**「欠陥を見つけて拒否すること」**です。

        画像全体をスキャンし、以下の【厳格な手順】に従ってJSONのみを出力してください。

        【手順1: 危険信号の抽出】
        画像内に存在する「赤色またはオレンジ色の文字」「警告マーク」「帯状のメッセージ」をすべて読み取り、テキスト化してください。
        特に以下の文字列が含まれていないか確認してください：
        - "Payment revision needed"
        - "Revise payment method"
        - "Action needed"
        - "Payment failed"
        - "支払いの修正が必要"
        - "お支払い方法を更新"
        - "アクションが必要です"

        【手順2: 判定（絶対ルール）】
        手順1で警告テキストが1文字でも検出された場合、書籍名が何であっても、金額がいくらであっても、**即座に「否認」**してください。
        
        【手順3: 承認の条件（手順1がクリアされた場合のみ）】
        以下がすべて揃っている場合のみ承認します：
        1. 書籍名に "Re-Verse Civilization" または "Hideki Tamae" が含まれる。
        2. 金額 "3,880" が含まれる。
        3. "Order Details" か "Receipt" または "領収書" の文字がある。

        【出力フォーマット（JSON）】
        {
          "detected_warnings": "手順1で見つけた警告文（なければ null）",
          "is_payment_failed": boolean, 
          "success": boolean,
          "rewardAmount": number,
          "reason": "ユーザーへの表示メッセージ"
        }

        ※警告がある場合: success: false, rewardAmount: 0, reason: "決済未完了: [警告文] が検出されました。"
        ※承認の場合: success: true, rewardAmount: 500
      `;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o", 
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: base64Image } },
          ],
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0, // 厳格な判定のためランダム性を排除
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No response from AI");

    const result = JSON.parse(content);
    console.log(`[API] AI Verdict:`, result); 

    return NextResponse.json(result);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}