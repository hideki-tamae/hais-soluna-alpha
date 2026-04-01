// components/v3/FearSectionV3.tsx - SOLUNA v3.0
// 恐怖訴求（VSL第4段階: Fear）
// 世界最高クオリティのカスタムアイコン

'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

// カスタムアイコン: 砂時計（時間の緊迫性）
const HourglassIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hourglassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    {/* 外枠 */}
    <path 
      d="M12 4h24v2c0 8-6 12-12 16 6 4 12 8 12 16v2H12v-2c0-8 6-12 12-16-6-4-12-8-12-16V4z" 
      stroke="url(#hourglassGrad)" 
      strokeWidth="2" 
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* 上部の砂 */}
    <path 
      d="M18 10h12c0 4-3 6-6 8-3-2-6-4-6-8z" 
      fill="currentColor" 
      opacity="0.3"
    />
    {/* 落ちる砂 */}
    <line x1="24" y1="20" x2="24" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.6">
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
    </line>
    {/* 下部の砂 */}
    <path 
      d="M16 38h16c0-6-4-8-8-10-4 2-8 4-8 10z" 
      fill="currentColor" 
      opacity="0.5"
    />
    {/* 装飾ライン */}
    <line x1="10" y1="4" x2="38" y2="4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="44" x2="38" y2="44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// カスタムアイコン: 崩壊するコイン（経済的損失）
const CrumblingCoinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="coinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.4" />
      </linearGradient>
    </defs>
    {/* メインコイン */}
    <ellipse cx="24" cy="20" rx="14" ry="14" stroke="url(#coinGrad)" strokeWidth="2" fill="none" />
    <ellipse cx="24" cy="20" rx="10" ry="10" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
    {/* ¥マーク */}
    <text x="24" y="25" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold" opacity="0.8">¥</text>
    {/* 崩れ落ちる破片 */}
    <circle cx="34" cy="32" r="2" fill="currentColor" opacity="0.6">
      <animate attributeName="cy" values="32;40;32" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="38" cy="36" r="1.5" fill="currentColor" opacity="0.4">
      <animate attributeName="cy" values="36;44;36" dur="2.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="30" cy="34" r="1" fill="currentColor" opacity="0.5">
      <animate attributeName="cy" values="34;42;34" dur="1.8s" repeatCount="indefinite" />
    </circle>
    {/* 下降矢印 */}
    <path d="M40 28l4 6h-8l4-6z" fill="currentColor" opacity="0.7" />
    <line x1="40" y1="22" x2="40" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.7" />
  </svg>
);

// カスタムアイコン: 透明化する人々（見えない英雄）
const FadingPeopleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
        <stop offset="50%" stopColor="currentColor" stopOpacity="0.5" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
      </linearGradient>
    </defs>
    {/* 左の人（濃い） */}
    <circle cx="12" cy="14" r="5" fill="currentColor" opacity="1" />
    <path d="M4 38v-4a8 8 0 0116 0v4" fill="currentColor" opacity="0.9" />
    
    {/* 中央の人（中間） */}
    <circle cx="24" cy="14" r="5" fill="currentColor" opacity="0.5" />
    <path d="M16 38v-4a8 8 0 0116 0v4" fill="currentColor" opacity="0.4" />
    
    {/* 右の人（薄い・消えかけ） */}
    <circle cx="36" cy="14" r="5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.25" strokeDasharray="2 2" />
    <path d="M28 38v-4a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.2" strokeDasharray="3 3" />
    
    {/* 消失エフェクト */}
    <circle cx="40" cy="10" r="1" fill="currentColor" opacity="0.3">
      <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="42" cy="16" r="0.8" fill="currentColor" opacity="0.2">
      <animate attributeName="opacity" values="0.2;0;0.2" dur="2.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const fearPoints = [
  {
    title: '今この瞬間も',
    stat: '2分に1人',
    description: '日本で孤立状態に陥っている。その多くは「助けを呼べなかった人」。',
    color: 'red',
    Icon: HourglassIcon,
  },
  {
    title: '社会的損失',
    stat: '年間4.2兆円',
    description: '未介入による社会保障コスト。あなたのケアが、これを防いでいる。',
    color: 'amber',
    Icon: CrumblingCoinIcon,
  },
  {
    title: '見えない英雄',
    stat: '800万人',
    description: 'ヤングケアラー・介護者・支援者。彼らの価値は「ゼロ」として扱われている。',
    color: 'purple',
    Icon: FadingPeopleIcon,
  },
];

export default function FearSectionV3() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-[#010308] via-[#0a0510] to-[#010308] border-b border-white/5">
      <div className="max-w-5xl mx-auto">
        
        {/* 警告バッジ */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full">
            <AlertTriangle className="text-red-400 animate-pulse" size={14} />
            <span className="text-red-400 text-[9px] sm:text-[10px] tracking-[0.3em] font-black uppercase">
              社会的危機
            </span>
          </div>
        </div>
        
        {/* メインメッセージ */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight mb-4 sm:mb-6">
            あなたが<span className="text-red-400">行動しなければ</span>、<br />
            <span className="text-white/50 text-xl sm:text-2xl md:text-3xl">
              誰かが、今日も苦しんでいる。
            </span>
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-2xl mx-auto">
            これは脅しではない。統計的事実だ。
          </p>
        </div>
        
        {/* 3つの恐怖ポイント */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {fearPoints.map((point, index) => {
            const colorClasses = {
              red: 'border-red-500/40 hover:border-red-500/80 bg-gradient-to-br from-red-900/30 to-transparent',
              amber: 'border-amber-500/40 hover:border-amber-500/80 bg-gradient-to-br from-amber-900/30 to-transparent',
              purple: 'border-purple-500/40 hover:border-purple-500/80 bg-gradient-to-br from-purple-900/30 to-transparent',
            };
            const iconColorClasses = {
              red: 'text-red-400',
              amber: 'text-amber-400',
              purple: 'text-purple-400',
            };
            const statColorClasses = {
              red: 'text-red-300',
              amber: 'text-amber-300',
              purple: 'text-purple-300',
            };
            
            return (
              <div 
                key={index}
                className={`
                  group relative p-6 sm:p-8 rounded-2xl border transition-all duration-500
                  hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]
                  ${colorClasses[point.color as keyof typeof colorClasses]}
                `}
              >
                {/* カスタムSVGアイコン */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 mb-4 ${iconColorClasses[point.color as keyof typeof iconColorClasses]}`}>
                  <point.Icon className="w-full h-full" />
                </div>
                
                {/* タイトル */}
                <p className="text-white/50 text-[10px] sm:text-xs tracking-widest uppercase mb-3">
                  {point.title}
                </p>
                
                {/* 統計数値 */}
                <p className={`text-4xl sm:text-5xl md:text-6xl font-['Italiana'] mb-4 ${statColorClasses[point.color as keyof typeof statColorClasses]}`}>
                  {point.stat}
                </p>
                
                {/* 説明 */}
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* 転換点: 恐怖→希望 */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent mx-auto mb-6" />
          
          <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-4">
            しかし—
          </p>
          
          <p className="text-emerald-400 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
            あなたの「話を聞いた」が、<br />
            <span className="font-bold">統計的に0.68人の孤立を防いでいる。</span>
          </p>
          
          <p className="text-white/40 text-sm mt-4">
            それを、見える形にしませんか？
          </p>
        </div>
        
      </div>
    </section>
  );
}
