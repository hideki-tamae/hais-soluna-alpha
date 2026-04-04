import { useState, useEffect } from 'react';

export const useSyncProposal = (userId: string) => {
  const [proposal, setProposal] = useState<{ proposed: boolean; reason?: string } | null>(null);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const res = await fetch(`/api/hais/sync-status?userId=${userId}`);
        const data = await res.json();
        setProposal(data);
      } catch (error) {
        console.error("Failed to fetch sync status", error);
      }
    };

    if (userId) fetchProposal();
    // リアルタイム性を高めるなら、ここで SWR や React Query のポーリングを検討
  }, [userId]);

  const handleSync = async () => {
    // DBの syncedAt を更新し、isTrapped を解除する処理
    await fetch(`/api/hais/sync-execute`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
    setProposal({ proposed: false });
  };

  return { proposal, handleSync };
};
