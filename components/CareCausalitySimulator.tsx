"use client";

import React, { useState } from 'react';
import { Activity, AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

export default function CareCausalitySimulator() {
  const [count, setCount] = useState(10);
  
  // 計算ロジック定義
  // 1アクションあたりの文明価値（Asset）
  const UNIT_VALUE = 3880; 
  // 1アクションあたりが防ぐ社会的損失（Loss Prevention）
  // ※例：早期ケアによる将来の医療費・生活保護費・逸失利益の削減効果など
  const UNIT_LOSS_PREVENTION = 15400; 

  const careValue = count * UNIT_VALUE;
  const lossPreventionValue = count * UNIT_LOSS_PREVENTION;
  const roi = ((lossPreventionValue + careValue) / careValue).toFixed(1);

  return (
    <section id="simulator" className="py-24 px-6 border-b border-white/5 bg-white/[0.01]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Input (Lever) */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-emerald-400 tracking-widest uppercase font-bold">
                Care Causality Engine
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-8 leading-tight">
              その優しさは、<br />
              <span className="text-emerald-200 italic">どれだけの悲劇を防いだか？</span>
            </h2>
            <p className="text-white/40 mb-12 leading-relaxed">
              「ただ話を聞いただけ」「少し手伝っただけ」。<br />
              その些細なケアがなければ、社会が将来支払うことになっていた<span className="text-white border-b border-white/30">「見えないコスト（社会的損失）」</span>を可視化します。
            </p>
            
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-inner">
              <label className="text-xs text-white/70 tracking-widest uppercase font-bold block mb-6">
                Input Your Care Actions / Month
              </label>
              <input 
                type="range" min="1" max="100" value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-8"
              />
              <div className="flex justify-between items-end">
                <div className="text-5xl font-['Italiana'] text-white">{count}</div>
                <div className="text-xs text-white/30 uppercase tracking-widest mb-2">Actions</div>
              </div>
            </div>
          </div>

          {/* Right: Visualization (Asset vs Loss) */}
          <div className="w-full lg:w-1/2 space-y-6">
            
            {/* 1. Positive Asset (Gain) */}
            <div className="relative bg-gradient-to-r from-[#0a1a15] to-[#010308] border border-emerald-500/30 p-8 rounded-3xl group transition-all duration-500 hover:border-emerald-500/60">
              <div className="flex justify-between items-start mb-4">
                <p className="text-emerald-400/60 text-[10px] tracking-[0.3em] uppercase font-black">
                  Civilization Asset Created
                </p>
                <Activity className="text-emerald-500" size={18} />
              </div>
              <div className="text-5xl font-['Italiana'] text-white leading-none mb-2">
                ¥{careValue.toLocaleString()}
              </div>
              <p className="text-white/30 text-[10px] tracking-wider">
                あなたが創造した文明的価値（SOLUNA受取額）
              </p>
            </div>

            {/* 2. Social Loss Prevention (Pain/Risk) - ここが追加要素 */}
            <div className="relative bg-gradient-to-r from-[#1a0505] to-[#010308] border border-red-500/30 p-8 rounded-3xl group transition-all duration-500 hover:border-red-500/60">
              <div className="flex justify-between items-start mb-4">
                <p className="text-red-400/60 text-[10px] tracking-[0.3em] uppercase font-black">
                  Social Loss Prevented
                </p>
                <AlertTriangle className="text-red-500" size={18} />
              </div>
              <div className="text-5xl font-['Italiana'] text-white leading-none mb-2">
                ¥{lossPreventionValue.toLocaleString()}
              </div>
              <p className="text-white/30 text-[10px] tracking-wider">
                もしあなたが動かなければ、社会が失っていたコスト
              </p>
            </div>

            {/* 3. ROI (Logic) */}
            <div className="flex items-center gap-6 px-4">
              <div className="h-px bg-white/10 flex-grow"></div>
              <div className="flex items-center gap-3 text-emerald-400">
                <TrendingUp size={16} />
                <span className="text-sm font-black tracking-widest">SROI: {roi}x</span>
              </div>
              <div className="h-px bg-white/10 flex-grow"></div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}