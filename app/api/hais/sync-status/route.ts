import { NextResponse } from 'next/server';
// 修正前: import { prisma } from '@/lib/prisma';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: 'User ID required' }, { status: 400 });

  const calibration = await prisma.peakCalibration.findUnique({
    where: { userId },
    select: { proposedSync: true, syncReasonJa: true }
  });

  // データが存在しない場合は新規作成（Bezos流のDay 1対応）
  return NextResponse.json(calibration || { proposedSync: false });
}
