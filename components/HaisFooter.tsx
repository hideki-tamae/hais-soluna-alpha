import React from 'react';
import Link from 'next/link';

const HaisFooter = () => {
  return (
    <footer className="w-full bg-[#020202] text-white py-12 border-t border-white/10 mt-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* 左側：ブランド情報 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-wider text-white uppercase">ACES CARE HUB JAPAN</h3>
            <div className="space-y-1">
              <p className="text-gray-400 text-sm font-medium">Re-Verse Civilization 優しさが制度になる文明へ</p>
              <p className="text-gray-500 text-xs">Human Asset Integrity System (HAIS) Demo Context</p>
            </div>
          </div>

          {/* 右側：Navigationのみ */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-white uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/hais" className="hover:text-cyan-400 transition-colors">
                  HAIS Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 mt-8 text-center text-gray-600 text-[10px]">
          <p>© 2026 ACES CARE HUB JAPAN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default HaisFooter;
