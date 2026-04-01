// components/v3/FooterSection.tsx - SOLUNA v3.0
// フッター
// 審美眼: 千利休的ミニマリズム

'use client';

import React from 'react';
import Link from 'next/link';

const footerLinks = [
  { label: 'Profile', href: '/profile' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Policy', href: '/policy' },
  { label: 'V1 Archive', href: '/v1' },
];

export default function FooterSection() {
  return (
    <footer className="py-12 sm:py-16 md:py-20 border-t border-white/5 text-center px-4">
      
      {/* ロゴ */}
      <div className="mb-6 sm:mb-8">
        <span className="text-lg sm:text-xl font-light tracking-[0.5em] text-white uppercase">
          SOLUNA
        </span>
        <p className="text-[9px] sm:text-[10px] text-white/30 tracking-widest mt-2">
          Re-Verse Civilization Protocol
        </p>
      </div>
      
      {/* ナビゲーション */}
      <div className="flex justify-center gap-4 sm:gap-8 mb-8 sm:mb-12 flex-wrap">
        {footerLinks.map((link, index) => (
          <Link 
            key={index}
            href={link.href} 
            className="text-[9px] sm:text-[10px] text-white/30 hover:text-emerald-400 tracking-widest uppercase transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      {/* クレジット */}
      <p className="text-[8px] sm:text-[9px] tracking-[0.3em] text-white/20 uppercase leading-relaxed">
        © 2025 Re-Verse Civilization.<br />
        Designed by Hideki Tamae × Claude (World's Top Minds Integrated)<br />
        Strategy: Jay Abraham × Gary Halbert × Jon Benson × Jason Forrest<br />
        Aesthetics: Leonardo da Vinci × Sen no Rikyū × Steve Jobs × Tadao Ando
      </p>
      
    </footer>
  );
}
