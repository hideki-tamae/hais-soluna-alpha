// components/v3/FinalCTAV3.tsx - SOLUNA v3.0
// 最終CTA（VSL第8段階: Final Push）
// ジョン・ベンソン: 「最後の一押しで成約率は2倍になる」

'use client';

import React from 'react';
import Link from 'next/link';

export default function FinalCTAV3() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 border-t border-white/10 bg-gradient-to-b from-[#010308] to-[#03050a]">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* メインメッセージ */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 sm:mb-6">
          あなたのケアは、<br />
          <span className="text-emerald-300">もう見落とされない。</span>
        </h2>

        <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 sm:mb-12 font-light">
          30秒で申請完了。<br />
          ブロックチェーンがあなたのケアを永遠に記録します。
        </p>

        {/* プライマリCTA（最終） */}
        <Link 
          href="/tester-claim"
          className="inline-block px-10 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black text-[10px] sm:text-xs tracking-[0.3em] uppercase hover:shadow-[0_0_80px_rgba(16,185,129,0.6)] hover:scale-110 transition-all rounded-sm shadow-lg duration-300"
        >
          → 今すぐ参加する
        </Link>

        {/* 法人向けリンク */}
        <p className="text-white/30 text-[9px] tracking-widest mt-8 uppercase">
          法人・自治体の方 → 
          <a 
            href="https://x.gd/d2lDz" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:underline ml-1"
          >
            相談フォーム
          </a>
        </p>
        
      </div>
    </section>
  );
}
