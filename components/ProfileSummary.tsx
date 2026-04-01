"use client";

import Link from 'next/link';
import { ChevronRight, Landmark, ShieldCheck, Cpu } from 'lucide-react';

export default function ProfileSummary() {
  return (
    <section className="relative py-32 bg-[#020205] overflow-hidden border-t border-white/5">
      
      {/* 背景：ノイズと深い闇（ハイエンド・モノクローム） */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        
        {/* 肩書エリア：プラチナ・グラデーション */}
        <div className="mb-12">
          <span className="inline-block py-1 px-3 border border-white/10 rounded-sm text-gray-500 text-[10px] tracking-[0.4em] mb-6 uppercase">
            Organizer Profile
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500">
              Liberal Arts Architect
            </span>
          </h2>
          　<p className="text-xl text-gray-500 font-light tracking-wide">
              技術 × 制度 × 思想 を統合する <span className="text-gray-400 border-b border-gray-800 pb-1 whitespace-nowrap">文明OSデザイナー</span>
            </p>
        </div>

        {/* プロフィールカード：マットブラックの質感 */}
        <div className="bg-[#0A0A0F] border border-white/10 rounded-[4px] p-12 md:p-16 relative overflow-hidden shadow-2xl hover:border-white/20 transition-all duration-500">
          
          <div className="relative z-10 flex flex-col items-center">
            
            {/* 名前：明朝体のような気品（フォントはSans系ですがウェイトで表現） */}
            <h3 className="text-3xl font-medium text-white mb-2 tracking-widest">田前 秀樹</h3>
            <p className="text-[10px] font-bold text-gray-600 tracking-[0.4em] uppercase mb-12">
              Hideki Tamae
            </p>

            {/* 権威リスト：座布団なし・知的アイコン・モノクローム */}
            <div className="space-y-8 text-left w-full max-w-lg mb-14">
              
              {/* Item 1: Academic (Landmark) */}
              <div className="flex gap-6 group">
                <Landmark className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors flex-shrink-0 stroke-[1.5]" />
                <div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1 group-hover:text-gray-400 transition-colors">Scientific Foundation</p>
                  <p className="text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors">
                    Yale University: Science of Well-Being Completed
                  </p>
                </div>
              </div>

              {/* Item 2: Academic/Psych (Landmark) */}
              <div className="flex gap-6 group">
                <Landmark className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors flex-shrink-0 stroke-[1.5]" />
                <div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1 group-hover:text-gray-400 transition-colors">Psychology</p>
                  <p className="text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors">
                    University of Pennsylvania: Positive Psychology Completed
                  </p>
                </div>
              </div>

              {/* Item 3: Public Health (ShieldCheck) */}
              <div className="flex gap-6 group">
                <ShieldCheck className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors flex-shrink-0 stroke-[1.5]" />
                <div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1 group-hover:text-gray-400 transition-colors">Public Health Expertise</p>
                  
                  {/* 既存の項目 */}
                  <p className="text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors">
                    Johns Hopkins University: Essential Epidemiology Tools
                  </p>

                </div>
              </div>

            </div>

            {/* リンク：極細のラインと美学 */}
            <Link 
              href="/profile" 
              className="group inline-flex items-center gap-3 text-xs font-bold tracking-widest text-gray-500 hover:text-white transition-all duration-300 border-b border-transparent hover:border-white pb-1"
            >
              <span>VIEW FULL PROFILE</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}