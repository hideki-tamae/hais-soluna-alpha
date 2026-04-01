// components/v3/ProblemSolutionV3.tsx - SOLUNA v3.0
// 「反転」セクション（v1から復活）
// THE GREAT INVERSION

'use client';

import React from 'react';
import { Box, Heart, Globe } from 'lucide-react';

const features = [
  {
    icon: Box,
    title: 'Proof of Care',
    description: 'あなたのケアの実践を、ブロックチェーン上の不可逆な記録として証明。優しさが「資産」として蓄積されます。',
  },
  {
    icon: Heart,
    title: 'Value of Kindness',
    description: '自己犠牲ではなく、正当な対価へ。トークンエコノミーにより、誰かを助ける行為が、経済的にも報われる社会へ。',
  },
  {
    icon: Globe,
    title: 'Decentralized OS',
    titleColor: 'text-emerald-400',
    description: '中央集権的な管理を排除し、透明なプログラム（Smart Contract）が公平な分配と秩序を自動執行します。',
  },
];

export default function ProblemSolutionV3() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#010308] border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* セクションラベル */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-6">
            <span className="text-purple-400/80 text-xs font-mono tracking-wider uppercase">
              The Great Inversion
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-4 sm:mb-6">
            世界は　<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">「反転」</span>　する。
          </h2>
          
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            見えない「痛み」を癒やし、見えない「ケア」を価値に変える。<br />
            <span className="text-purple-300">Re-Verse Civilization</span>は、優しさが循環する新たな経済圏OSです。
          </p>
        </div>
        
        {/* 3つの柱 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* アイコン */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-emerald-500/30 transition-colors">
                <feature.icon 
                  className={`${index === 2 ? 'text-emerald-400' : 'text-white/60'} group-hover:text-emerald-400 transition-colors`} 
                  size={24} 
                />
              </div>
              
              {/* タイトル */}
              <h3 className={`text-xl sm:text-2xl font-light mb-3 ${feature.titleColor || 'text-white'}`}>
                {feature.title}
              </h3>
              
              {/* 説明 */}
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
