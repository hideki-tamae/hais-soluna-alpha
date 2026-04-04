// components/HeroSection.tsx

import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    // 修正1: h-screen を min-h-screen に変更し、コンテンツ量に応じて伸びるようにする
    // 修正2: 背景色を bg-[#050511] に統一
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#050511] py-20">

      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/9.mp4" type="video/mp4" />
        </video>

        {/* Overlay Gradients - 深度を増す */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050511] to-transparent" />
        <div className="absolute inset-0 bg-[#050511]/40" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050511] via-[#050511]/80 to-transparent" />
      </div>

      {/* Content Container */}
      {/* 修正3: container の最大幅を明示し、中央寄せを確実にする */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[10px] md:text-xs font-mono text-blue-200 tracking-[0.3em] uppercase">
            Public Beta Coming Soon
          </span>
        </div>

        {/* Main Title */}
        {/* 修正4: フォントサイズをレスポンシブに最適化（9xlは極端な場合のみ） */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1] md:leading-[0.95]">
          <span className="block text-white">
            Re-Verse
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-400 to-purple-400 pb-2">
            Civilization
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-blue-100/80 font-light tracking-[0.3em] uppercase mb-8">
          Proof-of-Care Token
        </p>

        {/* Description */}
        <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
          優しさが制度に統合し、見えない「ケア」を<br className="hidden md:block" />
          価値として証明する新たな社会OS。
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <Link
            href="/whitepaper"
            className="w-full sm:w-auto group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full transition-all duration-300 shadow-lg shadow-blue-900/20"
          >
            <span className="flex items-center justify-center gap-2 text-white font-bold tracking-wide">
              Whitepaperを読む
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <a
            href="https://x.gd/8YyVc"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto group px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 backdrop-blur-md"
          >
            <span className="flex items-center justify-center gap-3 text-white font-bold tracking-wider">
              <BookOpen className="w-5 h-5 text-white/70" />
              Kindle
            </span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator - モバイルでは非表示にすることが多い */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;