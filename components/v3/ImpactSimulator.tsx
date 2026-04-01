// components/v3/ImpactSimulator.tsx - SOLUNA v3.0
// シミュレーター + 感情橋（VSL第5段階: Solution）
// 「孤立」表現で統一

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';

export default function ImpactSimulator() {
  const [interventionCount, setInterventionCount] = useState(10);
  const [simulatorTouched, setSimulatorTouched] = useState(false);
  
  const LIFE_VALUE_JPY = 100000;
  const PREVENTED_COST_PER_INTERVENTION = 1500000;
  const ASSET_PER_CARE = 3880;
  
  const livesaved = Math.round(interventionCount * 0.68);
  const yourAssetCreated = interventionCount * ASSET_PER_CARE;
  const preventedSocialCost = interventionCount * PREVENTED_COST_PER_INTERVENTION;
  const roi = yourAssetCreated > 0 
    ? ((LIFE_VALUE_JPY * interventionCount + preventedSocialCost) / yourAssetCreated / 100).toFixed(1) 
    : "0.0";

  const handleSliderChange = (val: number) => {
    setSimulatorTouched(true);
    setInterventionCount(val);
  };

  return (
    <section id="simulator" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 border-b border-white/5 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 items-start lg:items-center">
          
          {/* 左: 説明 */}
          <div className="w-full lg:w-1/2">
            <span className="text-emerald-500 text-[9px] sm:text-[10px] tracking-[0.4em] font-black uppercase mb-3 sm:mb-4 block">
              仕組み: ケア→社会的価値の因果チェーン
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6 sm:mb-8 leading-tight">
              その<span className="text-emerald-300">「話を聞いた」</span>が、<br />
              <span className="text-white/60 text-xl sm:text-2xl md:text-3xl">
                何人の孤立を防いだか。
              </span>
            </h2>
            
            <p className="text-white/50 mb-8 sm:mb-12 leading-relaxed text-sm sm:text-base">
              社会から見放された瞬間、人は孤立する。<br />
              その1秒前に、あなたのケアが届いた。<br /><br />
              <span className="text-white/80 font-bold">
                統計学的に、その介入が1人の孤立を救った確率は0.68。
              </span><br />
              100件のケアで、68人の社会復帰支援。<br />
              社会が支払うはずだった支援コストは—
            </p>

            {/* スライダー */}
            <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 shadow-inner">
              <label className="text-[9px] sm:text-xs text-white/70 tracking-widest uppercase font-bold block mb-4 sm:mb-6">
                あなたが行ったケア（月間）
              </label>
              
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={interventionCount}
                onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-6 sm:mb-8"
              />
              
              <div className="flex justify-between items-end gap-4">
                <div className="text-4xl sm:text-5xl font-['Italiana'] text-white">
                  {interventionCount}
                </div>
                <div className="text-right">
                  <div className="text-[9px] sm:text-xs text-white/40 uppercase tracking-widest mb-1">ケア</div>
                  <div className="text-emerald-400 font-bold text-xs">
                    = {livesaved}人を支援
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右: 3層のインパクト表示 */}
          <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
            
            {/* Layer 1: 支援された人数 */}
            <div className="relative bg-gradient-to-br from-emerald-900/30 to-[#010308] border border-emerald-500/40 p-6 sm:p-8 rounded-3xl group transition-all duration-500 hover:border-emerald-500/80 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <p className="text-emerald-400/70 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-black">
                  孤立から救われた人
                </p>
                <Heart className="text-emerald-500" size={18} />
              </div>
              <div className="text-4xl sm:text-5xl font-['Italiana'] text-white leading-none mb-2">
                {livesaved}
              </div>
              <p className="text-white/40 text-[9px] sm:text-xs tracking-wider">
                人 / {interventionCount}件のケア
              </p>
            </div>

            {/* Layer 2: 社会的崩壊コスト防止 */}
            <div className="relative bg-gradient-to-br from-red-900/20 to-[#010308] border border-red-500/30 p-6 sm:p-8 rounded-3xl group transition-all duration-500 hover:border-red-500/60 hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <p className="text-red-400/60 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-black">
                  防いだ社会的損失
                </p>
                <Shield className="text-red-500" size={18} />
              </div>
              <div className="text-4xl sm:text-5xl font-['Italiana'] text-white leading-none mb-2">
                ¥{(preventedSocialCost / 100000000).toFixed(1)}億
              </div>
              <p className="text-white/40 text-[9px] sm:text-xs tracking-wider">
                失われるはずだった社会資本
              </p>
            </div>

            {/* Layer 3: あなたの資産化 */}
            <div className="relative bg-gradient-to-br from-[#B69F66]/20 to-[#010308] border border-[#B69F66]/40 p-6 sm:p-8 rounded-3xl group transition-all duration-500 hover:border-[#B69F66]/80">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <p className="text-[#B69F66]/70 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-black">
                  あなたが獲得したSOLUNA
                </p>
                <Zap className="text-[#B69F66]" size={18} />
              </div>
              <div className="text-4xl sm:text-5xl font-['Italiana'] text-white leading-none mb-2">
                ¥{yourAssetCreated.toLocaleString()}
              </div>
              <p className="text-white/40 text-[9px] sm:text-xs tracking-wider">
                永続的なブロックチェーン資産
              </p>
            </div>

            {/* SROI */}
            <div className="flex items-center gap-4 px-4 py-6 sm:py-8 border border-white/10 bg-white/5 rounded-2xl">
              <TrendingUp className="text-emerald-400 flex-shrink-0" size={20} />
              <div className="flex-grow">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Social Return on Impact</p>
                <div className="text-2xl sm:text-3xl font-['Italiana'] text-white">
                  {roi}x
                </div>
              </div>
              <p className="text-white/30 text-[9px] text-right leading-tight">
                投資額に対する<br />社会的リターン倍率
              </p>
            </div>

          </div>

        </div>

        {/* 感情橋セクション */}
        <div className={`
          mt-16 sm:mt-20 text-center max-w-2xl mx-auto
          transition-all duration-700
          ${simulatorTouched ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-6">
            今、あなたがスライダーを動かしたように—<br />
            <span className="text-white font-bold">現実でも、あなたのケアが誰かを支えている。</span>
          </p>
          <p className="text-emerald-400 text-sm sm:text-base font-bold mb-8">
            それを、もう見落とさせない。
          </p>
          <Link 
            href="/tester-claim" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] sm:text-xs tracking-[0.2em] uppercase transition-all hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]"
          >
            <span>あなたのケアを記録する</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
