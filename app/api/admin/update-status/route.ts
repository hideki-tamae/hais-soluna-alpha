import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // ★PrismaClientをインポート

// PrismaClientをインスタンス化
const prisma = new PrismaClient();

// ステータス更新用の POST リクエストを処理
export async function POST(request: Request) {
  console.log("⚡️API: /api/admin/update-status called (POST)");

  try {
    // 1. ブラウザから送られてきたデータ（IDとStatus）を受け取る
    const { id, status } = await request.json(); 
    console.log(`📝 Request received: ID=${id}, Status=${status}`);

    // 2. データチェック
    // statusが 'Approved' または 'Rejected' のいずれかであることを確認
    if (!id || (status !== "Approved" && status !== "Rejected")) {
       return NextResponse.json(
        { success: false, error: "IDまたはステータスが不正です" },
        { status: 400 } // Bad Request
      );
    }
    
    // 3. データベースを実際に書き換えます！
    // データベースの該当レコードを更新
    const updatedClaim = await prisma.claim.update({
      where: { id: id },
      // DBのenumは小文字（'approved'/'rejected'）なので、小文字に変換して更新
      data: { status: status.toLowerCase() }, 
    });

    console.log(`✅ Claim ID ${id} status updated to ${status}`);

    // 4. 更新結果を返信
    return NextResponse.json({
      success: true,
      message: `ID:${id} のステータスを ${status} に更新しました`,
      updatedClaim: updatedClaim
    });

  } catch (error) {
    console.error("❌ DB Update Error:", error);
    // Prismaのエラー（例：IDが見つからないなど）もここでキャッチされる
    return NextResponse.json(
      { success: false, error: "サーバー側でデータベース更新中にエラーが発生しました" },
      { status: 500 }
    );
  }
}