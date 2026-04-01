import React from 'react';
import Link from 'next/link';

// KDPリンクを定数として定義
const KDP_LINK_URL = "https://x.gd/8YyVc";

export default function LandingTop() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center text-white bg-[#0B0C15]">
      
      {/* 1. 背景画像レイヤー (World Class Visual) */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/header-bg.jpg')", // 作成した画像
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* 2. オーバーレイ (Atmosphere Layer) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/50 to-[#0B0C15]/90" />

      {/* 3. メインコンテンツ (Hero Content) */}
      
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* バッジ: グラスモーフィズム（磨りガラス）エフェクト */}
        <div className="mb-8 inline-flex items-center px-5 py-2 rounded-full border border-indigo-500/30 bg-indigo-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse mr-3"></span>
          <span className="text-sm font-medium tracking-widest text-indigo-200">
            PUBLIC BETA COMING SOON
          </span>
        </div>

        {/* メインタイトルのドロップシャドウを強化 */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
          Re-Verse Civilization
        </h1>

        {/* サブタイトルのドロップシャドウを強化 */}
        <p className="text-xl md:text-3xl font-light text-indigo-100 mb-8 tracking-wide drop-shadow-md">
          <span className="font-semibold text-white">SOLUNA</span>{' '}
          <span className="italic font-serif text-indigo-300">Proof-of-Care</span>{' '}
          Token
        </p>

        {/* 説明文 */}
        <p className="max-w-2xl text-base md:text-lg text-gray-300 leading-relaxed mb-10 mx-auto">
          優しさが制度になる文明へ。<br className="hidden md:block" />
          AI・Web3・福祉を統合し、見えない「ケア」を価値として証明する<br className="hidden md:block" />
          新たな社会OS。
        </p>

        {/* アクションボタン群 */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          
          {/* プライマリーボタン (Whitepaper) - グラデーションを維持 */}
          <Link 
            href="/whitepaper" 
            className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-full font-bold text-white transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Whitepaperを読む
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </span>
            {/* 光沢アニメーション */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
          </Link>

          {/* セカンダリーボタン (Kindleで体験) - 控えめなスタイルに戻し、コピーを短縮 */}
          <a
            href={KDP_LINK_URL} // KDPリンクを適用
            target="_blank" // 外部サイトなので別タブで開く
            rel="noopener noreferrer"
            // 🚩 修正: セカンダリスタイルに戻す
            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-medium transition-all duration-300 hover:border-white/50"
          >
            {/* 🚩 修正: コピーを「Kindleで体験」に変更 */}
            Kindleで体験
          </a>
        </div>

      </div>

      {/* 装飾: 画面下部のスクロールインジケーター */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>

    </section>
  );
}