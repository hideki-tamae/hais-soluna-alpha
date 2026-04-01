import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/9.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Gradients */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-20">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-black/40 border border-white/20 backdrop-blur-md animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-mono text-blue-200 tracking-widest uppercase">
            Public Beta Coming Soon
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)] leading-[0.95]">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-blue-200">
            Re-Verse
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 pb-2">
            Civilization
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-blue-50 font-light tracking-[0.2em] uppercase mb-12 drop-shadow-md">
          Proof-of-Care Token
        </p>

        {/* Description */}
        <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-16 font-medium drop-shadow-md">
          優しさが制度に統合し、見えない「ケア」を<br className="hidden md:block" />
          価値として証明する新たな社会OS。
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Link 
            href="/whitepaper"
            className="group relative px-8 py-4 bg-blue-600/90 hover:bg-blue-500 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] overflow-hidden backdrop-blur-sm border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
            <span className="flex items-center gap-2 text-white font-bold tracking-wide">
              Whitepaperを読む
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <a 
            href="https://x.gd/8YyVc"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-4 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/60 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
          >
            <span className="flex items-center gap-3 text-white font-bold tracking-wider">
              <BookOpen className="w-5 h-5 text-white/90 group-hover:text-white transition-colors" />
              Kindle
            </span>
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-80 drop-shadow-md">
        <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;