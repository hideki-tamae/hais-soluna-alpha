import React from 'react';

const InversionSection = () => {
  const features = [
    {
      title: "Proof of Care",
      description: "あなたのケアの実践を、ブロックチェーン上の不可逆な記録として証明。優しさが「資産」として蓄積されます。",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-24 h-24 drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]">
          <defs>
            <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glowCyan">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowCyan)" fill="none" stroke="url(#cyanGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 20l-8 4v8l8 4 8-4v-8z" fill="url(#cyanGrad)" fillOpacity="0.2" className="animate-pulse" style={{animationDuration: '3s'}}/>
            <path d="M32 6L8 18v28l24 12 24-12V18L32 6z" strokeOpacity="0.8" />
            <path d="M32 6v12m0 40V46M8 18l24 12m24-12L32 30" strokeOpacity="0.6"/>
            <path d="M20 24l12 6 12-6M20 40l12 6 12-6" opacity="0.4"/>
            <circle cx="32" cy="6" r="2" fill="#fff" className="animate-ping" style={{animationDuration: '4s'}}/>
          </g>
        </svg>
      ),
      gradient: "from-cyan-500/10 to-blue-500/10",
      borderGlow: "group-hover:border-cyan-500/50",
      shadowGlow: "group-hover:shadow-[0_0_80px_rgba(34,211,238,0.15)]"
    },
    {
      title: "Value of Kindness",
      description: "自己犠牲ではなく、正当な対価へ。トークンエコノミーにより、誰かを助ける行為が、経済的にも報われる社会へ。",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-24 h-24 drop-shadow-[0_0_30px_rgba(232,121,249,0.6)]">
          <defs>
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="glowPurple">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowPurple)" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 56C32 56 6 42 6 24C6 14 14 6 24 6C29 6 32 10 32 10C32 10 35 6 40 6C50 6 58 14 58 24C58 42 32 56 32 56Z" stroke="url(#purpleGrad)" strokeWidth="1.5" strokeOpacity="0.3" className="animate-pulse" style={{animationDuration: '4s'}}/>
            <path d="M32 50C32 50 10 38 10 24C10 16 16 12 22 12C27 12 32 16 32 16C32 16 37 12 42 12C48 12 54 16 54 24C54 38 32 50 32 50Z" stroke="url(#purpleGrad)" strokeWidth="2" />
            <path d="M32 16v8M24 24h16" stroke="#f0abfc" strokeWidth="1" opacity="0.5"/>
            <circle cx="48" cy="18" r="2" fill="#fff" className="animate-ping" style={{animationDuration: '3s'}}/>
          </g>
        </svg>
      ),
      gradient: "from-fuchsia-500/10 to-purple-500/10",
      borderGlow: "group-hover:border-fuchsia-500/50",
      shadowGlow: "group-hover:shadow-[0_0_80px_rgba(232,121,249,0.15)]"
    },
    {
      title: "Decentralized OS",
      description: "中央集権的な管理を排除し、透明なプログラム（Smart Contract）が公平な分配と秩序を自動執行します。",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-24 h-24 drop-shadow-[0_0_30px_rgba(52,211,153,0.6)]">
          <defs>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <filter id="glowGreen">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowGreen)" fill="none" stroke="url(#greenGrad)" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="32" cy="32" r="26" strokeOpacity="0.2" strokeDasharray="4 6" className="animate-[spin_12s_linear_infinite] origin-center" />
            <circle cx="32" cy="32" r="20" strokeOpacity="0.8"/>
            <path d="M32 12c0 0-8 8-8 20s8 20 8 20M32 12c0 0 8 8 8 20s-8 20-8 20" strokeOpacity="0.6"/>
            <path d="M12 32h40M16 22h32M16 42h32" strokeOpacity="0.4"/>
            <circle cx="32" cy="22" r="2" fill="#fff" className="animate-ping" style={{animationDuration: '2s'}}/>
            <circle cx="48" cy="32" r="1.5" fill="#fff" className="animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}/>
          </g>
        </svg>
      ),
      gradient: "from-emerald-500/10 to-green-500/10",
      borderGlow: "group-hover:border-emerald-500/50",
      shadowGlow: "group-hover:shadow-[0_0_80px_rgba(52,211,153,0.15)]"
    }
  ];

  return (
    <section className="relative w-full py-24 md:py-48 bg-[#050511] overflow-hidden">
      
      {/* Background Ambience (Deep Universe) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Area */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <span className="text-xs font-mono text-blue-300 tracking-[0.2em] uppercase">
              The Great Inversion
            </span>
          </div>
          
          {/* 【修正ポイント】
            1. 親タグから whitespace-nowrap を削除（画面からはみ出し防止）
            2. 「反転」から「する。」までを <span className="inline-block whitespace-nowrap"> で囲む
               → これにより「る。」だけの改行を物理的に阻止
          */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
            世界は
            <span className="inline-block whitespace-nowrap ml-2 md:ml-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]">
                「反転」
              </span>
              する。
            </span>
          </h2>

          <p className="text-gray-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-light px-2">
            見えない「痛み」を癒やし、見えない「ケア」を価値に変える。<br className="hidden md:block" />
            <strong className="text-white font-medium">Re-Verse Civilization</strong>は、優しさが循環する新たな経済圏OSです。
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group relative p-8 md:p-10 rounded-3xl bg-[#080816] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-[#0b0b1e] ${feature.borderGlow} ${feature.shadowGlow}`}
            >
              {/* Internal Gradient Light */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen`} />
              
              <div className="relative z-10 flex flex-col h-full items-center text-center">
                {/* Icon Container - Pure Light (Hologram) */}
                <div className="mb-8 md:mb-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm md:text-base font-medium opacity-90">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InversionSection;