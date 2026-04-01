// components/v3/HeroSectionV3.tsx - SOLUNA v3.0
// 0.5秒フック × 臨場感動画 × 感情爆発
// 審美眼: ダ・ヴィンチ（光）× 千利休（影）× ジョブズ（直感）
// 修正: コピー改善「なのに、何ももらえなかった」→「社会は、それを"当たり前"と呼んだ」

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

export default function HeroSectionV3() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [heroTextVisible, setHeroTextVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeroTextVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center border-b border-white/5 overflow-hidden">
      
      {/* 背景映像 */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`
            w-full h-full object-cover 
            transition-opacity duration-1000
            ${videoLoaded ? 'opacity-50' : 'opacity-0'}
          `}
          style={{
            filter: 'saturate(0.7) contrast(1.1)',
          }}
        >
          <source src="/hero-movie.mp4" type="video/mp4" />
        </video>
        
        {!videoLoaded && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url('/header-bg.jpg')" }}
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#010308]/60 via-[#010308]/40 to-[#010308]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#010308_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(16,185,129,0.12),transparent_50%)]" />
      </div>

      {videoLoaded && (
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-sm rounded-full">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[9px] text-white/60 tracking-wider uppercase">Live</span>
        </div>
      )}

      <div className={`
        relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto
        transition-all duration-1000 ease-out
        ${heroTextVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>
        
        <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 border border-emerald-500/40 rounded-full bg-emerald-500/10 backdrop-blur-md">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[9px] sm:text-[10px] text-emerald-400 tracking-[0.3em] font-black uppercase">
            世界初: ケアを資産に変えるプロトコル
          </span>
        </div>

        {/* メインコピー改善 */}
        <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-light text-white leading-[1.1] mb-4 sm:mb-8 tracking-tight">
          <span className="drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">社会に</span><br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-emerald-100 italic font-serif drop-shadow-[0_4px_30px_rgba(16,185,129,0.4)]">
            見えなかった
          </span>
          <br />
          <span className="drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">あなたの優しさ。</span>
        </h1>

        {/* サブコピー改善: ネガティブ→気づきへ */}
        <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12 font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          その瞬間、あなたは誰かの支えになった。<br />
          社会的な崩壊を、静かに防いでいた。<br />
          <span className="text-emerald-300 font-bold">社会は、それを"当たり前"と呼んだ。</span><br /><br />
          <span className="text-base sm:text-lg font-medium">今から、それが変わります。</span>
        </p>

        <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-12">
          <Link 
            href="/tester-claim" 
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black text-[10px] sm:text-xs tracking-[0.3em] uppercase hover:shadow-[0_0_60px_rgba(16,185,129,0.5)] hover:scale-105 transition-all rounded-sm flex items-center justify-center gap-2 sm:gap-3 shadow-[0_4px_30px_rgba(16,185,129,0.3)] duration-300"
          >
            <BookOpen size={14} className="sm:w-[16px]" />
            <span>30秒で始める（完全無料）</span>
          </Link>
          
          <a 
            href="#story" 
            className="text-xs sm:text-sm text-white/70 hover:text-emerald-300 transition-colors font-light tracking-wider underline underline-offset-4"
          >
            なぜこのプロジェクトが生まれたのか ↓
          </a>
        </div>

        {/* 信頼シグナル: 技術基盤に変更 */}
        <div className="text-center">
          <p className="text-[8px] sm:text-[9px] text-white/30 tracking-[0.2em] uppercase mb-3 sm:mb-4">
            Powered by Global Standards
          </p>
          <div className="flex justify-center gap-4 sm:gap-6 opacity-40 flex-wrap">
            <span className="text-[9px] sm:text-xs font-mono tracking-wider">Ethereum</span>
            <span className="text-[9px] sm:text-xs font-mono tracking-wider">Next.js</span>
            <span className="text-[9px] sm:text-xs font-mono tracking-wider">Supabase</span>
            <span className="text-[9px] sm:text-xs font-mono tracking-wider">Vercel</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="text-white/50 text-xs tracking-widest uppercase mb-2">Scroll</div>
        <ChevronRight size={16} className="rotate-90 text-emerald-500/80" />
      </div>
    </section>
  );
}
