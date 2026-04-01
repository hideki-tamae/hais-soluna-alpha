// components/v3/ParticipationPaths.tsx - SOLUNA v3.0
// 3つの参加パス（VSL第7段階: Options）
// ジェイ・エイブラハム: 選択肢を与えることで成約率向上

'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Mic, Landmark, CheckCircle2 } from 'lucide-react';

const paths = [
  {
    id: 'reading',
    icon: BookOpen,
    title: 'Reading Verification',
    subtitle: '個人・読者向け',
    description: '『葉隠』や指定図書の読書履歴をアップロード。あなたの学習がトークン化・資産化されます。',
    features: ['読書履歴のSBT化', "Founder's Claim権", 'ベータ期間無料'],
    cta: { label: '申請する（無料）', href: '/tester-claim' },
    isPrimary: true,
    accentColor: 'emerald',
  },
  {
    id: 'voice',
    icon: Mic,
    title: 'Voice Commitment',
    subtitle: '7日間ログ / 無料',
    description: '30秒の音声チェックイン × 7日。あなたのウェルビーイングを自動可視化。',
    features: ['音声解析×AI', 'ストレス可視化', 'SOLUNAトークン'],
    cta: { label: 'ダッシュボード', href: '/dashboard' },
    isPrimary: false,
    accentColor: 'white',
  },
  {
    id: 'museum',
    icon: Landmark,
    title: 'Genesis Art Museum',
    subtitle: 'SBT所有者向け',
    description: '制作過程・設計思想の解放。限定デジタル展示への入場権。',
    features: ['設計思想公開', '限定展示', 'コミュニティ'],
    cta: { label: 'ミュージアム入場', href: 'https://x.gd/EjEVA', external: true },
    isPrimary: false,
    accentColor: 'purple',
  },
];

export default function ParticipationPaths() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#010308]">
      <div className="max-w-7xl mx-auto">
        
        {/* ヘッダー */}
        <div className="text-center mb-12 sm:mb-16 md:mb-24">
          <span className="text-emerald-500 text-[9px] sm:text-[10px] tracking-[0.4em] font-black uppercase mb-3 sm:mb-4 block">
            参加形式
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 sm:mb-6">
            あなたの立場で<span className="text-emerald-300">選んでください</span>
          </h2>
          <p className="text-white/40 text-[10px] sm:text-sm tracking-wider max-w-2xl mx-auto">
            全てのパスはSBT（譲渡不可トークン）を発行します。<br />
            つまり、あなたの「ケアの来歴」は永遠に記録される。
          </p>
        </div>

        {/* 3つのカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {paths.map((path) => (
            <div 
              key={path.id}
              className={`
                group relative p-6 sm:p-8 transition-all duration-500 flex flex-col
                ${path.isPrimary 
                  ? 'bg-gradient-to-b from-emerald-900/20 to-[#010308] border-2 border-emerald-500/50 hover:border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]' 
                  : 'bg-white/[0.02] border border-white/20 hover:border-white/40 hover:bg-white/[0.04]'
                }
              `}
            >
              {/* 推奨バッジ */}
              {path.isPrimary && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[8px] sm:text-[9px] font-black px-2 sm:px-3 py-1 uppercase tracking-widest animate-pulse">
                  ★ 推奨
                </div>
              )}
              
              {/* アイコン */}
              <path.icon 
                className={`
                  mb-4 sm:mb-6 transition-colors
                  ${path.isPrimary 
                    ? 'text-emerald-500' 
                    : 'text-white/60 group-hover:text-emerald-400'
                  }
                `} 
                size={32} 
              />
              
              {/* タイトル */}
              <h3 className={`
                text-lg sm:text-xl font-light mb-1 sm:mb-2 transition-colors
                ${path.isPrimary ? 'text-white group-hover:text-emerald-400' : 'text-white'}
              `}>
                {path.title}
              </h3>
              
              {/* サブタイトル */}
              <p className={`
                text-[8px] sm:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-6
                ${path.isPrimary ? 'text-emerald-500' : 'text-white/40'}
              `}>
                {path.subtitle}
              </p>
              
              {/* 説明 */}
              <p className="text-white/60 text-[12px] sm:text-sm leading-relaxed mb-6 sm:mb-8 flex-grow">
                {path.description}
              </p>

              {/* 機能リスト */}
              <ul className="text-white/50 text-[11px] sm:text-xs space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {path.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2">
                    <CheckCircle2 
                      size={14} 
                      className={`flex-shrink-0 mt-0.5 ${path.isPrimary ? 'text-emerald-500' : 'text-white/30'}`} 
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* CTA */}
              {path.cta.external ? (
                <a 
                  href={path.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    w-full py-3 sm:py-4 text-center text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase transition-all
                    ${path.isPrimary 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                      : 'border border-white/30 text-white hover:bg-white/10'
                    }
                  `}
                >
                  {path.cta.label}
                </a>
              ) : (
                <Link 
                  href={path.cta.href}
                  className={`
                    w-full py-3 sm:py-4 text-center text-[9px] sm:text-[10px] font-black tracking-[0.2em] uppercase transition-all
                    ${path.isPrimary 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
                      : 'border border-white/30 text-white hover:bg-white/10'
                    }
                  `}
                >
                  {path.cta.label}
                </Link>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
