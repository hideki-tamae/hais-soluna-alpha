"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InsuranceHero from '@/components/InsuranceHero';
import TechnologySection from '@/components/TechnologySection';
import TrustSection from '@/components/TrustSection';
import IdentitySyncModal from '@/components/IdentitySyncModal';
import HaisFooter from '@/components/HaisFooter'; // 🚨 専用フッターをインポート
import { Zap, ArrowRight } from 'lucide-react';

// --- Custom SVG Icons ---
const Icon30Seconds = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
    <defs>
      <linearGradient id="icon-30s-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#67e8f9" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="26" r="18" stroke="url(#icon-30s-grad)" strokeWidth="1.5" fill="none" />
    <circle cx="24" cy="26" r="12" stroke="url(#icon-30s-grad)" strokeWidth="1" fill="url(#icon-30s-grad)" fillOpacity="0.1" />
    <path d="M24 26V14" stroke="url(#icon-30s-grad)" strokeWidth="2" strokeLinecap="round" />
    <path d="M24 26L32 32" stroke="url(#icon-30s-grad)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    <rect x="22" y="4" width="4" height="6" rx="1" fill="url(#icon-30s-grad)" />
    <rect x="38" y="18" width="6" height="3" rx="1" fill="url(#icon-30s-grad)" opacity="0.7" />
  </svg>
);

