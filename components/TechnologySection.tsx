"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';

// ▼▼▼ S-RANK CUSTOM ICONS (High Density & Glow) ▼▼▼

const IconRPPG = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <defs>
      <filter id="techGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#techGlowBlue)" strokeLinecap="round" strokeLinejoin="round">
      {/* Central Heart Rhythm */}
      <path d="M15 50 L30 50 L40 20 L60 80 L70 50 L85 50" stroke="currentColor" strokeWidth="2" className="text-cyan-400" />
      {/* Circuit Network Ring */}
      <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="1" className="text-blue-500/50" strokeDasharray="4 4"/>
      {/* Connection Nodes */}
      <path d="M50 15 V5 M50 95 V85 M15 50 H5 M95 50 H85" stroke="currentColor" strokeWidth="1" className="text-blue-500/50" />
      <circle cx="50" cy="5" r="3" fill="currentColor" className="text-cyan-400" />
      <circle cx="95" cy="50" r="3" fill="currentColor" className="text-cyan-400" />
      <circle cx="50" cy="95" r="3" fill="currentColor" className="text-cyan-400" />
      <circle cx="5" cy="50" r="3" fill="currentColor" className="text-cyan-400" />
    </g>
  </svg>
);

const IconVocal = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <defs>
      <filter id="techGlowPurple" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#techGlowPurple)" strokeLinecap="round" strokeLinejoin="round">
      {/* Mic Core */}
      <rect x="40" y="20" width="20" height="40" rx="10" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
      <path d="M30 60 C30 71.0457 38.9543 80 50 80 C61.0457 80 70 71.0457 70 60" stroke="currentColor" strokeWidth="2" className="text-purple-500/70" />
      <path d="M50 80 V95 M40 95 H60" stroke="currentColor" strokeWidth="2" className="text-purple-500/70" />
      {/* Frequency Analysis Lines */}
      <path d="M10 40 Q 25 20, 10 10" stroke="currentColor" strokeWidth="1" className="text-purple-400/60" />
      <path d="M90 40 Q 75 20, 90 10" stroke="currentColor" strokeWidth="1" className="text-purple-400/60" />
      {/* Animated Bars */}
      <line x1="20" y1="50" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
        {/* @ts-ignore */}
        <animate attributeName="y2" values="30;45;30" duration="1.5s" repeatCount="indefinite" />
      </line>
       <line x1="80" y1="50" x2="80" y2="30" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
        {/* @ts-ignore */}
        <animate attributeName="y2" values="30;40;30" duration="1.8s" repeatCount="indefinite" />
      </line>
    </g>
  </svg>
);

const IconMicroExpression = () => (
  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
    <defs>
      <filter id="techGlowEmerald" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#techGlowEmerald)" strokeLinecap="round" strokeLinejoin="round">
      {/* Scan Frame */}
      <path d="M20 30 V20 H30 M70 20 H80 V30 M80 70 V80 H70 M30 80 H20 V70" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400/70" />
      {/* Face Mesh */}
      <path d="M30 50 C30 30 70 30 70 50 C70 75 50 85 50 85 C50 85 30 75 30 50 Z" stroke="currentColor" strokeWidth="1.5" className="text-emerald-500" />
      {/* Eye Data Points */}
      <circle cx="42" cy="45" r="2" fill="currentColor" className="text-cyan-400" />
      <circle cx="58" cy="45" r="2" fill="currentColor" className="text-cyan-400" />
      {/* Scanning Line Animation */}
       <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" className="text-cyan-400/80">
        {/* @ts-ignore */}
        <animate attributeName="y1" values="20;80;20" duration="4s" repeatCount="indefinite" />
        {/* @ts-ignore */}
        <animate attributeName="y2" values="20;80;20" duration="4s" repeatCount="indefinite" />
       </line>
    </g>
  </svg>
);

// --- Data ---
const features = [
  {
    icon: <IconRPPG />,
    title: "rPPG (リモート脈波計測)",
    description: "顔の皮膚の微細な色の変化から、心拍数や自律神経の状態を非接触で測定。映像解析ではなく、生体信号を捉えます。",
    color: "blue",
    delay: 0.1
  },
  {
    icon: <IconVocal />,
    title: "Vocal Biomarker (声のバイオマーカー)",
    description: "声帯の緊張度から脳のストレス状態を解析。言葉の内容ではなく、周波数やリズムのズレを検知します。",
    color: "purple",
    delay: 0.2
  },
  {
    icon: <IconMicroExpression />,
    title: "Micro-Expression (微表情解析)",
    description: "人間が隠しきれない0.2秒の「微表情」をAIが検知。「大丈夫です」という言葉の裏にある、抑圧された感情を読み解きます。",
    color: "emerald",
    delay: 0.3
  }
];

// Color configurations for the cards
const colorStyles = {
  blue: {
    border: "hover:border-blue-500/30",
    glow: "rgba(59, 130, 246, 0.1)",
    line: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10"
  },
  purple: {
    border: "hover:border-purple-500/30",
    glow: "rgba(168, 85, 247, 0.1)",
    line: "from-purple-500 to-fuchsia-400",
    bg: "bg-purple-500/10"
  },
  emerald: {
    border: "hover:border-emerald-500/30",
    glow: "rgba(16, 185, 129, 0.1)",
    line: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/10"
  }
};

export default function TechnologySection() {
  return (
    <section className="relative w-full py-32 bg-[#0B0F19] overflow-hidden">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.08]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-900/10 backdrop-blur-md mb-6">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-mono tracking-wider text-blue-300">The Science Behind the Magic</span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            見えないリスクを、<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              科学的に可視化する。
            </span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            HAISは、カメラとマイクを「医療レベルのセンサー」へと変えます。<br/>
            3つのバイオマーカー解析が、その根拠です。
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
             const style = colorStyles[feature.color as keyof typeof colorStyles];
             return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: feature.delay }}
                className={`group relative p-8 rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-sm ${style.border} transition-all duration-300 overflow-hidden`}
              >
                {/* Internal Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${style.glow}, transparent 70%)` }}
                />

                <div className="relative z-10">
                  {/* Icon Container with Glow */}
                  <div className={`w-20 h-20 mb-8 rounded-2xl p-4 relative overflow-hidden transition-all duration-500 group-hover:scale-105 ${style.bg} border border-white/5`}>
                     <div className="relative z-10 w-full h-full text-white/90 group-hover:text-white transition-colors">
                      {feature.icon}
                     </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 tracking-wide">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>

                {/* Bottom Line */}
                <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${style.line} transition-all duration-500`} />
              </motion.div>
             );
          })}
        </div>
      </div>
    </section>
  );
}