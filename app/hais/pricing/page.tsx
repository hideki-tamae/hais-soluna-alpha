  'use client';

  import React, { useState, useEffect, useRef } from 'react';
  import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
  import { Lock, Eye, EyeOff, Check, ArrowRight, Shield, Zap, ChevronRight, Fingerprint } from 'lucide-react';

  // ▼▼▼ 設定 ▼▼▼
  const SECRET_PHRASE = "reverse2026";
  const CALENDLY_URL = "https://calendly.com/tamatixyan/30min";

  // --- Animated Counter with Glow ---
  const AnimatedCounter = ({ 
    end, 
    duration = 2, 
    prefix = '', 
    suffix = '',
    className = '',
    glowColor = 'rgba(251, 191, 36, 0.5)'
  }: { 
    end: number; 
    duration?: number; 
    prefix?: string; 
    suffix?: string;
    className?: string;
    glowColor?: string;
  }) => {
    const [count, setCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
      if (!isInView) return;
      
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsComplete(true);
        }
      };
      requestAnimationFrame(animate);
    }, [isInView, end, duration]);

    return (
      <motion.span 
        ref={ref} 
        className={className}
        animate={isComplete ? { 
          textShadow: [`0 0 20px ${glowColor}`, `0 0 40px ${glowColor}`, `0 0 20px ${glowColor}`]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </motion.span>
    );
  };

  // --- Neural Background (Enhanced) ---
  const NeuralBackground = () => {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Multi-layer gradient */}
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(6, 182, 212, 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 40%), radial-gradient(ellipse 50% 30% at 20% 80%, rgba(16, 185, 129, 0.06) 0%, transparent 40%)'
        }} />
        
        {/* Animated mesh gradient */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles - more varied */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              background: i % 3 === 0 ? 'rgba(6, 182, 212, 0.4)' : i % 3 === 1 ? 'rgba(139, 92, 246, 0.4)' : 'rgba(16, 185, 129, 0.4)',
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
            }}
            animate={{
              y: -100,
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

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        }} />
      </div>
    );
  };

  // --- Pulsing Glow Effect ---
  const PulsingGlow = ({ color, size = 400, className = '' }: { color: string; size?: number; className?: string }) => (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  );

  // --- Reveal Animation Wrapper ---
  const RevealSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );

  // --- Password Gate Component (Enhanced) ---
  const PasswordGate = ({ onSuccess }: { onSuccess: () => void }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [isUnlocking, setIsUnlocking] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password === SECRET_PHRASE) {
        setIsUnlocking(true);
        // Dramatic unlock animation
        setTimeout(() => onSuccess(), 1500);
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setTimeout(() => setError(false), 3000);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#030308]">
        <NeuralBackground />
        
        <AnimatePresence>
          {isUnlocking ? (
            // Unlocking animation
            <motion.div
              key="unlocking"
              className="relative z-10 flex flex-col items-center"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="w-32 h-32 rounded-full flex items-center justify-center relative"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                  border: '2px solid rgba(6, 182, 212, 0.5)',
                }}
                animate={{ 
                  scale: [1, 1.5, 0],
                  borderColor: ['rgba(6, 182, 212, 0.5)', 'rgba(16, 185, 129, 0.8)', 'rgba(16, 185, 129, 0)'],
                }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Lock className="w-12 h-12 text-cyan-400" />
                </motion.div>
              </motion.div>
              <motion.p
                className="mt-6 text-white/60 text-sm tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Authenticating...
              </motion.p>
            </motion.div>
          ) : (
            // Login form
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`relative z-10 w-full max-w-md ${shake ? 'animate-shake' : ''}`}
            >
              {/* Lock Icon with glow */}
              <motion.div 
                className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)' }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Lock className="w-10 h-10 text-white/70 relative z-10" />
              </motion.div>

              <h1 className="text-3xl font-light text-center text-white mb-2 tracking-wide">
                Authorized Access Only
              </h1>
              <p className="text-white/40 text-sm text-center mb-10">
                このページは関係者専用です
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="合言葉を入力"
                    className={`w-full px-6 py-5 bg-white/5 border rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-all ${error ? 'border-red-500/50' : 'border-white/10'}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm text-center"
                  >
                    合言葉が違います
                  </motion.p>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-5 rounded-2xl font-medium text-white relative overflow-hidden group"
                  style={{ 
                    background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)',
                  }}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(6, 182, 212, 0.5)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                    Enter
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </form>

              <p className="text-white/20 text-xs text-center mt-10">
                HAIS Enterprise Solution
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
          }
          .animate-shake { animation: shake 0.5s ease-in-out; }
        `}</style>
      </div>
    );
  };

  // --- Premium Plan Card (Enhanced) ---
  const PlanCard = ({ 
    name, 
    subtitle,
    price, 
    priceNote,
    features, 
    accentColor,
    recommended = false,
    enterprise = false,
    delay = 0,
  }: { 
    name: string;
    subtitle: string;
    price: string;
    priceNote?: string;
    features: string[];
    accentColor: 'cyan' | 'purple' | 'emerald';
    recommended?: boolean;
    enterprise?: boolean;
    delay?: number;
  }) => {
    const colors = {
      cyan: { 
        border: 'border-cyan-500/30', 
        glow: 'rgba(6, 182, 212, 0.2)',
        text: 'text-cyan-400',
        gradient: 'from-cyan-500 to-teal-500',
        hoverBorder: 'hover:border-cyan-400/60',
      },
      purple: { 
        border: 'border-purple-500/40', 
        glow: 'rgba(139, 92, 246, 0.25)',
        text: 'text-purple-400',
        gradient: 'from-purple-500 to-violet-500',
        hoverBorder: 'hover:border-purple-400/60',
      },
      emerald: { 
        border: 'border-emerald-500/30', 
        glow: 'rgba(16, 185, 129, 0.2)',
        text: 'text-emerald-400',
        gradient: 'from-emerald-500 to-green-500',
        hoverBorder: 'hover:border-emerald-400/60',
      },
    };

    const isHighlighted = recommended;

    return (
      <motion.div
        className={`relative rounded-3xl border ${colors[accentColor].border} ${colors[accentColor].hoverBorder} backdrop-blur-xl transition-all duration-500 h-full flex flex-col ${isHighlighted ? 'md:-mt-6 md:mb-6 md:scale-[1.02]' : ''}`}
        style={{
          background: isHighlighted 
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(15, 15, 25, 0.95) 50%, rgba(139, 92, 246, 0.06) 100%)'
            : 'linear-gradient(135deg, rgba(15, 15, 25, 0.9) 0%, rgba(10, 10, 20, 0.95) 100%)',
          boxShadow: isHighlighted 
            ? `0 0 80px ${colors[accentColor].glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
            : `0 0 30px ${colors[accentColor].glow}`,
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
        whileHover={{ 
          y: -10,
          boxShadow: `0 0 100px ${colors[accentColor].glow}`,
        }}
      >
        {/* Subtle pattern for recommended card */}
        {isHighlighted && (
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.5) 1px, transparent 0)`,
              backgroundSize: '20px 20px',
            }} />
          </div>
        )}
        
        {/* Badge */}
        {(recommended || enterprise) && (
          <motion.div 
            className={`absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full text-[11px] font-bold tracking-wider uppercase bg-gradient-to-r ${colors[accentColor].gradient} text-white shadow-lg`}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3 }}
          >
            {recommended ? '✦ RECOMMENDED' : '✦ ENTERPRISE'}
          </motion.div>
        )}

        <div className={`p-8 ${isHighlighted ? 'pt-12' : ''} flex flex-col h-full relative z-10`}>
          {/* Plan Name */}
          <div className="mb-6">
            <h3 className={`text-xl font-semibold ${colors[accentColor].text} mb-1`}>{name}</h3>
            <p className="text-white/40 text-sm">{subtitle}</p>
          </div>

          {/* Price with animation */}
          <div className="mb-8">
            <motion.div 
              className="flex items-baseline gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.2 }}
            >
              <span className={`text-4xl font-bold ${isHighlighted ? 'text-white' : 'text-white/90'}`}>{price}</span>
              {priceNote && <span className="text-white/40 text-base">{priceNote}</span>}
            </motion.div>
          </div>

          {/* Features with staggered animation */}
          <ul className="space-y-4 mb-8 flex-grow">
            {features.map((feature, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-3 text-sm text-white/70"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3 + i * 0.08 }}
              >
                <motion.div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-r ${colors[accentColor].gradient}`}
                  whileHover={{ scale: 1.2 }}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full py-4 rounded-xl text-center font-medium transition-all flex items-center justify-center gap-2 relative overflow-hidden group ${
              isHighlighted 
                ? `bg-gradient-to-r ${colors[accentColor].gradient} text-white shadow-lg`
                : `border ${colors[accentColor].border} ${colors[accentColor].text}`
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
            <span className="relative z-10">詳細を相談する</span>
            <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>
      </motion.div>
    );
  };

  // --- Main Pricing Content (Enhanced) ---
  const PricingContent = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

    return (
      <div ref={containerRef} className="min-h-screen text-white bg-[#030308] relative">
        <NeuralBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
          
          {/* Header - Enhanced entrance */}
          <motion.div 
            className="text-center mb-28"
            style={{ opacity: headerOpacity }}
          >
            <motion.div 
              className="flex items-center justify-center gap-2 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <span className="text-[11px] font-medium tracking-[0.3em] text-cyan-400/80 uppercase">HAIS Enterprise Solution</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-light mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                Service Plans
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-white/40 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              組織の真の健全性を、科学的に守る
            </motion.p>
            
            {/* Decorative line */}
            <motion.div 
              className="mt-10 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            />
          </motion.div>

          {/* THE HIDDEN COST Section */}
          <RevealSection className="mb-32 relative">
            <PulsingGlow color="rgba(251, 191, 36, 0.12)" size={600} className="-top-32 -left-32" />
            
            <div className="relative rounded-3xl border border-amber-500/20 p-10 md:p-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.03) 0%, rgba(10, 10, 15, 0.95) 50%)' }}>
              
              {/* Subtle abstract visual */}
            <div className="absolute top-8 right-8 md:top-12 md:right-12 opacity-30">
              <motion.svg 
                viewBox="0 0 100 100" 
                className="w-20 h-20 md:w-32 md:h-32"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <linearGradient id="debt-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="45" stroke="url(#debt-grad)" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="35" stroke="url(#debt-grad)" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="25" stroke="url(#debt-grad)" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="50" r="15" stroke="url(#debt-grad)" strokeWidth="1" fill="url(#debt-grad)" fillOpacity="0.1" />
              </motion.svg>
            </div>

            <div className="relative z-10 max-w-3xl">
              <motion.p 
                className="text-amber-400/80 text-xs font-semibold tracking-[0.3em] uppercase mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                The Hidden Cost
              </motion.p>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 leading-[1.2]">
                辞めてほしくない人ほど、
              </h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-10 leading-[1.2]">
                <span className="text-amber-400 font-medium">黙って去る。</span>
              </h2>
              
              <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-14 max-w-2xl">
                組織の「未認識債務」は、最も優秀な人材から回収されます。
                <br className="hidden md:block" />
                彼らは不満を言わず、静かに次のステージへ移る。
                <br className="hidden md:block" />
                あなたが気づいた時には、すでに手遅れです。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-white/[0.03] rounded-2xl p-6 md:p-8 border border-white/5 hover:border-amber-500/30 transition-all duration-300"
                  whileHover={{ y: -4, background: 'rgba(255,255,255,0.05)' }}
                >
                  <p className="text-amber-400 text-3xl md:text-4xl font-bold mb-3">
                    <AnimatedCounter end={3000000} prefix="¥" glowColor="rgba(251, 191, 36, 0.5)" />
                  </p>
                  <p className="text-white/40 text-sm leading-relaxed">従業員1人の離職コスト<br />（年収500万円の場合）</p>
                </motion.div>
                <motion.div 
                  className="bg-white/[0.03] rounded-2xl p-6 md:p-8 border border-white/5 hover:border-amber-500/30 transition-all duration-300"
                  whileHover={{ y: -4, background: 'rgba(255,255,255,0.05)' }}
                >
                  <p className="text-amber-400 text-3xl md:text-4xl font-bold mb-3">50-200%</p>
                  <p className="text-white/40 text-sm leading-relaxed">年収に対する<br />離職コストの割合</p>
                </motion.div>
                <motion.div 
                  className="bg-white/[0.03] rounded-2xl p-6 md:p-8 border border-white/5 hover:border-amber-500/30 transition-all duration-300"
                  whileHover={{ y: -4, background: 'rgba(255,255,255,0.05)' }}
                >
                  <p className="text-amber-400 text-3xl md:text-4xl font-bold mb-3">見えない</p>
                  <p className="text-white/40 text-sm leading-relaxed">B/Sに計上されない<br />「未認識債務」</p>
                </motion.div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* WHAT HAIS REVEALS Section */}
        <RevealSection className="mb-32">
          <div className="text-center mb-16">
            <p className="text-cyan-400/80 text-xs font-semibold tracking-[0.3em] uppercase mb-6">What HAIS Reveals</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3">
              知ってから手を打つか、
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
              <span className="text-cyan-400">知らずに失うか。</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <motion.div
              className="bg-white/[0.02] rounded-2xl p-8 border border-white/5 hover:border-cyan-500/40 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              whileHover={{ y: -8, background: 'rgba(6, 182, 212, 0.03)' }}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/20 group-hover:border-cyan-400/40 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  <defs>
                    <linearGradient id="hb-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#67e8f9" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <circle cx="16" cy="8" r="4" stroke="url(#hb-grad-1)" strokeWidth="1.5" fill="url(#hb-grad-1)" fillOpacity="0.2" />
                  <path d="M8 26C8 20 11 17 16 17C21 17 24 20 24 26" stroke="url(#hb-grad-1)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M4 20H10L12 16L14 24L16 18L18 22L20 20H28" stroke="url(#hb-grad-1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                </svg>
              </motion.div>
              <h3 className="text-white font-medium text-lg mb-3 group-hover:text-cyan-300 transition-colors">誰が限界に近づいているか</h3>
              <p className="text-white/40 text-sm leading-relaxed">「大丈夫です」の裏にある真実を、生体データが語る</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="bg-white/[0.02] rounded-2xl p-8 border border-white/5 hover:border-purple-500/40 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -8, background: 'rgba(139, 92, 246, 0.03)' }}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-purple-500/20 to-violet-500/10 border border-purple-500/20 group-hover:border-purple-400/40 transition-colors"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  <defs>
                    <linearGradient id="hm-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c4b5fd" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                  <rect x="4" y="4" width="6" height="6" rx="1" fill="url(#hm-grad-1)" fillOpacity="0.3" />
                  <rect x="13" y="4" width="6" height="6" rx="1" fill="url(#hm-grad-1)" fillOpacity="0.9" />
                  <rect x="22" y="4" width="6" height="6" rx="1" fill="url(#hm-grad-1)" fillOpacity="0.5" />
                  <rect x="4" y="13" width="6" height="6" rx="1" fill="url(#hm-grad-1)" fillOpacity="0.6" />
                  <rect x="13" y="13" width="6" height="6" rx="1" fill="url(#hm-grad-1)" fillOpacity="1" />
                  <rect x="22" y="13" width="6" height="6" rx="1" fill="url(#hm-grad-1)" fillOpacity="0.4" />
                  <rect x="4" y="22" width="6" height="6" rx="1" fill="url(#hm-grad-1)" fillOpacity="0.2" />
                  <rect x="13" y="22" width="6" height="6" rx="1" fill="url(#hm-grad-1)" fillOpacity="0.7" />
                  <rect x="22" y="22" width="6" height="6" rx="1" fill="url(#hm-grad-1)" fillOpacity="0.3" />
                </svg>
              </motion.div>
              <h3 className="text-white font-medium text-lg mb-3 group-hover:text-purple-300 transition-colors">どの部署に負荷が集中しているか</h3>
              <p className="text-white/40 text-sm leading-relaxed">組織全体のヒートマップで、構造的な問題を可視化</p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="bg-white/[0.02] rounded-2xl p-8 border border-white/5 hover:border-emerald-500/40 transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, background: 'rgba(16, 185, 129, 0.03)' }}
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-emerald-500/20 to-green-500/10 border border-emerald-500/20 group-hover:border-emerald-400/40 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  <defs>
                    <linearGradient id="tr-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6ee7b7" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <path d="M4 24L10 20L16 22L22 12L28 8" stroke="url(#tr-grad-1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <circle cx="10" cy="20" r="2" fill="url(#tr-grad-1)" />
                  <circle cx="16" cy="22" r="2" fill="url(#tr-grad-1)" />
                  <circle cx="22" cy="12" r="2" fill="url(#tr-grad-1)" />
                  <circle cx="28" cy="8" r="3" fill="url(#tr-grad-1)" />
                  <circle cx="28" cy="8" r="5" stroke="url(#tr-grad-1)" strokeWidth="1" fill="none" opacity="0.5" />
                  <path d="M4 28H28" stroke="url(#tr-grad-1)" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
                </svg>
              </motion.div>
              <h3 className="text-white font-medium text-lg mb-3 group-hover:text-emerald-300 transition-colors">いつ、何人が離脱リスクにあるか</h3>
              <p className="text-white/40 text-sm leading-relaxed">トレンド分析で、3ヶ月先のリスクを予測</p>
            </motion.div>
          </div>
        </RevealSection>

        {/* PRICING PLANS Section */}
        <RevealSection className="mb-32">
          <div className="text-center mb-16">
            <p className="text-emerald-400/80 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Investment Plans</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4">
              組織の規模と目的に合わせた、
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
              <span className="text-emerald-400">3つの導入プラン</span>
            </h2>
            <p className="text-white/30 text-sm mt-6">※ 価格は参考価格です。詳細はご相談ください。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
            <PlanCard
              name="Plan A: API Connect"
              subtitle="Enterprise / Developer"
              price="¥50,000〜"
              priceNote="/月"
              accentColor="cyan"
              delay={0}
              features={[
                '既存システムへのシームレスAPI連携',
                '日次での継続的モニタリング',
                '傾向分析とアラート機能',
                '部署別・個人別の詳細レポート',
                'Slack / Teams アラート連携',
              ]}
            />
            <PlanCard
              name="Plan B: Organizational Scan"
              subtitle="HR / Management"
              price="¥300,000〜"
              priceNote="/回"
              accentColor="purple"
              recommended
              delay={0.15}
              features={[
                '全従業員への一斉診断実施',
                '組織全体の健全性スコア算出',
                '部署間の比較分析レポート',
                'リスクエリアの早期発見',
                '改善施策の効果測定',
                '経営層向けエグゼクティブレポート',
              ]}
            />
            <PlanCard
              name="Plan C: Executive Consulting"
              subtitle="Leaders / CHRO"
              price="要相談"
              accentColor="emerald"
              enterprise
              delay={0.3}
              features={[
                'Founder田前秀樹による直接支援',
                '組織OSの根本的な再設計',
                '人的資本戦略の策定支援',
                'エグゼクティブ向け個別レポート',
                'Re-Verse視点での組織変革',
              ]}
            />
          </div>

          {/* Per-person cost highlight */}
          <motion.div 
            className="mt-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl border border-white/10 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%)' }}
              whileHover={{ borderColor: 'rgba(6, 182, 212, 0.3)' }}
            >
              <span className="text-white/50 text-sm">従業員100人の場合、Plan Aは</span>
              <motion.span 
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                animate={{ 
                  textShadow: ['0 0 20px rgba(6, 182, 212, 0.3)', '0 0 40px rgba(139, 92, 246, 0.4)', '0 0 20px rgba(6, 182, 212, 0.3)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                1人あたり月500円
              </motion.span>
            </motion.div>
          </motion.div>
        </RevealSection>

        {/* ROI Section */}
        <RevealSection className="mb-32 relative">
          <PulsingGlow color="rgba(16, 185, 129, 0.12)" size={600} className="-bottom-32 -right-32" />
          
          <div className="relative rounded-3xl border border-emerald-500/20 p-10 md:p-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, rgba(10, 10, 15, 0.95) 50%)' }}>
            <div className="relative z-10">
              <p className="text-emerald-400/80 text-xs font-semibold tracking-[0.3em] uppercase mb-6">Return on Investment</p>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-3">
                1人の離職を防ぐだけで、
              </h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mb-14">
                5倍のリターン。
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <motion.div 
                    className="flex justify-between items-center py-5 border-b border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-white/60">HAIS導入コスト（Plan A / 年）</span>
                    <span className="text-white font-semibold text-xl">¥600,000</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between items-center py-5 border-b border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-white/60">離職1人の防止で回避できる損失</span>
                    <span className="text-emerald-400 font-semibold text-xl">¥3,000,000</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between items-center py-5"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-white/60">ROI</span>
                    <span className="text-emerald-400 font-bold text-4xl md:text-5xl">
                      <AnimatedCounter end={500} suffix="%" glowColor="rgba(16, 185, 129, 0.5)" />
                    </span>
                  </motion.div>
                </div>

                <motion.div 
                  className="bg-white/[0.03] rounded-2xl p-8 border border-emerald-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-white/80 text-lg leading-relaxed">
                    HAISは「コスト」ではなく<span className="text-emerald-400 font-semibold">「投資」</span>です。
                  </p>
                  <div className="my-6 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    優秀な人材を1人守ることで、採用コスト・教育コスト・機会損失の全てを回避できます。
                  </p>
                  <p className="text-emerald-400 text-xl font-medium mb-2">
                    「知っていれば、手を打てた」
                  </p>
                  <p className="text-white/70 text-lg">
                    その後悔を、ゼロにする。
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Final CTA - Enhanced */}
        <RevealSection className="text-center relative py-16">
          <PulsingGlow color="rgba(6, 182, 212, 0.15)" size={700} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Don't manage "Health".
            </motion.h2>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                Manage "Integrity".
              </span>
            </motion.h2>
            <motion.p 
              className="text-white/40 text-xl mb-14"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              健康を管理するな。尊厳を管理せよ。
            </motion.p>

            {/* CTA Button with pulse */}
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #10b981 100%)' }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #10b981 100%)' }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              
              <motion.a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center gap-4 px-14 py-7 rounded-2xl font-semibold text-white text-xl overflow-hidden group"
                style={{ 
                  background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #10b981 100%)',
                  boxShadow: '0 0 60px rgba(6, 182, 212, 0.4)',
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 0 100px rgba(6, 182, 212, 0.6)' }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <Zap className="w-6 h-6 relative z-10" />
                <span className="relative z-10">無料相談を予約する</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
              </motion.a>
            </motion.div>

            <motion.p 
              className="text-white/20 text-sm mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              30分のオンライン相談で、御社に最適なプランをご提案します
            </motion.p>
          </div>
        </RevealSection>

        {/* Footer */}
        <motion.div 
          className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-8 text-white/30 text-xs">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>No Raw Data Storage</span>
            </div>
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4" />
              <span>Edge Computing</span>
            </div>
          </div>
          <p className="text-white/20 text-xs">
            © 2026 ACES CARE HUB JAPAN / Re-Verse Civilization
          </p>
        </motion.div>

      </div>
    </div>
  );
};

// --- Main Export ---
export default function HaisPricingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem('hais_pricing_auth');
    if (auth === 'true') setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  const handleSuccess = () => {
    sessionStorage.setItem('hais_pricing_auth', 'true');
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030308]">
        <motion.div 
          className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isAuthenticated ? (
        <motion.div 
          key="content" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PricingContent />
        </motion.div>
      ) : (
        <motion.div 
          key="gate" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PasswordGate onSuccess={handleSuccess} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
