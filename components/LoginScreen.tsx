'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export const LoginScreen = () => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // --- Task 2: Auto Redirect Logic ---
  // 接続完了(isConnected: true)を検知したら、即座に認証画面へ飛ばす
  useEffect(() => {
    if (isConnected) {
      setIsRedirecting(true);
      // 遷移先のプリフェッチ（体感速度向上）
      router.prefetch('/verification');
      // 即時リダイレクト
      router.push('/verification');
    }
  }, [isConnected, router]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      
      {/* 背景装飾：没入感を高める深淵なグラデーション */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black" />

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          
          // 接続済み または リダイレクト中は「魔法の発動中」演出を表示
          if (ready && (isRedirecting || isConnected)) {
            return (
              <div className="z-10 text-center animate-pulse">
                <div className="mb-4 text-4xl">✨</div>
                <p className="text-white text-xl font-light tracking-widest">
                  Connecting to SOLUNA...
                </p>
                <p className="text-xs text-indigo-400 mt-2 font-mono">
                  Identity Verification Sequence Initiated
                </p>
              </div>
            );
          }

          return (
            <div
              className={`z-10 transition-opacity duration-1000 ${
                ready ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* --- Task 1: UI Separation --- */}
              <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md mx-auto px-6">
                
                {/* A. メイン（99%向け）：魔法のボタン */}
                <button
                  onClick={openConnectModal}
                  type="button"
                  className="
                    group relative w-full py-5 px-8
                    bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
                    rounded-2xl shadow-[0_0_20px_rgba(168,85,247,0.4)]
                    text-white font-bold text-xl tracking-widest
                    transform transition-all duration-300
                    hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]
                    active:scale-95
                  "
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    SOLUNAを始める
                    {/* 矢印アイコン */}
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </span>
                  {/* ホバー時の光彩エフェクト */}
                  <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </button>

                {/* B. サブ（1%向け）：Pro Mode (Wallet Connect) */}
                <button
                  onClick={openConnectModal}
                  type="button"
                  className="
                    text-xs text-gray-500 font-mono tracking-wide
                    border-b border-transparent hover:border-gray-500
                    transition-colors duration-300
                    opacity-60 hover:opacity-100
                  "
                >
                  Connect Wallet (Pro Mode)
                </button>

                <p className="text-[10px] text-gray-600 mt-4 max-w-xs text-center">
                  By starting, you agree to join the Re-Verse Civilization experiment.
                </p>
              </div>
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};