const IconTheNumber = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
    <defs>
      <linearGradient id="icon-num-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c4b5fd" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
    <rect x="8" y="4" width="24" height="32" rx="2" stroke="url(#icon-num-grad)" strokeWidth="1.5" fill="url(#icon-num-grad)" fillOpacity="0.05" />
    <text x="20" y="26" fontSize="16" fontWeight="bold" fill="url(#icon-num-grad)" textAnchor="middle" fontFamily="system-ui">¥</text>
    <rect x="24" y="20" width="18" height="24" rx="2" stroke="url(#icon-num-grad)" strokeWidth="1.5" fill="url(#icon-num-grad)" fillOpacity="0.1" />
    <path d="M28 28H38M28 32H38M28 36H38" stroke="url(#icon-num-grad)" strokeWidth="1" opacity="0.5" />
    <circle cx="38" cy="12" r="6" stroke="url(#icon-num-grad)" strokeWidth="1.5" fill="none" />
    <path d="M42 16L46 20" stroke="url(#icon-num-grad)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconProof = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
    <defs>
      <linearGradient id="icon-proof-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6ee7b7" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <rect x="4" y="8" width="40" height="32" rx="2" stroke="url(#icon-proof-grad)" strokeWidth="1.5" fill="url(#icon-proof-grad)" fillOpacity="0.05" />
    <path d="M8 32L16 26L24 28L32 18L40 12" stroke="url(#icon-proof-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="26" r="2" fill="url(#icon-proof-grad)" />
    <circle cx="24" cy="28" r="2" fill="url(#icon-proof-grad)" />
    <circle cx="32" cy="18" r="2" fill="url(#icon-proof-grad)" />
    <circle cx="40" cy="12" r="3" fill="url(#icon-proof-grad)" />
    <circle cx="38" cy="34" r="6" fill="url(#icon-proof-grad)" fillOpacity="0.2" stroke="url(#icon-proof-grad)" strokeWidth="1" />
    <path d="M35 34L37 36L41 32" stroke="url(#icon-proof-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconInfrastructure = () => (
  <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
    <defs>
      <linearGradient id="icon-infra-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="8" stroke="url(#icon-infra-grad)" strokeWidth="1.5" fill="url(#icon-infra-grad)" fillOpacity="0.15" />
    <circle cx="24" cy="24" r="3" fill="url(#icon-infra-grad)" />
    <path d="M24 16V8" stroke="url(#icon-infra-grad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M24 32V40" stroke="url(#icon-infra-grad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 24H8" stroke="url(#icon-infra-grad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M32 24H40" stroke="url(#icon-infra-grad)" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 18L12 12" stroke="url(#icon-infra-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M30 18L36 12" stroke="url(#icon-infra-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M18 30L12 36" stroke="url(#icon-infra-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M30 30L36 36" stroke="url(#icon-infra-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <circle cx="8" cy="8" r="3" fill="url(#icon-infra-grad)" fillOpacity="0.3" stroke="url(#icon-infra-grad)" strokeWidth="1" />
    <circle cx="40" cy="8" r="3" fill="url(#icon-infra-grad)" fillOpacity="0.3" stroke="url(#icon-infra-grad)" strokeWidth="1" />
    <circle cx="8" cy="40" r="3" fill="url(#icon-infra-grad)" fillOpacity="0.3" stroke="url(#icon-infra-grad)" strokeWidth="1" />
    <circle cx="40" cy="40" r="3" fill="url(#icon-infra-grad)" fillOpacity="0.3" stroke="url(#icon-infra-grad)" strokeWidth="1" />
    <circle cx="24" cy="4" r="2" fill="url(#icon-infra-grad)" />
    <circle cx="24" cy="44" r="2" fill="url(#icon-infra-grad)" />
    <circle cx="4" cy="24" r="2" fill="url(#icon-infra-grad)" />
    <circle cx="44" cy="24" r="2" fill="url(#icon-infra-grad)" />
  </svg>
);

// --- Timeline Step Component ---
const TimelineStep = ({ 
  step, 
  number, 
  title, 
  subtitle, 
  description, 
  icon, 
  accentColor,
  isLast = false 
}: { 
  step: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  isLast?: boolean;
}) => {
  return (
    <motion.div 
      className="relative flex gap-8 md:gap-12"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center border backdrop-blur-sm"
          style={{ 
            background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}05 100%)`,
            borderColor: `${accentColor}30`,
          }}
          whileHover={{ 
            scale: 1.1,
            borderColor: `${accentColor}60`,
            boxShadow: `0 0 30px ${accentColor}30`,
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        
        {!isLast && (
          <div 
            className="w-px flex-1 min-h-[80px] mt-4"
            style={{ 
              background: `linear-gradient(180deg, ${accentColor}40 0%, ${accentColor}10 100%)`,
            }}
          />
        )}
      </div>

      <div className="flex-1 pb-16">
        <div className="flex items-center gap-3 mb-3">
          <span 
            className="text-xs font-mono tracking-widest"
            style={{ color: accentColor }}
          >
            {step}
          </span>
          <span className="text-3xl md:text-4xl font-bold text-white/10">{number}</span>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-light text-white mb-2">
          {title}
        </h3>
        
        <p 
          className="text-sm md:text-base font-medium mb-4"
          style={{ color: accentColor }}
        >
          {subtitle}
        </p>
        
        <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-lg">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// --- RoadmapSection Component ---
const RoadmapSection = () => {
  const steps = [
    {
      step: "STEP 01",
      number: "30\"",
      title: "30 Seconds",
      subtitle: "組織の「見えない温度」を測る",
      description: "ブラウザだけで完結する30秒のスキャン。インストール不要。カメラと声だけで、あなた自身の「今」を可視化します。",
      icon: <Icon30Seconds />,
      accentColor: "#06b6d4",
    },
    {
      step: "STEP 02",
      number: "¥",
      title: "The Number",
      subtitle: "「未認識債務」を金額で知る",
      description: "組織に眠る見えないコストを算出。離職リスク、生産性低下、機会損失——すべてを数字で突きつけます。",
      icon: <IconTheNumber />,
      accentColor: "#a78bfa",
    },
    {
      step: "STEP 03",
      number: "14",
      title: "Proof",
      subtitle: "2週間で、数字が証明する",
      description: "特定部署での限定トライアル。「大丈夫です」の裏にある真実を、生体データが静かに語り始めます。",
      icon: <IconProof />,
      accentColor: "#10b981",
    },
    {
      step: "STEP 04",
      number: "∞",
      title: "Infrastructure",
      subtitle: "「知らなかった」をゼロにするOS",
      description: "組織全体への展開。Slack、勤怠、人事システムと連携し、24時間365日、静かに組織を守り続けます。",
      icon: <IconInfrastructure />,
      accentColor: "#f59e0b",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/50 to-slate-950/0" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-cyan-400/80 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The Process
          </motion.p>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
            見えない真実が、
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
            <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              見える過程。
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {steps.map((item, i) => (
            <TimelineStep
              key={i}
              {...item}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="https://calendly.com/tamatixyan/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-medium relative overflow-hidden group"
            style={{ 
              background: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
              boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 50px rgba(6, 182, 212, 0.5)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10">組織の温度を測る</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          <p className="mt-6 text-white/30 text-sm">
            30分の無料相談で、御社の「見えないコスト」を可視化します
          </p>

          <p className="mt-8 text-xs text-slate-600">
            すでにご検討中の方は{' '}
            <a 
              href="/hais/pricing" 
              className="text-slate-500 hover:text-cyan-400 underline underline-offset-2 transition-colors"
            >
              Enterprise Plans（要認証）
            </a>
            {' '}もご覧いただけます
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// --- Main Page Component ---
export default function HaisPage() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <main className="min-h-screen bg-[#0B0F19] relative flex flex-col">
      <div className="flex-grow">
        {/* 既存のLPコンテンツ */}
        <InsuranceHero />
        <TechnologySection />
        <TrustSection />

        {/* ロードマップセクション */}
        <RoadmapSection />
      </div>

      {/* 🚨 専用フッター：最下部に配置 */}
      <HaisFooter />

      {/* 右下のフローティングボタン */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setShowDemo(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all hover:scale-105 animate-bounce"
        >
          <Zap className="w-5 h-5 fill-current" />
          30秒デモを試す
        </button>
      </div>

      {/* スキャナーモーダル */}
      {showDemo && (
        <IdentitySyncModal onClose={() => setShowDemo(false)} />
      )}
    </main>
  );
}