'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function ProofOfCommitment() {
  const [status, setStatus] = useState<'idle' | 'signing' | 'verified'>('idle');

  const handleSign = async () => {
    setStatus('signing');
    // 2.5秒の重厚な書き込み演出
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setStatus('verified');
  };

  // -------------------------------------------------------
  // View 1: 完了画面 "Golden Eclipse" (金環蝕)
  // -------------------------------------------------------
  if (status === 'verified') {
    return (
      <div className="w-full max-w-2xl min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden rounded-3xl border border-amber-500/30 bg-black/90 backdrop-blur-2xl shadow-[0_0_100px_rgba(245,158,11,0.2)] animate-in fade-in duration-1000">
        
        {/* 背景の環境光 (Ambient Light) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Brand Icon: Golden Check */}
        <div className="relative mb-10 group">
          {/* 後光 (Halo) */}
          <div className="absolute inset-0 bg-amber-400 blur-3xl opacity-20 rounded-full scale-125 animate-pulse"></div>
          
          {/* Main Circle */}
          <div className="relative h-32 w-32 rounded-full p-[2px] bg-gradient-to-b from-amber-200 via-yellow-500 to-amber-900 shadow-2xl flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden">
               {/* Internal Sheen */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50"></div>
               
               {/* Icon */}
               <svg className="w-16 h-16 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="animate-[draw_1s_ease-out_forwards]" style={{ strokeDasharray: 100, strokeDashoffset: 100 }} />
              </svg>
            </div>
          </div>
        </div>

        {/* Typography: "Proof Verified" */}
        <h3 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-100 drop-shadow-sm">
          Proof Verified
        </h3>
        <p className="text-amber-100/70 text-lg mb-10 font-light tracking-wide">
          優しさが、永遠の価値として刻まれました。
        </p>

        {/* Dashboard Button */}
        <Link href="/dashboard">
          <button className="px-8 py-3 rounded-full border border-yellow-600/50 text-yellow-100 hover:bg-yellow-900/20 transition-all tracking-widest text-sm">
            ENTER DASHBOARD
          </button>
        </Link>

        <style jsx>{`
          @keyframes draw { to { stroke-dashoffset: 0; } }
          @keyframes shimmer { 100% { transform: translateX(100%); } }
        `}</style>
      </div>
    );
  }

  // -------------------------------------------------------
  // View 2: 署名待機画面 (Idle)
  // -------------------------------------------------------
  return (
    <div className="w-full max-w-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-10 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500">
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Re-Verse Civilization<br/><span className="text-slate-400 text-2xl font-light">への誓い</span></h2>
        
        {/* 👇 文節改行とCare Capitalism適用済みテキスト */}
        <p className="text-slate-300 mb-10 leading-relaxed max-w-lg mx-auto">
          {/* モバイルで崩れないよう、意味のまとまりで改行を制御 */}
          <span className="inline-block">私は、</span>
          <span className="inline-block">ケア資本主義</span>
          <span className="inline-block">（Care Capitalism）の</span>
          <span className="inline-block">実装者として、</span>
          {/* PCではここで改行を入れるが、スマホでは自然な流れに任せる */}
          <br className="hidden sm:block" />
          <span className="inline-block">優しさが循環する社会を</span>
          <span className="inline-block">創り上げることを</span>
          <span className="inline-block">宣言します。</span>
        </p>

        <button
          onClick={handleSign}
          disabled={status === 'signing'}
          className={`px-12 py-4 rounded-full font-bold text-lg tracking-widest transition-all duration-300 ${status === 'signing' ? 'bg-slate-800 text-slate-500' : 'bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white shadow-lg'}`}
        >
          {status === 'signing' ? "SIGNING..." : "COMMIT PLEDGE"}
        </button>
      </div>
    </div>
  );
}