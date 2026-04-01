"use client";

import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "¥50,000",
    description: "まず自部署から。スモールスタート用",
    features: ["最大10ユーザー", "基本バイオマーカー解析", "月間レポートPDF", "メールサポート"],
    recommended: false
  },
  {
    name: "Professional",
    price: "¥150,000",
    description: "組織の健全性を可視化する標準プラン",
    features: ["ユーザー無制限", "全バイオマーカー解析", "リアルタイム異常検知アラート", "管理画面ダッシュボード", "優先サポート"],
    recommended: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "独自のインフラ、API連携が必要な企業へ",
    features: ["オンプレミス対応可", "API/SDK提供", "24時間専任サポート", "独自アルゴリズム調整", "SLA保証"],
    recommended: false
  }
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
      {/* 背景のアクセント：薩摩の刀のような鋭いライン */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Implementation Plans</h2>
        <p className="text-slate-400 mb-16 max-w-2xl mx-auto">
          組織の「未認識債務」を解消し、人的資本を資産へ変える。<br className="hidden md:block" />
          Re-Verse Civilizationが提案する、次世代のリスク管理インフラ。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative p-8 rounded-2xl border transition-all duration-500 hover:translate-y-[-8px] flex flex-col ${
                plan.recommended 
                  ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_40px_rgba(59,130,246,0.15)]' 
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase">
                  Recommended
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-white mb-4">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-sm font-normal text-slate-500 ml-1">/mo</span>}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed min-h-[40px]">{plan.description}</p>
              </div>

              <ul className="text-left space-y-4 mb-10 flex-grow">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.recommended ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                plan.recommended 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
              }`}>
                {plan.name === "Enterprise" ? "お問い合わせ" : "このプランで相談する"}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-slate-600 font-mono italic">
          ※ 導入には最短1週間のヒアリングおよび設定期間を頂戴いたします。
        </p>
      </div>
    </section>
  );
};