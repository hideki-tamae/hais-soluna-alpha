import { useState } from 'react';

interface ApproveResponse {
  success: boolean;
  txHash?: string;
  error?: string;
}

export const useApproveAction = () => {
  const [isApproving, setIsApproving] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const approveAction = async (actionId: string): Promise<boolean> => {
    setIsApproving(true);
    setError(null);
    setTxHash(null);

    try {
      const response = await fetch(`/api/care-actions/${actionId}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data: ApproveResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to approve and mint Proof of CARE.');
      }

      if (data.txHash) {
        setTxHash(data.txHash);
      }
      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred.';
      setError(errorMessage);
      return false;
    } finally {
      setIsApproving(false);
    }
  };

  return { approveAction, isApproving, txHash, error };
};
