"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function ClaimPage() {
  const [account, setAccount] = useState<string | null>(null);
  const [passphrase, setPassphrase] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successId, setSuccessId] = useState("");

  // ウォレット接続チェック
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMaskをインストールしてください");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setAccount(await signer.getAddress());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  // 申請処理
  const handleClaim = async () => {
    if (!account || !passphrase) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ▼▼▼ ここが修正ポイント！新しいAPIに合わせて名前を変更 ▼▼▼
        body: JSON.stringify({ 
          walletAddress: account, // address -> walletAddress
          passphrase: passphrase  // phrase -> passphrase
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // エラー時の処理
        throw new Error(data.error || "Request failed");
      }

      // 成功時
      setSuccessId(data.id);
      setStatus("success");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            SOLUNA Claim Portal
          </h1>
          <p className="text-gray-500 text-sm">Beta Access</p>
        </div>

        {/* ウォレット接続状態 */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <p className="text-xs text-gray-400 mb-1">Status</p>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${account ? "bg-green-500" : "bg-red-500"}`}></div>
            <p className="font-mono text-sm truncate">
              {account ? account : "Not Connected"}
            </p>
          </div>
        </div>

        {!account ? (
          <button
            onClick={connectWallet}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all"
          >
            Connect Wallet
          </button>
        ) : status === "success" ? (
          <div className="text-center bg-green-900/30 border border-green-800 p-4 rounded-lg">
            <p className="text-green-400 font-bold mb-2">申請成功！🎉</p>
            <p className="text-xs text-gray-400">ID: {successId}</p>
            <p className="text-sm text-gray-300 mt-2">管理者の承認をお待ちください。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 ml-1">合言葉 (Passphrase)</label>
              <input
                type="text"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="SOLUNA2025"
                className="w-full mt-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {status === "error" && (
              <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg">
                <p className="text-red-400 text-sm text-center">
                  {errorMessage}
                </p>
              </div>
            )}

            <button
              onClick={handleClaim}
              disabled={status === "loading" || !passphrase}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {status === "loading" ? "Processing..." : "Claim SOLUNA"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}