// components/TokenBalance.tsx
'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
// 先ほど作った鍵と住所をインポート
import { SOLUNA_CONTRACT_ADDRESS, SOLUNA_ABI } from '@/lib/contracts';

export default function TokenBalance() {
  const [balance, setBalance] = useState<string>('Loading...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBalance = async () => {
      // ブラウザにMetaMaskがあるか確認
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        try {
          // 1. MetaMaskに接続するための準備（ethers v6記法）
          // ※もしエラーが出る場合は v5記法に変えますので教えてください
          const provider = new ethers.BrowserProvider((window as any).ethereum);
          
          // 2. ユーザーのウォレットアドレスを取得
          const signer = await provider.getSigner();
          const userAddress = await signer.getAddress();

          // 3. SOLUNAコントラクトに接続
          const contract = new ethers.Contract(SOLUNA_CONTRACT_ADDRESS, SOLUNA_ABI, provider);

          // 4. 残高を聞く（balanceOf関数を実行）
          const rawBalance = await contract.balanceOf(userAddress);
          
          // 5. 人間が読める数字に変換（18桁の小数を調整）
          const formatted = ethers.formatUnits(rawBalance, 18);
          
          // 小数点第2位まで表示
          setBalance(parseFloat(formatted).toFixed(2));
          
        } catch (err) {
          console.error("SOLUNA取得エラー:", err);
          setError("取得失敗");
        }
      } else {
        setBalance('Wallet未接続');
      }
    };

    // 実行！
    fetchBalance();
  }, []);

  return (
    <div className="max-w-sm p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 shadow-2xl">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
          Current Holdings
        </h2>
      </div>
      
      <div className="flex items-baseline space-x-2">
        <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
          {error ? error : balance}
        </span>
        <span className="text-lg font-bold text-gray-500">SOLUNA</span>
      </div>
      
      <p className="text-xs text-gray-600 mt-2 font-mono">
        Connect to Re-Verse Economy
      </p>
    </div>
  );
}