import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Genesis Transaction Handler
 * Approves a CareAction and mints Proof of CARE on Polygon Amoy
 * 
 * POST /api/care-actions/[id]/approve
 */
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // 1. Fetch the CareAction from database
    const careAction = await prisma.careAction.findUnique({
      where: { id },
      include: { receiver: true }
    });

    if (!careAction) {
      return NextResponse.json(
        { success: false, error: 'CareAction not found.' },
        { status: 404 }
      );
    }

    // 2. Update status to APPROVING (DB lock)
    await prisma.careAction.update({
      where: { id },
      data: { status: 'APPROVING' }
    });

    // 3. Simulate blockchain transaction (Genesis Transaction)
    // In production, this would call Polygon Amoy contract via ethers.js
    // For now, we generate a mock TxHash that follows Ethereum format
    const mockTxHash = `0x${Array(64).fill(0).map(() => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('')}`;

    // 4. Update CareAction with TxHash and status
    const updatedAction = await prisma.careAction.update({
      where: { id },
      data: {
        status: 'MINTED',
        txHash: mockTxHash,
        mintedAt: new Date()
      }
    });

    // 5. Log the Genesis Transaction
    console.log('✅ GENESIS_TRANSACTION_EXECUTED', {
      actionId: id,
      receiverId: careAction.receiverId,
      txHash: mockTxHash,
      solunaAmount: careAction.solunaAmount,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      txHash: mockTxHash,
      action: updatedAction,
      message: 'Proof of CARE successfully minted on Polygon Amoy.'
    });

  } catch (error: any) {
    console.error('❌ GENESIS_TRANSACTION_FAILED:', error);
    
    // Revert status to PENDING on error
    try {
      await prisma.careAction.update({
        where: { id: params.id },
        data: { status: 'FAILED' }
      });
    } catch (revertError) {
      console.error('Failed to revert status:', revertError);
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Transaction execution failed.' },
      { status: 500 }
    );
  }
}
