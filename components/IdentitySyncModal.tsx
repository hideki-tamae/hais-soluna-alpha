'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Mic, X, Zap, FileText, Building2, Smartphone, Award, Fingerprint, Scan, Shield, Radio, Activity, Waves } from 'lucide-react';

// ▼▼▼ リンク先定義 ▼▼▼
const CALENDLY_URL = "https://calendly.com/tamatixyan/30min";
const REPORT_FORM_URL = "https://tally.so/r/kdNEd6"; 
const LINE_URL = "https://line.me/R/ti/p/@lqg6247r?ts=07261448&oat_content=url";

// --- Atmospheric Particles ---
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-white/20"
        initial={{
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          scale: Math.random() * 0.5 + 0.5,
        }}
        animate={{
          y: [null, -1000],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: Math.random() * 15 + 15,
          repeat: Infinity,
          delay: Math.random() * 10,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

// --- Neural Network Background ---
const NeuralBackground = ({ active }: { active: boolean }) => {
  const lines = useRef<{ x1: number; y1: number; x2: number; y2: number; delay: number }[]>([]);
  
  useEffect(() => {
    lines.current = [...Array(20)].map(() => ({
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: active ? 0.15 : 0.05 }}>
      <defs>
        <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      {lines.current.map((line, i) => (
        <motion.line
          key={i}
          x1={`${line.x1}%`}
          y1={`${line.y1}%`}
          x2={`${line.x2}%`}
          y2={`${line.y2}%`}
          stroke="url(#neural-gradient)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 2, delay: line.delay, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
};

// --- Premium Holographic Logo ---
const HolographicLogo = ({ className, pulse = false }: { className?: string; pulse?: boolean }) => (
  <div className={`relative ${className}`}>
    {/* Outer glow rings */}
    <motion.div 
      className="absolute inset-0 rounded-full"
      style={{ 
        background: 'conic-gradient(from 0deg, #06b6d4, #8b5cf6, #10b981, #06b6d4)',
        filter: 'blur(20px)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
    
    <svg viewBox="0 0 120 120" className="relative z-10 w-full h-full" fill="none">
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4">
            <animate attributeName="stopColor" values="#06b6d4;#8b5cf6;#10b981;#06b6d4" dur="4s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#8b5cf6">
            <animate attributeName="stopColor" values="#8b5cf6;#10b981;#06b6d4;#8b5cf6" dur="4s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Outer rotating ring */}
      <g className="origin-center" style={{ animation: 'spin 12s linear infinite' }}>
        <circle cx="60" cy="60" r="55" stroke="url(#logo-gradient)" strokeWidth="0.5" strokeDasharray="8 4" fill="none" opacity="0.6" />
      </g>
      
      {/* Middle geometric ring */}
      <g className="origin-center" style={{ animation: 'spin 8s linear infinite reverse' }}>
        <polygon points="60,15 95,40 95,80 60,105 25,80 25,40" stroke="url(#logo-gradient)" strokeWidth="1" fill="none" filter="url(#glow)" />
      </g>
      
      {/* Inner diamond */}
      <motion.g
        animate={pulse ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: '60px 60px' }}
      >
        <polygon points="60,30 85,60 60,90 35,60" stroke="url(#logo-gradient)" strokeWidth="1.5" fill="url(#logo-gradient)" fillOpacity="0.15" filter="url(#glow)" />
      </motion.g>
      
      {/* Core circle with pulsing */}
      <motion.circle
        cx="60" cy="60" r="12"
        stroke="url(#logo-gradient)"
        strokeWidth="2"
        fill="none"
        animate={{ r: pulse ? [12, 14, 12] : 12 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Center dot */}
      <circle cx="60" cy="60" r="4" fill="url(#logo-gradient)" filter="url(#glow)" />
      
      {/* Cardinal markers */}
      {[0, 90, 180, 270].map((angle, i) => (
        <motion.line
          key={i}
          x1="60"
          y1={angle === 0 || angle === 180 ? (angle === 0 ? 5 : 115) : 60}
          x2="60"
          y2={angle === 0 || angle === 180 ? (angle === 0 ? 15 : 105) : 60}
          transform={angle === 90 || angle === 270 ? `rotate(${angle} 60 60)` : undefined}
          stroke="url(#logo-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  </div>
);

// --- Biometric Scanner Frame ---
const ScannerFrame = ({ progress, children }: { progress: number; children: React.ReactNode }) => (
  <div className="relative">
    {/* Corner brackets */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
      <defs>
        <linearGradient id="bracket-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      {/* Top-left */}
      <motion.path d="M10,50 L10,10 L50,10" stroke="url(#bracket-gradient)" strokeWidth="3" fill="none" strokeLinecap="round" 
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }} />
      {/* Top-right */}
      <motion.path d="M250,10 L290,10 L290,50" stroke="url(#bracket-gradient)" strokeWidth="3" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.1 }} />
      {/* Bottom-right */}
      <motion.path d="M290,250 L290,290 L250,290" stroke="url(#bracket-gradient)" strokeWidth="3" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} />
      {/* Bottom-left */}
      <motion.path d="M50,290 L10,290 L10,250" stroke="url(#bracket-gradient)" strokeWidth="3" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.3 }} />
    </svg>
    
    {/* Progress ring */}
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
      <circle cx="150" cy="150" r="140" stroke="#1e293b" strokeWidth="2" fill="none" />
      <motion.circle 
        cx="150" cy="150" r="140" 
        stroke="url(#bracket-gradient)" 
        strokeWidth="2" 
        fill="none"
        strokeLinecap="round"
        strokeDasharray={2 * Math.PI * 140}
        strokeDashoffset={2 * Math.PI * 140 * (1 - progress / 100)}
        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
      />
    </svg>
    
    {children}
  </div>
);

// --- Voice Waveform Visualizer ---
const VoiceWaveform = ({ active }: { active: boolean }) => {
  const bars = 32;
  return (
    <div className="flex items-center justify-center gap-[2px] h-16">
      {[...Array(bars)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{
            background: `linear-gradient(to top, #06b6d4, #8b5cf6)`,
          }}
          animate={active ? {
            height: [8, Math.random() * 48 + 16, 8],
          } : { height: 8 }}
          transition={{
            duration: 0.3,
            repeat: active ? Infinity : 0,
            delay: i * 0.02,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- Glowing Button Component ---
const GlowButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '',
}: { 
  children: React.ReactNode; 
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'primary' | 'secondary' | 'purple' | 'cyan' | 'emerald';
  className?: string;
}) => {
  const gradients = {
    primary: 'from-cyan-500 via-violet-500 to-emerald-500',
    secondary: 'from-slate-600 to-slate-700',
    purple: 'from-purple-600 via-violet-600 to-indigo-600',
    cyan: 'from-cyan-500 via-teal-500 to-cyan-600',
    emerald: 'from-emerald-500 via-green-500 to-teal-500',
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative group overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Animated border gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradients[variant]} opacity-80`}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: '200% 200%' }}
      />
      
      {/* Inner content */}
      <div className="absolute inset-[1px] bg-[#0a0a0f] rounded-[inherit] flex items-center justify-center">
        <span className="relative z-10">{children}</span>
      </div>
      
      {/* Hover glow effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradients[variant]} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
      />
    </motion.button>
  );
};

// --- Premium Card Component ---
const PremiumCard = ({ 
  children, 
  onClick,
  accentColor,
  glowIntensity = 'medium',
}: { 
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  accentColor: 'purple' | 'cyan' | 'emerald';
  glowIntensity?: 'low' | 'medium' | 'high';
}) => {
  const colors = {
    purple: { border: 'border-purple-500/30', glow: 'rgba(168, 85, 247, 0.2)', hover: 'hover:border-purple-400/60' },
    cyan: { border: 'border-cyan-500/30', glow: 'rgba(6, 182, 212, 0.2)', hover: 'hover:border-cyan-400/60' },
    emerald: { border: 'border-emerald-500/30', glow: 'rgba(16, 185, 129, 0.2)', hover: 'hover:border-emerald-400/60' },
  };
  
  const intensityMap = { low: 15, medium: 25, high: 40 };

  return (
    <motion.div
      onClick={onClick}
      className={`relative group cursor-pointer rounded-2xl ${colors[accentColor].border} ${colors[accentColor].hover} border backdrop-blur-xl transition-all duration-500`}
      style={{
        background: 'linear-gradient(135deg, rgba(15, 15, 25, 0.9) 0%, rgba(10, 10, 20, 0.95) 100%)',
        boxShadow: `0 0 ${intensityMap[glowIntensity]}px ${colors[accentColor].glow}`,
      }}
      whileHover={{ 
        y: -4,
        boxShadow: `0 0 ${intensityMap[glowIntensity] + 20}px ${colors[accentColor].glow}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Holographic shimmer overlay */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
          }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />
      </div>
      
      {children}
    </motion.div>
  );
};

// --- リンク強制発火関数 ---
const forceOpen = (url: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  if (typeof window !== 'undefined') window.open(url, '_blank', 'noopener,noreferrer');
};

export default function IdentitySyncModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'intro' | 'face-scan' | 'voice-record' | 'analyzing' | 'result'>('intro');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9).toUpperCase());

  // カメラ起動
  const startCamera = async () => {
    setStep('face-scan');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1.2;
        setScanProgress(Math.floor(progress));
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep('voice-record'), 800);
        }
      }, 50);
    } catch (err) {
      console.error(err);
      alert("カメラを許可してください");
      setStep('intro');
    }
  };

  const handleVoiceComplete = () => {
    setIsRecording(false);
    setStep('analyzing');
    setTimeout(() => setStep('result'), 3000);
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(handleVoiceComplete, 2500);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden" style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif" }}>
      {/* Multi-layer background */}
      <div className="absolute inset-0 bg-[#030308]" />
      <div className="absolute inset-0" style={{ 
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 40%), radial-gradient(ellipse 50% 30% at 20% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 40%)'
      }} />
      
      {/* Animated mesh gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Neural network background */}
      <NeuralBackground active={step === 'analyzing'} />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
      }} />

      {/* 閉じるボタン */}
      <motion.button 
        onClick={onClose} 
        className="absolute top-6 right-6 p-3 rounded-full z-50 border border-white/10 bg-white/5 backdrop-blur-md"
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
        whileTap={{ scale: 0.95 }}
      >
        <X className="w-5 h-5 text-white/70" />
      </motion.button>

      {/* 背景ビデオ (スキャン中のみ) */}
      <AnimatePresence>
        {(step === 'face-scan' || step === 'voice-record') && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <video ref={videoRef} muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" style={{ filter: 'grayscale(1) contrast(1.1) brightness(0.8)' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-[#030308]" />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 w-full max-w-5xl px-6 h-full flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">

          {/* STEP 0: INTRO */}
          {step === 'intro' && (
            <motion.div 
              key="intro" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-md"
            >
              {/* Logo */}
              <motion.div 
                className="w-36 h-36 mx-auto mb-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <HolographicLogo className="w-full h-full" pulse />
              </motion.div>
              
              {/* Status indicator */}
              <motion.div 
                className="flex items-center justify-center gap-3 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <span className="text-[11px] font-medium tracking-[0.25em] text-emerald-400/80 uppercase">HAIS Live Diagnostic</span>
              </motion.div>
              
              {/* Title */}
              <motion.h1 
                className="text-5xl font-light mb-4 tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Identity Sync
              </motion.h1>
              
              <motion.p 
                className="text-white/40 text-sm mb-12 leading-relaxed font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                生体認証技術であなたの<br />
                <span className="text-white/60">Integrity（一貫性）</span>を解析します
              </motion.p>
              
              {/* Edge Computing Assurance */}
              <motion.div 
                className="relative mb-10 p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-amber-400/80" />
                  <span className="text-[10px] font-medium tracking-[0.2em] text-amber-400/80 uppercase">Edge Computing Ready</span>
                </div>
                <p className="text-white/30 text-xs font-light">
                  解析は全てこのデバイス内で完結します
                </p>
                
                {/* Subtle animated border */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1), transparent)',
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>

              {/* Start Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <GlowButton 
                  onClick={startCamera}
                  variant="primary"
                  className="w-full py-5 rounded-xl text-sm font-medium tracking-[0.15em] text-white uppercase"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Scan className="w-4 h-4" />
                    Start Biometric Scan
                  </span>
                </GlowButton>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 1: FACE SCANNING */}
          {step === 'face-scan' && (
            <motion.div 
              key="scan" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <ScannerFrame progress={scanProgress}>
                <div className="w-72 h-72 relative mx-auto rounded-full overflow-hidden">
                  {/* Scanning line */}
                  <motion.div 
                    className="absolute left-0 right-0 h-[2px] z-10"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #06b6d4, #8b5cf6, #06b6d4, transparent)',
                      boxShadow: '0 0 20px #06b6d4, 0 0 40px #8b5cf6',
                    }}
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Center reticle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-24 h-24 border border-cyan-400/50 rounded-full"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="absolute w-4 h-4 border-t-2 border-l-2 border-cyan-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-8 -ml-8" />
                    <div className="absolute w-4 h-4 border-t-2 border-r-2 border-cyan-400 top-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 -mt-8 mr-8" style={{ transform: 'translateX(50%) translateY(-50%)' }} />
                  </div>
                </div>
              </ScannerFrame>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <p className="text-cyan-400/80 font-light text-xs tracking-[0.2em] uppercase">Analyzing Geometry</p>
                </div>
                <p className="text-6xl font-extralight text-white tracking-tight">
                  {scanProgress}<span className="text-2xl text-white/40">%</span>
                </p>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 2: VOICE RECORD */}
          {step === 'voice-record' && (
            <motion.div 
              key="voice" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-md"
            >
              <motion.div 
                className="flex items-center justify-center gap-2 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Radio className="w-4 h-4 text-violet-400" />
                <span className="text-[11px] font-medium tracking-[0.2em] text-violet-400/80 uppercase">Voice Commitment</span>
              </motion.div>
              
              {/* Prompt card */}
              <motion.div 
                className="relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-10"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mb-4 font-medium">Please Say</p>
                <p className="text-3xl font-light text-white tracking-tight italic">
                  "I commit to Re-Verse."
                </p>
                
                {/* Waveform */}
                <div className="mt-8">
                  <VoiceWaveform active={isRecording} />
                </div>
              </motion.div>
              
              {/* Record button */}
              <motion.button 
                onClick={startRecording}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${isRecording ? 'scale-110' : ''}`}
                whileHover={{ scale: isRecording ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-500/30"
                  animate={isRecording ? { scale: [1, 1.5], opacity: [0.5, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-500/30"
                  animate={isRecording ? { scale: [1, 1.3], opacity: [0.5, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
                
                {/* Button background */}
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${isRecording ? 'bg-red-500' : 'bg-red-500/80'}`} style={{ boxShadow: isRecording ? '0 0 40px rgba(239, 68, 68, 0.6)' : '0 0 20px rgba(239, 68, 68, 0.3)' }} />
                
                <Mic className="w-8 h-8 text-white relative z-10" />
              </motion.button>
              
              <p className="mt-6 text-[10px] text-white/30 tracking-[0.2em] uppercase font-medium">
                {isRecording ? 'Recording...' : 'Tap to Record'}
              </p>
            </motion.div>
          )}

          {/* STEP 3: ANALYZING */}
          {step === 'analyzing' && (
            <motion.div 
              key="analyzing" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Complex loading animation */}
              <div className="relative w-32 h-32 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full border border-cyan-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-violet-500/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-t-2 border-r-2 border-emerald-400"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Fingerprint className="w-12 h-12 text-white/50" />
                </div>
              </div>
              
              <motion.p
                className="text-sm font-light tracking-[0.2em] uppercase"
                style={{
                  background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #10b981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Processing Biometric Data...
              </motion.p>
              
              {/* Processing steps */}
              <motion.div 
                className="mt-8 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {['Facial geometry verified', 'Voice pattern analyzed', 'Integrity score calculating'].map((text, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-center gap-2 text-xs text-white/40"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.4 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.4 }}
                    />
                    {text}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* STEP 4: RESULT */}
          {step === 'result' && (
            <motion.div 
              key="result" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-5xl"
            >
              {/* Ambient glow - cyan/emerald blend */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none" style={{
                background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, rgba(16, 185, 129, 0.08) 40%, transparent 70%)',
                filter: 'blur(80px)',
              }} />
              
              <div className="relative z-10">
                {/* Header */}
                <motion.div 
                  className="flex items-center gap-3 mb-12 pb-4 border-b border-white/[0.06]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  </div>
                  <span className="text-[10px] font-medium text-white/40 tracking-[0.2em] uppercase">HAIS V3.0 • Diagnostic Complete</span>
                </motion.div>

                {/* Main Result - SYNCED. */}
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {/* Checkmark animation */}
                  <motion.div
                    className="w-20 h-20 mx-auto mb-8 relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <svg viewBox="0 0 80 80" className="w-full h-full">
                      <defs>
                        <linearGradient id="check-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                      <circle cx="40" cy="40" r="38" stroke="url(#check-gradient)" strokeWidth="2" fill="none" opacity="0.3" />
                      <motion.circle 
                        cx="40" cy="40" r="38" 
                        stroke="url(#check-gradient)" 
                        strokeWidth="2" 
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                      />
                      <motion.path
                        d="M24 42 L35 53 L56 28"
                        stroke="url(#check-gradient)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
                      />
                    </svg>
                  </motion.div>
                  
                  {/* SYNCED. - Main headline */}
                  <motion.h2 
                    className="text-7xl md:text-8xl font-bold tracking-tight mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #06b6d4 50%, #10b981 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.3))',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    SYNCED.
                  </motion.h2>
                  
                  {/* Japanese subtitle */}
                  <motion.p 
                    className="text-white/50 text-base font-light tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    あなたの一貫性は、証明されました。
                  </motion.p>
                </motion.div>

                {/* Section Title */}
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <h3 className="text-sm font-medium text-white/70 tracking-[0.15em] uppercase mb-1">Next Step</h3>
                  <p className="text-white/30 text-xs font-light">この診断結果を、どう活かしますか？</p>
                </motion.div>

                {/* 3 Cards - Get Report / Stay Connected / Enterprise */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  
                  {/* 1. Get Report - Mail/Document Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <PremiumCard onClick={forceOpen(REPORT_FORM_URL)} accentColor="cyan" glowIntensity="high">
                      <div className="p-6 h-full flex flex-col">
                        {/* Custom Report/Mail Icon */}
                        <div className="mb-5 p-3 w-fit rounded-xl bg-gradient-to-br from-cyan-900/40 to-teal-900/40 border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors">
                          <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
                            <defs>
                              <linearGradient id="report-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#67e8f9" />
                                <stop offset="100%" stopColor="#06b6d4" />
                              </linearGradient>
                            </defs>
                            {/* Document base */}
                            <rect x="5" y="3" width="18" height="22" rx="2" stroke="url(#report-grad)" strokeWidth="1.5" fill="url(#report-grad)" fillOpacity="0.1" />
                            {/* Lines representing data */}
                            <path d="M9 9H19M9 13H16M9 17H19M9 21H13" stroke="url(#report-grad)" strokeWidth="1.5" strokeLinecap="round" />
                            {/* Heartbeat mini wave */}
                            <path d="M15 17L16 15L17.5 19L19 17" stroke="url(#report-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        
                        <h3 className="text-lg font-medium text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          Get Report
                        </h3>
                        
                        <p className="text-xs text-white/40 leading-relaxed mb-6 flex-grow">
                          あなたの自律神経・ストレス反応の詳細データを<span className="text-cyan-300/70">メール</span>でお届けします。
                        </p>
                        
                        <GlowButton 
                          variant="cyan"
                          className="w-full py-3.5 rounded-lg text-xs font-medium tracking-[0.1em] text-cyan-200 uppercase"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Waves className="w-3.5 h-3.5" />
                            レポートを受け取る
                          </span>
                        </GlowButton>
                      </div>
                    </PremiumCard>
                  </motion.div>

                  {/* 2. Stay Connected - LINE/Connection Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                  >
                    <PremiumCard onClick={forceOpen(LINE_URL)} accentColor="purple" glowIntensity="medium">
                      <div className="p-6 h-full flex flex-col">
                        {/* Custom Connection/Notification Icon */}
                        <div className="mb-5 p-3 w-fit rounded-xl bg-gradient-to-br from-purple-900/40 to-violet-900/40 border border-purple-500/20 group-hover:border-purple-400/40 transition-colors">
                          <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
                            <defs>
                              <linearGradient id="connect-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#c4b5fd" />
                                <stop offset="100%" stopColor="#a78bfa" />
                              </linearGradient>
                            </defs>
                            {/* Bell/Notification shape */}
                            <path d="M14 4C10 4 7 7 7 11V16L5 19H23L21 16V11C21 7 18 4 14 4Z" stroke="url(#connect-grad)" strokeWidth="1.5" fill="url(#connect-grad)" fillOpacity="0.15" />
                            {/* Bell bottom */}
                            <path d="M11 19V20C11 21.7 12.3 23 14 23C15.7 23 17 21.7 17 20V19" stroke="url(#connect-grad)" strokeWidth="1.5" strokeLinecap="round" />
                            {/* Signal waves */}
                            <path d="M20 8C21.5 9.5 22 11 22 13" stroke="url(#connect-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                            <path d="M8 8C6.5 9.5 6 11 6 13" stroke="url(#connect-grad)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                            {/* Dot notification */}
                            <circle cx="19" cy="7" r="3" fill="url(#connect-grad)" />
                          </svg>
                        </div>
                        
                        <h3 className="text-lg font-medium text-white mb-2 group-hover:text-purple-300 transition-colors">
                          Stay Connected
                        </h3>
                        
                        <p className="text-xs text-white/40 leading-relaxed mb-6 flex-grow">
                          HAISの最新情報、導入事例、限定コンテンツを<span className="text-purple-300/70">LINE</span>でお届け。
                        </p>
                        
                        <GlowButton 
                          variant="purple"
                          className="w-full py-3.5 rounded-lg text-xs font-medium tracking-[0.1em] text-purple-200 uppercase"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Smartphone className="w-3.5 h-3.5" />
                            LINEで登録する
                          </span>
                        </GlowButton>
                      </div>
                    </PremiumCard>
                  </motion.div>

                  {/* 3. For Enterprise - Network Nodes Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <PremiumCard onClick={forceOpen(CALENDLY_URL)} accentColor="emerald" glowIntensity="medium">
                      <div className="p-6 h-full flex flex-col relative">
                        {/* Enterprise badge */}
                        <div className="absolute top-4 right-4 bg-emerald-900/50 text-emerald-300/80 text-[9px] px-2.5 py-1 rounded-md border border-emerald-500/30 font-medium tracking-wider uppercase">
                          無料相談
                        </div>
                        
                        {/* Custom Network/Organization Icon */}
                        <div className="mb-5 p-3 w-fit rounded-xl bg-gradient-to-br from-emerald-900/40 to-green-900/40 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-colors">
                          <svg viewBox="0 0 28 28" className="w-7 h-7" fill="none">
                            <defs>
                              <linearGradient id="enterprise-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6ee7b7" />
                                <stop offset="100%" stopColor="#10b981" />
                              </linearGradient>
                            </defs>
                            {/* Building/Organization */}
                            <rect x="8" y="10" width="12" height="14" rx="1" stroke="url(#enterprise-grad)" strokeWidth="1.5" fill="url(#enterprise-grad)" fillOpacity="0.1" />
                            {/* Roof/Top */}
                            <path d="M6 10L14 4L22 10" stroke="url(#enterprise-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            {/* Windows */}
                            <rect x="11" y="13" width="2" height="2" fill="url(#enterprise-grad)" />
                            <rect x="15" y="13" width="2" height="2" fill="url(#enterprise-grad)" />
                            <rect x="11" y="18" width="2" height="2" fill="url(#enterprise-grad)" />
                            <rect x="15" y="18" width="2" height="2" fill="url(#enterprise-grad)" />
                            {/* Connection dots outside */}
                            <circle cx="4" cy="14" r="1.5" fill="url(#enterprise-grad)" opacity="0.6" />
                            <circle cx="24" cy="14" r="1.5" fill="url(#enterprise-grad)" opacity="0.6" />
                            <path d="M5.5 14H8M20 14H22.5" stroke="url(#enterprise-grad)" strokeWidth="1" strokeDasharray="2 1" opacity="0.4" />
                          </svg>
                        </div>
                        
                        <h3 className="text-lg font-medium text-white mb-2 group-hover:text-emerald-300 transition-colors">
                          Enterprise Plan
                        </h3>
                        
                        <p className="text-xs text-white/40 leading-relaxed mb-6 flex-grow">
                          組織の「見えない負債」を可視化する。まずは<span className="text-emerald-300/70">30分の無料相談</span>から。
                        </p>
                        
                        <GlowButton 
                          variant="emerald"
                          className="w-full py-3.5 rounded-lg text-xs font-medium tracking-[0.1em] text-emerald-200 uppercase"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Zap className="w-3.5 h-3.5" />
                            導入相談を予約
                          </span>
                        </GlowButton>
                      </div>
                    </PremiumCard>
                  </motion.div>

                </div>

                {/* Trust badges - matching top page */}
                <motion.div 
                  className="mt-10 flex items-center justify-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <div className="flex items-center gap-2 text-white/30">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="text-[10px] tracking-wider">No Raw Data Storage</span>
                  </div>
                  <div className="w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-2 text-white/30">
                    <Fingerprint className="w-3.5 h-3.5" />
                    <span className="text-[10px] tracking-wider">Edge Computing</span>
                  </div>
                </motion.div>
              </div>

              {/* Close button */}
              <motion.div 
                className="mt-10 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <button 
                  onClick={onClose} 
                  className="text-[10px] text-white/25 hover:text-white/50 transition-colors tracking-[0.2em] uppercase font-medium"
                >
                  閉じる
                </button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
