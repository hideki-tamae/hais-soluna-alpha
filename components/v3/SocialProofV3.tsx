// components/v3/SocialProofV3.tsx - SOLUNA v3.0
// 信頼性の即座確立（VSL第2段階）
// 修正: 実績数字を削除、技術基盤と設計思想に変更

'use client';

import React from 'react';
import { Cpu, FlaskConical, Shield, Sparkles } from 'lucide-react';

const proofItems = [
  {
    icon: FlaskConical,
    label: '科学的基盤',
    value: 'Johns Hopkins',
    subtext: '公衆衛生学の知見を実装',
  },
  {
    icon: Shield,
    label: 'ブロックチェーン',
    value: 'Ethereum',
    subtext: '改ざん不可能な記録',
  },
  {
    icon: Cpu,
    label: '技術スタック',
    value: 'Next.js',
    subtext: 'エンタープライズ品質',
  },
  {
    icon: Sparkles,
    label: '設計目標',
    value: 'SROI 5.0x',
    subtext: '社会的投資収益率',
  },
];

const techStack = ['Ethereum', 'Next.js', 'Supabase', 'Prisma', 'Vercel'];

export default function SocialProofV3() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 border-b border-white/5 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        
        {/* セクションラベル */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-emerald-500/60 text-[9px] sm:text-[10px] tracking-[0.4em] font-black uppercase">
            Built on Trust
          </span>
        </div>
        
        {/* 4つの基盤 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {proofItems.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white/[0.02] border border-white/10 p-4 sm:p-6 rounded-xl hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300"
            >
              <item.icon 
                className="text-emerald-500/50 group-hover:text-emerald-400 mb-3 sm:mb-4 transition-colors" 
                size={20} 
              />
              
              <p className="text-white/40 text-[9px] sm:text-[10px] tracking-widest uppercase mb-1 sm:mb-2">
                {item.label}
              </p>
              
              <p className="text-white text-xl sm:text-2xl font-light mb-1">
                {item.value}
              </p>
              
              <p className="text-white/30 text-[9px] sm:text-xs">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
        
        {/* 技術スタック */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5">
          <p className="text-center text-[8px] sm:text-[9px] text-white/20 tracking-[0.3em] uppercase mb-4 sm:mb-6">
            Powered by Global Standards
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {techStack.map((tech, index) => (
              <span 
                key={index}
                className="text-[10px] sm:text-sm font-light tracking-wider text-white/40 hover:text-emerald-400 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
