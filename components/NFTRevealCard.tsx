'use client';

import React from 'react';
import { motion } from 'framer-motion';

const NFTRevealCard = () => {
  return (
    <div className="relative group perspective-1000 w-[320px] h-[500px]">
      {/* --- カード本体 --- */}
      <motion.div
        initial={{ rotateY: 180, scale: 0.8, opacity: 0 }}
        animate={{ rotateY: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}
        className="w-full h-full relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(192,192,192,0.4)] border border-[#E5E4E2]/50 transform-style-3d bg-black"
      >
        {/* 1. 背景：宇宙的深度とノイズ */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F1A] via-[#1a1a2e] to-black"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        
        {/* 2. God Rays (神々しい光の放射 - プラチナ系) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#E5E4E2]/30 to-transparent blur-[80px] animate-pulse-slow pointer-events-none"></div>

        {/* 3. アートワーク：SOLUNA (太陽と月の融合 - プラチナゴールド) */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-48 h-48 flex items-center justify-center">
            
            {/* Outer Sun Ring (回転する光輪) */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-[1px] border-[#E5E4E2]/50 border-dashed shadow-[0_0_20px_#E5E4E2]"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border-[1px] border-[#CDC0B0]/40"
            />

            {/* Core Geometry (中心核 - 最高級のプラチナグラデーション) */}
            <div 
              className="relative z-10 w-24 h-24 rounded-full shadow-[0_0_50px_rgba(229,228,226,0.9)] flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E5E4E2 40%, #CDC0B0 100%)'
              }}
            >
               {/* Moon Shadow (月が太陽に重なる日食のような表現) */}
               <div className="absolute w-20 h-20 bg-[#0F0F1A] rounded-full -top-4 -right-4 blur-[1px]"></div>
               
               {/* プラチナの光沢感を追加 */}
               <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent to-white/40 opacity-50 mix-blend-overlay pointer-events-none"></div>
            </div>

            {/* Particles (周囲を漂う粒子) */}
            <div className="absolute inset-[-20px]">
               {[...Array(6)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute w-1 h-1 bg-[#E5E4E2] rounded-full shadow-[0_0_5px_#FFFFFF]"
                   style={{ 
                     top: '50%', left: '50%',
                     transform: `rotate(${i * 60}deg) translate(80px)`
                   }}
                   animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
                   transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                 />
               ))}
            </div>
          </div>
        </div>

        {/* 4. タイポグラフィと情報 */}
        <div className="absolute bottom-0 w-full h-[45%] bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col justify-end p-8 z-20">
          <div className="mb-2 flex items-center gap-2 justify-center opacity-70">
            <span className="w-1 h-1 rounded-full bg-[#E5E4E2]"></span>
            <span className="text-[10px] tracking-[0.3em] text-[#E5E4E2] uppercase">Genesis Edition</span>
            <span className="w-1 h-1 rounded-full bg-[#E5E4E2]"></span>
          </div>
          
          {/* タイトルもプラチナ系のグラデーションへ */}
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E5E4E2] to-[#CDC0B0] text-center mb-1 drop-shadow-sm font-serif">
            SOLUNA
          </h2>
          <p className="text-center text-xs text-gray-400 font-light tracking-widest mb-6">PROOF OF CARE TOKEN</p>

          {/* メタデータバッジ */}
          <div className="w-full py-3 px-4 rounded-lg bg-[#E5E4E2]/10 border border-[#E5E4E2]/30 backdrop-blur-sm flex justify-between items-center shadow-[inset_0_0_10px_rgba(229,228,226,0.1)]">
            <div className="text-left">
              <p className="text-[9px] text-[#E5E4E2] uppercase tracking-wider">Status</p>
              <p className="text-xs text-white font-mono">Verified</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-[#E5E4E2] uppercase tracking-wider">Rank</p>
              {/* ここはGold MemberなのでGoldの文字を残すが、色味はプラチナに合わせる */}
              <p className="text-xs text-white font-mono">Gold</p> 
            </div>
          </div>
        </div>

        {/* 5. ホログラム反射 (マウスオーバー時の高級感) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-soft-light"></div>
      </motion.div>
    </div>
  );
};

export default NFTRevealCard;