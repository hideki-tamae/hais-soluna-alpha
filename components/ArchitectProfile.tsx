import React from 'react';
import { Landmark, ShieldCheck, Cpu, Feather, CheckCircle2 } from 'lucide-react';

const ArchitectProfile = () => {
  const categories = [
    {
      title: "Scientific Foundation",
      icon: <Landmark className="w-7 h-7 text-white/90" />,
      items: [
        "Yale University: Science of Well-Being (Adult & Teen) Completed",
        "University of Pennsylvania: Positive Psychology Completed",
        "UCLA – UCSF: ACEs Aware Completed",
        "University of Minnesota: Resilience in Trauma, Disaster, and War Completed",
        "Johns Hopkins University: Psychological First Aid (PFA) Completed"
      ]
    },
    {
      title: "Public Health Expertise",
      icon: <ShieldCheck className="w-7 h-7 text-white/90" />,
      items: [
        "Johns Hopkins University: Essential Epidemiology Tools Completed",
        "Preventive Medicine Specialist / Health Management Advisor Certified",
        "Imperial College London: Global Health Governance Final Capstone Phase (Strategic focus on Resilience & Governance)",
        "Evidence-Informed Health Optimization Certified (2019)"
      ]
    },
    {
      title: "Technical Foundation",
      icon: <Cpu className="w-7 h-7 text-white/90" />,
      items: [
        "Google Professional Certificates: Digital Marketing & PM (Focus on Social Implementation)",
        "IBM: Data Science Specialization Completed",
        "SAMURAI ENGINEER: Expert Course Completed (Full-stack Development)",
        "Blockchain & Token Economy: Architecture (SOLUNA Project)",
        "Generative AI: Creative Technology Integration"
      ]
    },
    {
      title: "Personal Discipline",
      icon: <Feather className="w-7 h-7 text-white/90" />,
      items: [
        "Social Impact: Japan Social Business Summit: Jury’s Special Award Winner (2019)",
        "Athletic Grit: National Futsal Qualifier / Kyushu Championships 800m Finalist / Half-Marathon Champion & Meet Record Holder (Unbroken)",
        "Musical Artistry: Japan Studio Vocal Grand Prix: JOYSOUND Award Winner (Prefectural Finals)",
        "Cultural Arts: Minami-Nihon Calligraphy: 8th Dan Master Rank (Kaisho Style) (1997)",
        // 修正: Sinceと1986の間に改行禁止スペース(\u00A0)を入れ、分断を防ぐ
        "Lived Experience: Deep understanding as an ACEs survivor / Young Carer (Since\u00A01986)"
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#151515] via-[#050505] to-[#000000] text-gray-200 overflow-hidden relative">
      
      {/* 背景の装飾的な光（オーロラ効果） */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] opacity-30 pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px] opacity-20 pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
        
        {/* メインタイトルセクション */}
        <div className="text-center mb-20 md:mb-28">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 tracking-tight mb-6 drop-shadow-sm">
            Liberal Arts Architect
          </h1>
          
          {/* サブタイトル修正: モバイルで改行を制御し視認性を向上 */}
          <div className="text-xl md:text-3xl text-gray-400 font-light tracking-wider flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
            <span className="hidden md:inline-block w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-600"></span>
            
            <span className="block md:inline">技術 × 制度 × 思想 を統合する</span>
            <span className="block md:inline text-gray-300">文明OSデザイナー</span>
            
            <span className="hidden md:inline-block w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-600"></span>
          </div>
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="group p-8 md:p-10 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.5)] hover:bg-[#0c0c0c]/90 hover:border-white/20 hover:shadow-[0_8px_30px_-5px_rgba(255,255,255,0.08)] transition-all duration-500 ease-out relative overflow-hidden"
            >
              {/* カードのホバー時の微細な光彩 */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="flex items-center gap-5 mb-10 relative">
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 shadow-inner group-hover:border-white/20 group-hover:bg-white/10 transition-colors duration-500">
                  {category.icon}
                </div>
                <h2 className="text-3xl font-bold tracking-wide text-white group-hover:text-white/90 transition-colors">
                  {category.title}
                </h2>
              </div>
              
              <ul className="space-y-6 relative">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-4 group/item">
                    {/* 発光するチェックマーク */}
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)] transition-transform duration-300 group-hover/item:scale-110" />
                    <span className="text-base md:text-lg font-light leading-relaxed text-gray-300 group-hover/item:text-white transition-colors duration-300">
                      {item.split(':').map((part, i) => (
                        i === 0 && item.includes(':') ? (
                          <strong key={i} className="font-semibold text-white">{part}:</strong>
                        ) : (
                          <span key={i} className={i === 0 ? "" : "text-gray-400 group-hover/item:text-gray-200"}>
                            {i === 0 ? part : ` ${part}`}
                          </span>
                        )
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchitectProfile;