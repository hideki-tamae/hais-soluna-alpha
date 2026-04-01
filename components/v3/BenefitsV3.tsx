// components/v3/BenefitsV3.tsx - SOLUNA v3.0
// ベネフィット（v1から復活）

'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, FileText, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: "Founder's Claim Guarantee",
    description: 'SOLUNAトークンのClaim権を確約し、優先付与。一般公開前のプレ・メインネット段階での保有権を保証します。',
  },
  {
    icon: Users,
    title: "Architects' Private Channel",
    description: 'コア開発チームとの限定コミュニティへの参加資格。仕様策定やガバナンス投票への早期アクセス権。',
  },
  {
    icon: FileText,
    title: 'Contributor Log',
    description: 'Public Dashboardへの貢献者（Contributor）として記録。あなたの名前がRe-Verse（文明再起動）の『礎』として刻まれます。',
  },
];

export default function BenefitsV3() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#03050a] border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* 左: ベネフィット一覧 */}
          <div>
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full border border-[#B69F66]/30 backdrop-blur-sm mb-6">
              <span className="text-[#B69F66]/80 text-xs font-mono tracking-wider uppercase">
                Exclusive Privilege
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B69F66] to-[#D4C4A0]">
                独占的なベネフィット
              </span>
            </h2>
            
            <p className="text-white/50 text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed">
              初期メンバーとなるあなたには、<br />
              将来のSOLUNAエコシステムにおける<span className="text-white font-bold">特別な権利</span>が付与されます。
            </p>
            
            <div className="space-y-6 sm:space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4 sm:gap-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#B69F66]/10 border border-[#B69F66]/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="text-[#B69F66]" size={20} />
                  </div>
                  <div>
                    <h3 className="text-white text-base sm:text-lg font-medium mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 右: CTA カード */}
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-light text-white text-center mb-4">
              Be the First.
            </h3>
            
            <p className="text-white/50 text-center text-sm sm:text-base mb-8 leading-relaxed">
              この「創始者枠」は限られています。<br />
              定員に達し次第、第1期募集は終了します。
            </p>
            
            <Link 
              href="/tester-claim"
              className="w-full flex items-center justify-center gap-3 px-6 py-4 sm:py-5 bg-gradient-to-r from-[#B69F66] to-[#D4C4A0] text-black font-bold text-sm sm:text-base rounded-lg hover:shadow-[0_0_40px_rgba(182,159,102,0.4)] transition-all duration-300"
            >
              <span>いますぐ Founding Member に応募</span>
              <ArrowRight size={18} />
            </Link>
            
            <p className="text-center text-[10px] sm:text-xs text-emerald-400/60 mt-4 tracking-wider">
              ● Limited Seats Available
            </p>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}
