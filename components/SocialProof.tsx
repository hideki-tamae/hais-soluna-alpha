import React from 'react';

const SocialProof = () => {
  const stats = [
    {
      // Global Reach
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <filter id="glowBlue">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowBlue)" fill="none" stroke="url(#blueGrad)" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="32" cy="32" r="24" strokeOpacity="0.5" className="animate-pulse" style={{animationDuration: '4s'}}/>
            <path d="M32 8c0 0-12 12-12 24s12 24 12 24M32 8c0 0 12 12 12 24s-12 24-12 24" strokeOpacity="0.4"/>
            <path d="M8 32h48M12 20h40M12 44h40" strokeOpacity="0.4"/>
            <path d="M52 20L36 32l-8-4-16 12" stroke="#60a5fa" strokeWidth="2" className="animate-pulse" style={{animationDuration: '3s'}}/>
            <circle cx="36" cy="32" r="2.5" fill="#93c5fd" className="animate-ping" style={{animationDuration: '2s'}}/>
            <circle cx="52" cy="20" r="1.5" fill="#93c5fd" className="animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}/>
          </g>
        </svg>
      ),
      label: "Global Reach",
      value: "185",
      suffix: "+",
      description: (
        <>
          国境を超えた共感のネットワーク。<br />
          地球規模で広がる「反転」の波。
        </>
      ),
      gradient: "from-blue-400 to-blue-600",
      hoverBorder: "hover:border-blue-500/30",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
      titleColor: "text-white group-hover:text-blue-200"
    },
    {
      // Evidence Based
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
          <defs>
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7e22ce" />
            </linearGradient>
            <filter id="glowPurple">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowPurple)" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 8c0 8 8 12 8 20s-8 12-8 20M44 8c0 8-8 12-8 20s8 12 8 20" stroke="url(#purpleGrad)" strokeWidth="2" />
            <path d="M24 16h16M28 28h8M24 40h16M28 52h8" stroke="url(#purpleGrad)" strokeWidth="1.5" opacity="0.6" />
            <circle cx="32" cy="28" r="16" stroke="#e879f9" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_8s_linear_infinite]" opacity="0.5"/>
            <circle cx="32" cy="28" r="3" fill="#e879f9" className="animate-pulse" style={{animationDuration: '2.5s'}}/>
            <path d="M32 28l16-12" stroke="#e879f9" strokeWidth="1" opacity="0.5"/>
            <circle cx="48" cy="16" r="1.5" fill="#f0abfc" className="animate-ping" style={{animationDuration: '2s'}}/>
          </g>
        </svg>
      ),
      label: "Evidence Based",
      value: "Scientific",
      isTextValue: true,
      description: (
        <>
          Johns Hopkins等の世界的権威の<br />
          公衆衛生学知見をプロトコルに実装。
        </>
      ),
      gradient: "from-purple-400 to-pink-300",
      hoverBorder: "hover:border-purple-500/30",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
      titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300"
    },
    {
      // Protocol
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">
          <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <filter id="glowGreen">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowGreen)" fill="none" stroke="url(#greenGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 8l16 8v12l-16 8-16-8V16z" strokeOpacity="0.8" className="animate-pulse" style={{animationDuration: '4s'}}/>
            <path d="M32 18v10M24 22l16-8" strokeOpacity="0.4"/>
            <path d="M32 36l16 8v12l-16 8-16-8V44z" strokeOpacity="0.8" className="animate-pulse" style={{animationDuration: '4s', animationDelay: '0.5s'}}/>
            <path d="M32 46v10M24 50l16-8" strokeOpacity="0.4"/>
            <path d="M32 28v8" strokeWidth="2" stroke="#34d399"/>
            <circle cx="32" cy="32" r="5" stroke="#34d399" strokeWidth="2" className="animate-ping" style={{animationDuration: '3s'}}/>
            <path d="M34 30c-2 0-4 1-4 2s2 2 4 2 4 1 4 2-2 2-4 2" stroke="#86efac" strokeWidth="2"/>
          </g>
        </svg>
      ),
      label: "Protocol",
      value: "SOLUNA",
      isTextValue: true,
      description: (
        // 修正箇所: 文節ごとに inline-block を適用し、文節途中での改行を防ぐ
        <span className="block leading-relaxed">
          <span className="inline-block">優しさの行動証明を</span>
          <span className="inline-block">ブロックチェーンに刻み、</span>
          <span className="inline-block">不変の価値として資産化する。</span>
        </span>
      ),
      gradient: "from-emerald-400 to-teal-300",
      hoverBorder: "hover:border-emerald-500/30",
      hoverShadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      titleColor: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300"
    }
  ];

  return (
    <section className="relative w-full py-24 bg-[#050505] border-y border-white/5 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[400px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 幅広レイアウトのために max-w-7xl を適用 */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 1. Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-gray-400 tracking-[0.2em] uppercase">
              Global Traction & Integrity
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-white drop-shadow-[0_0_15px_rgba(167,139,250,0.3)]">
              共鳴する世界、実装される優しさ。
            </span>
          </h2>
        </div>

        {/* 2. Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`group p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 ${stat.hoverBorder} transition-all duration-300 ${stat.hoverShadow} flex flex-col`}
            >
              <div className="mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                {stat.icon}
              </div>
              
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4 block">
                {stat.label}
              </span>
              
              <div className={`text-5xl md:text-6xl font-bold mb-6 tracking-tight ${stat.titleColor}`}>
                {stat.value}
                {stat.suffix && <span className="text-4xl text-blue-500">{stat.suffix}</span>}
              </div>
              
              <div className="text-gray-400 leading-relaxed font-medium mt-auto">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Tech Stack */}
        <div className="relative border-t border-white/5 pt-16 text-center">
          <p className="text-sm font-mono text-gray-500 uppercase tracking-[0.3em] mb-10">
            Powered by Global Standards
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20 opacity-80">
            {['Ethereum', 'Next.js', 'Supabase', 'Prisma', 'Vercel'].map((tech) => (
              <span 
                key={tech} 
                className="text-2xl md:text-3xl font-bold text-gray-400 hover:text-white transition-colors duration-300 cursor-default tracking-tight"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;