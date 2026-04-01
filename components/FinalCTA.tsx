import React from 'react';
import { ArrowRight } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="relative w-full py-40 md:py-64 overflow-hidden bg-[#050505] border-t border-white/10">
      
      {/* Background Image: The Universe */}
      <div className="absolute inset-0 pointer-events-none">
        <img 
          src="/header-bg.jpg" 
          alt="Universe Background" 
          className="w-full h-full object-cover opacity-50 mix-blend-screen select-none"
        />
        
        {/* Overlays */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* Main Headline */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-12 md:mb-16 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 pb-4 leading-tight">
          その優しさを、<br className="md:hidden" />
          資産に。
        </h2>

        {/* Sub Headline */}
        <p className="text-xl md:text-3xl text-gray-200 mb-20 md:mb-24 tracking-wide max-w-3xl mx-auto leading-relaxed font-light drop-shadow-lg">
          報われない世界を、<br className="md:hidden" />
          ここから書き換える。
        </p>

        {/* The Button (Responsive Fixed) */}
        <div className="flex flex-col items-center justify-center gap-8 w-full px-4">
          <a 
            href="https://tally.so/r/wM9JVY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="
              group relative 
              w-full max-w-xs md:max-w-fit  /* スマホでは幅制限、PCでは中身に合わせる */
              px-6 py-4 md:px-14 md:py-6     /* スマホでの上下パディングを少し調整 */
              bg-gradient-to-r from-blue-600/90 to-purple-600/90 
              rounded-full overflow-hidden 
              transition-all duration-500 
              hover:scale-105 hover:shadow-[0_0_80px_rgba(124,58,237,0.6)] 
              border border-white/20 backdrop-blur-md
              flex items-center justify-center
            "
          >
            {/* Inner Glow Layer */}
            <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
            
            {/* Text & Icon */}
            <span className="relative flex items-center justify-center gap-3 md:gap-4 text-xl md:text-3xl font-bold text-white tracking-wider drop-shadow-md text-center">
              {/* テキスト部分：スマホでのみ改行を入れる */}
              <span>
                第1期・市民<br className="block sm:hidden" />先行登録
              </span>
              <ArrowRight className="w-6 h-6 md:w-8 h-8 text-white/90 group-hover:translate-x-2 transition-transform duration-300 flex-shrink-0" />
            </span>
            
            {/* Tag */}
            <span className="absolute top-3 right-3 md:-top-1 md:-right-1 flex h-3 w-3 md:h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 md:h-5 w-5 bg-purple-500"></span>
            </span>
          </a>
          
          <span className="text-base text-blue-200/80 font-medium tracking-widest uppercase drop-shadow-md">
            Free Access / Beta Version
          </span>
        </div>

        {/* Technical Disclaimer (最終修正版: フォントサイズとinline-blockで可読性向上) */}
        <div className="mt-20 pt-10 border-t border-white/10 max-w-xl mx-auto px-4">
          <p className="text-[10px] text-gray-400 font-mono leading-normal tracking-wider drop-shadow">
            {/* 稼働する、透明性・分配、Proto-Mainnetを塊として守り、文字サイズを最小限に抑える */}
            ※ SOLUNAは、
            <span className="inline-block">Ethereum Sepolia Network</span>
            上で<span className="inline-block">稼働する</span>
            “透明性・分配・インセンティブ”を<span className="inline-block">再設計した</span>
            <br className="hidden md:block" />
            <span className="inline-block">分散型の社会インフラ</span>
            <span className="inline-block">〈Soluna Proto-Mainnet〉です。</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
