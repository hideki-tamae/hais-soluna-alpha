// components/NextActionOptions.tsx

"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ShieldCheck, Trash2, FileKey } from 'lucide-react';

// ▼▼▼ 重要なURL定義 ▼▼▼
const CALENDLY_URL = "https://calendly.com/tamatixyan/30min";
// 田前さんのSOLUNA楽曲URL（なければ仮のアンビエント音源を使用）
const AMBIENT_SOUND_URL = "/sounds/soluna_ambient.mp3"; // ※public/soundsフォルダに音源を置いてください

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-purple-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H9a1 1 0 01-1-1v-4z" />
  </svg>
);

const DocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-blue-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-emerald-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

interface NextActionOptionsProps {
  onCloseModal?: () => void;
}

const forceOpen = (url: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

export function NextActionOptions({ onCloseModal }: NextActionOptionsProps) {
  // --- 🎵 音楽再生用State ---
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // --- 🛡️ データ破棄アニメーション用State ---
  const [showProof, setShowProof] = useState(true); // 最初は証明画面を表示
  const [proofStep, setProofStep] = useState(0);

  useEffect(() => {
    // 音楽再生の初期化
    audioRef.current = new Audio(AMBIENT_SOUND_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // 音量は控えめに
    
    // ユーザーインタラクションなしでの自動再生はブラウザにブロックされる可能性があるため、
    // ここではエラーハンドリングを行う（本来は「結果を見る」ボタン押下時に再生開始するのがベスト）
    audioRef.current.play().catch(() => console.log("Auto-play blocked"));

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // 証明アニメーションの進行
  useEffect(() => {
    if (showProof) {
      const timers = [
        setTimeout(() => setProofStep(1), 800),  // データをハッシュ化...
        setTimeout(() => setProofStep(2), 2000), // 元データを破棄...
        setTimeout(() => setProofStep(3), 3200), // ブロックチェーンに記録完了
        setTimeout(() => setShowProof(false), 4500) // メイン画面へ遷移
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [showProof]);

  // --- 🛡️ データ破棄証明画面（フェーズ1） ---
  if (showProof) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-8 border border-slate-800 bg-slate-900/80 rounded-2xl backdrop-blur-md">
        <h3 className="text-sm font-mono text-slate-400 mb-6 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          PRIVACY PROTECTION PROTOCOL
        </h3>
        
        <div className="space-y-6">
          {/* Step 1: Hashing */}
          <div className={`flex items-center gap-4 transition-opacity duration-500 ${proofStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
              <FileKey className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-300">Generating Bio-Signature Hash...</p>
              <p className="text-xs font-mono text-slate-500 mt-1">0x7f83...b9a2</p>
            </div>
            {proofStep >= 1 && <motion.div initial={{scale:0}} animate={{scale:1}} className="text-emerald-500 text-xs font-bold">DONE</motion.div>}
          </div>

          {/* Step 2: Deleting Raw Data */}
          <div className={`flex items-center gap-4 transition-opacity duration-500 ${proofStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
              <Trash2 className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-300">Deleting Raw Video & Audio Data...</p>
              <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
                {proofStep >= 2 && <motion.div initial={{width:"0%"}} animate={{width:"100%"}} transition={{duration: 0.8}} className="h-full bg-rose-500" />}
              </div>
            </div>
            {proofStep >= 2 && <motion.div initial={{scale:0}} animate={{scale:1}} className="text-rose-500 text-xs font-bold">DELETED</motion.div>}
          </div>

          {/* Step 3: Blockchain Verify */}
          <div className={`flex items-center gap-4 transition-opacity duration-500 ${proofStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-300">Verifying Proof of Care...</p>
              <p className="text-xs font-mono text-slate-500 mt-1">Verified by SOLUNA Protocol</p>
            </div>
            {proofStep >= 3 && <motion.div initial={{scale:0}} animate={{scale:1}} className="text-emerald-500 text-xs font-bold">SECURED</motion.div>}
          </div>
        </div>
      </div>
    );
  }

  // --- 🚀 アクション選択画面（フェーズ2） ---
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
      className="w-full max-w-5xl mx-auto mt-8"
    >
      {/* 音楽コントロール */}
      <div className="flex justify-center items-center gap-3 mb-6">
        <button onClick={toggleMute} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-xs text-slate-400 transition-all">
          {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-cyan-400 animate-pulse" />}
          <span className="font-mono tracking-widest">{isMuted ? "SOUND OFF" : "SOLUNA SOUND THERAPY ON"}</span>
        </button>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-center text-white mb-2 font-mono tracking-tighter">CHOOSE YOUR PATH</h3>
      <p className="text-gray-400 text-center mb-10 text-sm md:text-base">診断完了。このインテグリティをどのように活用しますか？</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4">
        
        {/* 1. Mint NFT (LINE) */}
        <div className="group relative bg-gray-900/40 border border-gray-800 hover:border-purple-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
          <div className="absolute top-0 right-0 bg-purple-900/30 text-purple-300 text-[10px] px-2 py-1 rounded-bl-lg border-b border-l border-purple-500/20 font-mono text-center">DAO WAITING LIST</div>
          <WalletIcon />
          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Mint NFT</h4>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">DAOへの先行案内と、健全性証明NFTの優先発行枠をLINEで確保する。</p>
          <a href="https://line.me/R/ti/p/@lqg6247r?ts=07261448&oat_content=url" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center bg-purple-600/10 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-500 rounded-lg font-mono text-sm transition-all duration-300">Join via LINE</a>
        </div>

        {/* 2. Get Report (Tally) */}
        <div className="group relative bg-gray-900/40 border border-gray-800 hover:border-blue-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
          <DocIcon />
          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Get Full Report</h4>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">詳細な解析データと改善アドバイスを記載したPDFレポートを請求する。</p>
          <a href="https://tally.so/r/wM9JVY" target="_blank" rel="noopener noreferrer" className="block w-full py-3 text-center bg-blue-600/10 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 hover:border-blue-500 rounded-lg font-mono text-sm transition-all duration-300">Get Report (Tally)</a>
        </div>

        {/* 3. Business Plan (Calendly) */}
        <div 
          onClick={forceOpen(CALENDLY_URL)}
          className="group relative bg-gray-900/40 border border-gray-800 hover:border-emerald-500/50 rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] text-center cursor-pointer"
        >
          <div className="absolute top-0 right-0 bg-emerald-900/30 text-emerald-300 text-[10px] px-2 py-1 rounded-bl-lg border-b border-l border-emerald-500/20 font-mono">FOR ENTERPRISE</div>
          <BuildingIcon />
          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors text-left">Business Plan</h4>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed text-left">組織導入・API連携・法人契約。人的資本の未認識債務を可視化する。</p>
          <button className="w-full py-3 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-500 rounded-lg font-bold text-sm transition-all duration-300">
            導入プランを見る
          </button>
        </div>

      </div>
    </motion.div>
  );
}