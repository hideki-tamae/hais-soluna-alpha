import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. データ取得機能 (GET)
// 管理画面のリスト表示用
export async function GET() {
  try {
    const claims = await prisma.claim.findMany({
      orderBy: { createdAt: "desc" }, // 新しい順に並べる
    });
    return NextResponse.json(claims);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

// 2. データ更新・承認機能 (PATCH)
// 承認ボタンが押された時の処理
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    // トランザクション: 「更新」と「記録」を同時に行う
    const result = await prisma.$transaction(async (tx) => {
      // A. ステータスを更新
      const updatedClaim = await tx.claim.update({
        where: { id },
        data: { status },
      });

      // B. ログを残す (歴史を刻む)
      await tx.adminLog.create({
        data: {
          action: `UPDATE_STATUS_TO_${status}`,
          targetId: id,
        },
      });

      return updatedClaim;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Error updating data" }, { status: 500 });
  }
}