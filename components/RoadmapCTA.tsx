"use client";

import React from "react";

// Tally FormのURLをここで定義します
const TALLY_FORM_URL = "https://tally.so/r/wM9JVY"; 

// NOTE: TALLY_FORM_URL はボタンのリンク先として使用します。

export default function RoadmapCTA() {
  return (
    // 🚩 修正: py-20 に戻し、フッターとの適切な間隔を確保
    <section className="relative w-full py-20 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-blue-900/5 to-purple-900/10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto px-4">
        
        {/* 1. キャッチコピー */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-purple-200 drop-shadow-sm whitespace-nowrap">
          その優しさを、資産に。
        </h2>

        {/* 2. リード文 */}
        <p className="text-lg md:text-xl text-blue-100/80 font-medium leading-relaxed max-w-lg">
          報われない世界を、<br className="md:hidden" />
          ここから書き換える。
        </p>

        {/* 3. CTAリンクボタン */}
        <div className="w-full flex justify-center pt-4">
          <a
            href={TALLY_FORM_URL} // Tallyフォームのリンクを適用
            target="_blank" // 外部サイトのため新しいタブで開く
            rel="noopener noreferrer"
            className="
              group relative w-full max-w-sm overflow-hidden rounded-xl
              bg-gradient-to-r from-blue-600 to-purple-600 
              p-1 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] 
              transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)]
            "
          >
            <div className="
              relative flex flex-col items-center justify-center 
              rounded-[10px] bg-black/20 backdrop-blur-sm 
              px-8 py-4 transition-all duration-300 group-hover:bg-transparent
            ">
              <span className="text-xl md:text-2xl font-bold text-white tracking-widest mb-1">
                第1期・市民先行登録
              </span>
              <span className="text-xs md:text-sm font-medium text-blue-100/90 tracking-wider">
                （無料・β版アクセス権）
              </span>
            </div>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
          </a>
        </div>

        {/* 4. 補足（技術的な注釈） - 【修正済み】モバイル改行を制御 */}
        <p className="text-xs text-slate-500 mt-8 leading-relaxed">
          ※ SOLUNAは、Ethereum Sepolia Network
          <br className="md:hidden" />
          上で稼働する“透明性・分配・インセンティブ”を再設計した
          <br className="md:hidden" />
          分散型の社会インフラ〈Soluna Proto-Mainnet〉です。
        </p>
      </div>
    </section>
  );
}