import React from 'react';
import { ArrowRight } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      // Icon 1: Founder's Guarantee
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12 drop-shadow-[0_0_20px_rgba(200,166,101,0.5)]">
          <defs>
            <linearGradient id="livingGold1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8E7848" />
            </linearGradient>
            <filter id="glowPulse1">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowPulse1)" fill="none" stroke="url(#livingGold1)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 6L10 16v18c0 18 22 28 22 28s22-10 22-28V16L32 6z" strokeOpacity="0.9" className="animate-pulse" style={{animationDuration: '4s'}}/>
            <path d="M32 16v24M22 26l10 10 10-10" strokeWidth="1.5"/>
            <circle cx="32" cy="46" r="1" fill="#FFF8E7" className="animate-ping" style={{animationDuration: '3s', animationDelay: '0s'}}/>
            <circle cx="20" cy="20" r="0.5" fill="#D4AF37" className="animate-ping" style={{animationDuration: '4s', animationDelay: '1s'}}/>
            <circle cx="44" cy="20" r="0.5" fill="#D4AF37" className="animate-ping" style={{animationDuration: '4s', animationDelay: '2s'}}/>
          </g>
        </svg>
      ),
      title: "Founder's Claim Guarantee",
      description: "SOLUNAトークンのClaim権を確約し、優先付与。一般公開前のプレ・メインネット段階での保有権を保証します。",
    },
    {
      // Icon 2: Private Channel
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12 drop-shadow-[0_0_20px_rgba(200,166,101,0.5)]">
          <defs>
            <linearGradient id="livingGold2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="100%" stopColor="#C8A665" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#livingGold2)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="18" y="30" width="28" height="22" rx="4" strokeOpacity="0.8"/>
            <path d="M32 30V12c0-5-4-8-8-8s-8 3-8 8v18" strokeOpacity="0.6"/>
            <path d="M32 38v6" strokeWidth="2" stroke="#FFF8E7" className="animate-pulse"/>
            <circle cx="32" cy="41" r="6" stroke="none" fill="#D4AF37" fillOpacity="0.1" className="animate-ping" style={{animationDuration: '2s'}}/>
            <path d="M48 10l1 3l3 1l-3 1l-1 3l-1-3l-3-1l3-1z" fill="#FFF8E7" stroke="none" className="animate-pulse" style={{animationDuration: '2s'}} filter="blur(0.5px)" />
            <circle cx="44" cy="14" r="0.5" fill="#FFF" className="animate-ping" style={{animationDuration: '3s', animationDelay: '1s'}}/>
          </g>
        </svg>
      ),
      title: "Architects' Private Channel",
      description: "コア開発チームとの限定コミュニティへの参加資格。仕様策定やガバナンス投票への早期アクセス権。",
    },
    {
      // Icon 3: Contributor Log
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-12 h-12 drop-shadow-[0_0_20px_rgba(200,166,101,0.5)]">
          <defs>
            <linearGradient id="livingGold3" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="100%" stopColor="#8E7848" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#livingGold3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 8L28 30l-4 10 10-4 22-22c2-2 4-2 6 0s2 4 0 6L40 40" strokeOpacity="1"/>
            <path d="M14 20h8M14 30h10M14 40h24M14 50h36" strokeOpacity="0.4" strokeDasharray="2 4"/>
            <circle cx="24" cy="40" r="1.5" fill="#FFF8E7" className="animate-ping" style={{animationDuration: '1s'}}/>
            <circle cx="28" cy="36" r="0.5" fill="#D4AF37" className="animate-ping" style={{animationDuration: '3s', animationDelay: '0.5s'}}/>
          </g>
        </svg>
      ),
      title: "Contributor Log",
      description: "Public Dashboardへの貢献者（Contributor）として記録。あなたの名前がRe-Verse（文明再起動）の『礎』として刻まれます。",
    },
  ];

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#020202] overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-orange-900/10 rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 max-w-4xl">
          <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-[#C8A665]/30 bg-[#C8A665]/10">
            <span className="text-xs font-mono text-[#E4CE9B] tracking-[0.2em] uppercase">
              Exclusive Privilege
            </span>
          </div>
          
          {/* 見出し修正：文字サイズ調整と「ベネフィット」の改行禁止処理 */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E7E9] via-[#E3D5C0] to-[#C8A665]">
              独占的な<span className="inline-block">ベネフィット</span>
            </span>
          </h2>
          
          {/* リード文修正：PCでは適宜改行、モバイルでは「あなたには」の後で改行し「特別な権利」を強調 */}
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            初期メンバーとなるあなたには、<br />
            将来のSOLUNAエコシステムにおける<br className="md:hidden" />
            <span className="inline-block text-gray-300 font-medium">特別な権利が付与されます。</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: List with Living Artifact Icons */}
          <div className="space-y-12">
            {benefits.map((item, index) => (
              <div key={index} className="flex gap-6 group">
                {/* Icon Circle */}
                <div className="shrink-0 relative">
                  <div className="w-20 h-20 rounded-2xl border border-[#C8A665]/20 bg-[#C8A665]/5 flex items-center justify-center group-hover:bg-[#C8A665]/10 group-hover:border-[#C8A665]/40 transition-all duration-300 shadow-[0_0_30px_rgba(200,166,101,0.05)] group-hover:shadow-[0_0_40px_rgba(200,166,101,0.2)]">
                    <div className="group-hover:-translate-y-1 transition-transform duration-500">
                      {item.icon}
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#E4CE9B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: CTA Card */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-[#C8A665]/20 to-transparent rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000" />
            
            <div className="relative bg-[#080808] border border-[#C8A665]/20 rounded-[2rem] p-8 md:p-14 text-center overflow-hidden">
              
              {/* Inner Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-[#C8A665]/5 to-transparent opacity-50" />

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight relative z-10">
                Be the First.
              </h3>
              
              {/* CTAテキスト修正：モバイルで見やすく改行位置を制御 */}
              <p className="text-gray-400 mb-8 md:mb-12 leading-relaxed relative z-10">
                この「創始者枠」は<br className="md:hidden" />
                <span className="inline-block">限られています。</span>
                <br className="hidden md:block" />
                <span className="block h-2 md:hidden" /> {/* モバイル用の行間調整 */}
                定員に達し次第、<br className="md:hidden" />
                <span className="inline-block">第1期募集は終了します。</span>
              </p>

              {/* Button */}
              <a 
                href="https://tally.so/r/wM9JVY" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-full group block overflow-hidden rounded-full p-[1px] z-10 mx-auto max-w-sm md:max-w-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#8E7848] via-[#D4AF37] to-[#8E7848] opacity-80" />
                
                <div className="relative bg-[#1A1A1A] hover:bg-[#252525] rounded-full px-4 py-4 md:px-8 md:py-5 transition-all duration-300">
                  <span className="flex items-center justify-center gap-2 md:gap-3 text-sm md:text-xl font-bold text-[#E4CE9B] tracking-wide whitespace-nowrap">
                    いますぐ Founding Member に応募
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>

              <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-mono text-[#8E7848] tracking-[0.2em] uppercase relative z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8E7848] animate-pulse" />
                Limited Seats Available
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Benefits;