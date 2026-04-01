"use client";

import { useEffect, useState } from "react";

// 型定義
type Claim = {
  id: string;
  userName: string;
  email: string;
  amount: number;
  status: string;
  description: string;
  createdAt: string;
};

export default function AdminClaimsList() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null); // 詳細モーダル用

  // 1. データを取得する関数 (GET)
  const fetchClaims = async () => {
    try {
      // 👇 ここを新しいAPIに変更しました
      const res = await fetch("/api/admin/claims");
      const data = await res.json();
      setClaims(data);
    } catch (error) {
      console.error("Failed to fetch claims", error);
    } finally {
      setLoading(false);
    }
  };

  // 初回読み込み
  useEffect(() => {
    fetchClaims();
  }, []);

  // 2. 承認する関数 (PATCH)
  const handleApprove = async () => {
    if (!selectedClaim) return;

    try {
      // 👇 ここも新しいAPIに変更しました
      const res = await fetch("/api/admin/claims", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedClaim.id,
          status: "approved", // ステータスを承認済みに変更
        }),
      });

      if (res.ok) {
        alert("承認しました！");
        setSelectedClaim(null); // モーダルを閉じる
        fetchClaims(); // データを再取得して画面を更新
      } else {
        alert("エラーが発生しました");
      }
    } catch (error) {
      console.error("Error approving claim:", error);
      alert("通信エラーが発生しました");
    }
  };

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">SOLUNA 申請管理ボード</h1>

      <div className="grid gap-4">
        {claims.map((claim) => (
          <div
            key={claim.id}
            className="bg-slate-800 p-6 rounded-lg border border-slate-700 flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold">{claim.userName}</h2>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    claim.status === "approved"
                      ? "bg-green-500 text-black"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {claim.status === "approved" ? "承認済み" : "審査中"}
                </span>
              </div>
              <p className="text-slate-400 text-sm">{claim.email}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-400">申請額</p>
                <p className="text-2xl font-mono font-bold text-cyan-400">

　　　　　　　　　　{claim.amount ? Number(claim.amount).toLocaleString() : '0'} <span className="text-sm">SLN</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedClaim(claim)}
                className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded transition"
              >
                詳細
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 詳細モーダル */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-8 rounded-xl max-w-md w-full border border-slate-600">
            <h2 className="text-2xl font-bold mb-4">申請詳細</h2>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs text-slate-400">申請者</label>
                <p className="text-lg">{selectedClaim.userName}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400">Email</label>
                <p className="text-slate-300">{selectedClaim.email}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400">申請理由</label>
                <p className="bg-slate-900 p-3 rounded text-slate-300 mt-1">
                  {selectedClaim.description || "なし"}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedClaim(null)}
                className="flex-1 py-3 rounded bg-slate-700 hover:bg-slate-600 transition"
              >
                閉じる
              </button>
              
              {selectedClaim.status !== "approved" && (
                <button
                  onClick={handleApprove}
                  className="flex-1 py-3 rounded bg-green-500 hover:bg-green-400 text-black font-bold transition shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                >
                  承認する
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}