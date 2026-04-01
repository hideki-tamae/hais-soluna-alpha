// components/v3/ProfileSummaryV3.tsx - SOLUNA v3.0
// 田前秀樹プロフィール（v1から復活）

'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, Brain, Heart, ChevronRight } from 'lucide-react';

const credentials = [
  {
    icon: Landmark,
    label: 'Scientific Foundation',
    value: 'Yale University: Science of Well-Being Completed',
  },
  {
    icon: Brain,
    label: 'Psychology',
    value: 'University of Pennsylvania: Positive Psychology Completed',
  },
  {
    icon: Heart,
    label: 'Public Health Expertise',
    value: 'Johns Hopkins University: Essential Epidemiology Tools',
  },
];

export default function ProfileSummaryV3() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#03050a] border-b border-white/5">
      <div className="max-w-4xl mx-auto">
        
        {/* セクションラベル */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-white/10 backdrop-blur-sm mb-6">
            <span className="text-white/50 text-xs font-mono tracking-wider uppercase">
              Organizer Profile
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4">
            Liberal Arts Architect
          </h2>
          
          <p className="text-white/40 text-base sm:text-lg">
            技術 × 制度 × 思想 を統合する <span className="underline underline-offset-4">文明OSデザイナー</span>
          </p>
        </div>
        
        {/* プロフィールカード */}
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-10">
          
          {/* 名前 */}
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-2">
              田前 秀樹
            </h3>
            <p className="text-white/30 text-xs sm:text-sm tracking-[0.3em] uppercase">
              Hideki Tamae
            </p>
          </div>
          
          {/* 資格 */}
          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
            {credentials.map((cred, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <cred.icon className="text-white/40" size={18} />
                </div>
                <div>
                  <p className="text-white/40 text-[9px] sm:text-[10px] tracking-widest uppercase mb-1">
                    {cred.label}
                  </p>
                  <p className="text-white text-sm sm:text-base">
                    {cred.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* リンク */}
          <div className="text-center">
            <Link 
              href="/profile"
              className="inline-flex items-center gap-2 text-white/40 hover:text-emerald-400 text-xs sm:text-sm tracking-widest uppercase transition-colors"
            >
              <span>View Full Profile</span>
              <ChevronRight size={14} />
            </Link>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
