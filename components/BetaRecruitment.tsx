import React from 'react';
import { ArrowUpRight, Landmark, Cpu, Activity } from 'lucide-react';

const BetaRecruitment = () => {
  const roles = [
    {
      id: '01',
      icon: <Landmark className="w-8 h-8" strokeWidth={1} />,
      title: 'Civilization Architect',
      jpTitle: '文明構築者',
      // 配列ではなく、ここでレンダリング用のJSXを直接定義する方法もありますが、
      // 今回はmapの中で処理を分岐させるか、データ構造を少しリッチにします。
      // 最も安全なのは、personaを「文字列の配列」にして、map側でspanで囲むことです。
      // しかし、今の構造を維持しつつ、map側で特殊処理を行います。
      personaValues: [
        "政策・制度設計",
        "福祉現場",
        "社会起業家"
      ],
      contribution: 'Claimフローが社会システムとして機能する上での矛盾点、および法規制/運用面での問題提起。',
      color: 'from-blue-400 via-cyan-400 to-teal-300',
      glow: 'shadow-[0_0_30px_rgba(56,189,248,0.3)]',
      textAccent: 'text-cyan-400'
    },
    {
      id: '02',
      icon: <Cpu className="w-8 h-8" strokeWidth={1} />,
      title: 'Protocol Engineer',
      jpTitle: 'プロトコル技術者',
      // ★ここが修正の肝です
      personaValues: [
        "Web3",
        "セキュリティ監査",
        "フルスタック（Auth・Wallet・API）" // 長い塊
      ],
      contribution: 'Claim基盤、HMAC/Nonceロジック、ウォレット接続の技術的な脆弱性およびUXの検証。',
      color: 'from-purple-400 via-fuchsia-400 to-pink-300',
      glow: 'shadow-[0_0_30px_rgba(232,121,249,0.3)]',
      textAccent: 'text-fuchsia-400'
    },
    {
      id: '03',
      icon: <Activity className="w-8 h-8" strokeWidth={1} />,
      title: 'Care Pioneer',
      jpTitle: 'ケアパイオニア',
      personaValues: [
        "ACES",
        "ヤングケアラー",
        "当事者家族"
      ],
      contribution: 'Claimの体験が、実際のケア現場や生活においてどれほど意味を持つか、感情的なフィードバックを提供。',
      color: 'from-amber-400 via-orange-400 to-red-300',
      glow: 'shadow-[0_0_30px_rgba(251,146,60,0.3)]',
      textAccent: 'text-orange-400'
    },
  ];

  return (
    <section className="py-24 md:py-40 bg-[#020202] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen opacity-40" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-900/5 rounded-full blur-[100px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
            <span className="text-xs font-mono text-gray-300 tracking-widest uppercase">
              Recruitment Status: Open
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-purple-300 to-white leading-[1.1] mb-6 whitespace-nowrap overflow-visible drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            βテスター募集要項 <span className="text-white/40 block md:inline md:text-[0.6em] md:align-middle font-light tracking-wide">(Founding Member)</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            ただのテストではありません。<br className="md:hidden" />
            「ケアが制度になる文明」の<strong className="text-white font-medium">初期構築（Initial Build）</strong>に参加する招待状です。
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {roles.map((role) => (
            <div 
              key={role.id}
              className="group relative flex flex-col h-full bg-[#080808] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/10 hover:shadow-[0_0_60px_-20px_rgba(100,100,255,0.1)] hover:-translate-y-2"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-b ${role.color} mix-blend-overlay opacity-[0.05]`} />
              
              <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
                
                {/* ID & Tech-Icon */}
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500 tracking-tighter">
                    {role.id}
                  </span>
                  <div className={`transition-transform duration-500 group-hover:scale-110 ${role.textAccent} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
                    {role.icon}
                  </div>
                </div>

                {/* Titles */}
                <div className="mb-8">
                  <h3 className={`text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${role.color} transition-all duration-300`}>
                    {role.title}
                  </h3>
                  <p className="text-sm font-bold text-gray-600 tracking-widest uppercase group-hover:text-gray-400 transition-colors">
                    {role.jpTitle}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/5 mb-8 relative overflow-hidden">
                  <div className={`absolute inset-0 w-full h-full bg-gradient-to-r ${role.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000`} />
                </div>
                
                {/* Details */}
                <div className="space-y-6 flex-grow">
                  <div>
                    <h4 className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full ${role.textAccent}`} /> Target Persona
                    </h4>
                    
                    {/* ★ ここを修正: personaValuesをマッピングしてinline-block化 */}
                    <p className="text-gray-300 font-medium leading-relaxed">
                      {role.personaValues.map((val, i) => (
                        <React.Fragment key={i}>
                          <span className="inline-block whitespace-nowrap">
                            {val}
                          </span>
                          {/* 最後の要素でなければスラッシュを追加 */}
                          {i < role.personaValues.length - 1 && (
                            <span className="mx-2 text-gray-600">/</span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <span className={`w-1 h-1 rounded-full ${role.textAccent}`} /> Contribution
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {role.contribution}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-10 flex items-center gap-2 text-sm font-bold text-gray-600 group-hover:text-white transition-colors duration-300">
                  <span className="uppercase tracking-widest text-[10px]">Initialize</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BetaRecruitment;