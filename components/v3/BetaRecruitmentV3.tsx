// components/v3/BetaRecruitmentV3.tsx - SOLUNA v3.0
// βテスター募集（v1から復活）

'use client';

import React from 'react';
import Link from 'next/link';
import { Landmark, Cpu, Activity, ArrowUpRight } from 'lucide-react';

const roles = [
  {
    number: '01',
    icon: Landmark,
    title: 'Civilization Architect',
    subtitle: '文明構築者',
    target: '政策・制度設計 / 福祉現場 / 社会起業家',
    contribution: 'Claimフローが社会システムとして機能する上での矛盾点、および法規制/運用面での問題提起。',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'Protocol Engineer',
    subtitle: 'プロトコル技術者',
    target: 'Web3 / セキュリティ監査 / フルスタック（Auth・Wallet・API）',
    contribution: 'Claim基盤、HMAC/Nonceロジック、ウォレット接続の技術的な脆弱性およびUXの検証。',
  },
  {
    number: '03',
    icon: Activity,
    title: 'Care Pioneer',
    titleColor: 'text-emerald-400',
    subtitle: 'ケアパイオニア',
    target: 'ACES / ヤングケアラー / 当事者家族',
    contribution: 'Claimの体験が、実際のケア現場や生活においてどれほど意味を持つか、感情的なフィードバックを提供。',
    highlight: true,
  },
];

export default function BetaRecruitmentV3() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#010308] border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* セクションラベル */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400/80 text-xs font-mono tracking-wider uppercase">
              Recruitment Status: Open
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">βテスター募集要項</span>
            <span className="text-white/60 text-xl sm:text-2xl md:text-3xl block mt-2">(Founding Member)</span>
          </h2>
          
          <p className="text-white/50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            ただのテストではありません。「ケアが制度になる文明」の<span className="text-white font-bold">初期構築</span><br />
            （Initial Build）　に参加する招待状です。
          </p>
        </div>
        
        {/* 3つの役割 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {roles.map((role, index) => (
            <div 
              key={index}
              className={`
                group relative p-6 sm:p-8 rounded-2xl border transition-all duration-500
                ${role.highlight 
                  ? 'bg-gradient-to-b from-emerald-900/20 to-transparent border-emerald-500/40 hover:border-emerald-500/80' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                }
              `}
            >
              {/* 番号とアイコン */}
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl sm:text-5xl font-['Italiana'] text-white/10">
                  {role.number}
                </span>
                <role.icon 
                  className={`${role.highlight ? 'text-emerald-400' : 'text-white/40'}`} 
                  size={24} 
                />
              </div>
              
              {/* タイトル */}
              <h3 className={`text-xl sm:text-2xl font-light mb-1 ${role.titleColor || 'text-white'}`}>
                {role.title}
              </h3>
              <p className="text-white/40 text-sm mb-6">
                {role.subtitle}
              </p>
              
              {/* ターゲット */}
              <div className="mb-4">
                <p className="text-white/30 text-[9px] tracking-widest uppercase mb-2">
                  Target Persona
                </p>
                <p className="text-white/60 text-sm">
                  {role.target}
                </p>
              </div>
              
              {/* 貢献内容 */}
              <div className="mb-6">
                <p className="text-white/30 text-[9px] tracking-widest uppercase mb-2">
                  Contribution
                </p>
                <p className="text-white/50 text-xs leading-relaxed">
                  {role.contribution}
                </p>
              </div>
              
              {/* リンク */}
              <Link 
                href="/tester-claim"
                className={`
                  inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-colors
                  ${role.highlight 
                    ? 'text-emerald-400 hover:text-emerald-300' 
                    : 'text-white/40 hover:text-white'
                  }
                `}
              >
                <span>Initialize</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
