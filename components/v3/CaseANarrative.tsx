// components/v3/CaseANarrative.tsx - SOLUNA v3.0
// 創設者のナラティブ（VSL第3段階: Story）
// 改善: コピー全体の磨き上げ

'use client';

import React from 'react';
import Link from 'next/link';

export default function CaseANarrative() {
  return (
    <section id="story" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#03050a] border-b border-white/5">
      <div className="max-w-3xl mx-auto">
        
        {/* セクションラベル */}
        <span className="text-emerald-500 text-[9px] sm:text-[10px] tracking-[0.4em] font-black uppercase mb-6 sm:mb-8 block text-center">
          創設者の実体験 × 社会の病理
        </span>
        
        {/* タイムライン形式のナラティブ */}
        <div className="relative pl-6 sm:pl-8 md:pl-16 border-l border-emerald-500/30 space-y-8 sm:space-y-12">
          
          {/* フェーズ1: アーティストの導入 */}
          <div className="relative">
            <div className="absolute -left-[25px] sm:-left-[33px] md:-left-[65px] w-2 h-2 bg-emerald-500 rounded-full" />
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-normal mb-4">
              <span className="text-emerald-400/80 text-lg sm:text-xl block mb-2 font-normal">
                このプロジェクトを作ったアーティストの
              </span>
              母は、統合失調症だった。<br />
              <span className="text-white/50 text-lg sm:text-xl md:text-2xl">
                子は、誰にも助けを呼べなかった。
              </span>
            </h3>
            
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-serif">
              1980年代。ヤングケアラーという言葉すら存在しない時代。<br />
              閉ざされたドアの向こうで、少年は唯一学べることがあった。<br /><br />
              <span className="text-white/80 font-bold italic">
                「声を上げても無駄だ」
              </span>
            </p>
          </div>

          {/* フェーズ2: 社会的バグの認識 */}
          <div className="relative">
            <div className="absolute -left-[25px] sm:-left-[33px] md:-left-[65px] w-2 h-2 bg-emerald-500/50 rounded-full" />
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-3 sm:mb-4">
              なぜ、助けを呼べないのか？
            </h3>
            
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-serif">
              それは個人の弱さではない。<br />
              <span className="text-emerald-300 font-bold text-base sm:text-lg">
                「声を上げても無駄だと学習させるシステム」
              </span><br />
              に<span className="text-white font-bold">社会のバグ</span>があるからだ。<br /><br />
              
              支援制度は存在する。<br /><br />
              
              だが、その情報は
              <span className="text-white underline underline-offset-4">
                「既に見捨てられた人」には届かない
              </span>。<br />
              なぜなら、その人は既に
              <span className="text-white/80 font-bold">「呼ぶこと」を諦めているから</span>。<br /><br />
              
              そして、<br />
              <span className="text-red-400/90 font-bold text-base sm:text-lg">
                「本当に困っている人」に届かないようにできているから。
              </span>
            </p>
          </div>

          {/* フェーズ3: 解決方向 */}
          <div className="relative">
            <div className="absolute -left-[25px] sm:-left-[33px] md:-left-[65px] w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-3 sm:mb-4">
              社会を「再設計」する。
            </h3>
            
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-serif">
              この社会が生み出した「鬼」を変えるには、<br />
              感情論ではなく
              <span className="text-emerald-400 font-bold">テクノロジーと導線設計が必要</span>。<br /><br />
              
              「ケアした人」が<span className="text-white font-bold">報われる</span>システムへ。<br />
              「見放された人」が助けを呼ぶことで、<span className="text-white font-bold">価値を取り戻せる</span>システムへ。<br /><br />
              
              その唯一の機能が、
              <span className="text-emerald-300 font-bold text-xl sm:text-2xl">SOLUNA</span>。
            </p>
          </div>

          {/* 詳細リンク */}
          <div className="pt-4 sm:pt-8">
            <Link 
              href="/profile" 
              className="text-[9px] sm:text-xs text-white/40 hover:text-emerald-400 tracking-widest uppercase border-b border-white/20 pb-1 transition-colors inline-block"
            >
              詳細プロフィール & 設計思想を読む →
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
