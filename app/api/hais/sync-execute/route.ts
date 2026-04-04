import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { userId } = await request.json();

  const calibration = await prisma.peakCalibration.update({
    where: { userId },
    data: {
      isTrapped: false,
      proposedSync: false,
      syncedAt: new Date(),
    }
  });

  return NextResponse.json({ success: true, calibration });
}
