"use client";

import { Box, Heart, Globe } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section className="relative py-32 md:py-48 bg-[#050511] overflow-hidden">
      
      {/* 背景装飾：反転する世界のオーロラ */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* ヘッダーエリア */}
        <div className="text-center mb-24">
          <span className="inline-block py-1.5 px-5 rounded-full bg-indigo-950/50 border border-indigo-500/30 text-indigo-300 text-xs font-bold tracking-[0.2em] mb-8 shadow-[0_0_20px_rgba(99,102,241,0.2)] backdrop-blur-md">
            THE GREAT INVERSION
          </span>
          
          <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-8">
            世界は<span className="relative inline-block mx-4">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 blur-2xl opacity-50"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 drop-shadow-sm">
                「反転」
              </span>
            </span>する。
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            見えない「痛み」を癒やし、見えない「ケア」を価値に変える。<br className="hidden md:block"/>
            <span className="text-white font-medium">Re-Verse Civilization</span>は、優しさが循環する新たな経済圏OSです。
          </p>
        </div>

        {/* 3つのコア機能（ガラスのモノリス） */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          
          {/* Card 1: Proof of Care */}
          <div className="group relative p-1 bg-[#0A0A12]/40 rounded-[2rem] hover:-translate-y-2 transition-transform duration-500">
            {/* 枠線のグラデーション */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-transparent to-transparent rounded-[2rem] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative h-full bg-[#0A0A12]/80 backdrop-blur-xl rounded-[1.9rem] p-10 overflow-hidden border border-white/5 group-hover:border-blue-500/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-blue-900/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-blue-500/20 group-hover:bg-blue-900/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                <Box className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">Proof of Care</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                あなたのケアの実践を、ブロックチェーン上の不可逆な記録として証明。優しさが「資産」として蓄積されます。
              </p>
              {/* ホバー時の光の走査 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none"></div>
            </div>
          </div>

          {/* Card 2: Value of Kindness */}
          <div className="group relative p-1 bg-[#0A0A12]/40 rounded-[2rem] hover:-translate-y-2 transition-transform duration-500 delay-100">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 via-transparent to-transparent rounded-[2rem] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative h-full bg-[#0A0A12]/80 backdrop-blur-xl rounded-[1.9rem] p-10 overflow-hidden border border-white/5 group-hover:border-purple-500/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-purple-900/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-purple-500/20 group-hover:bg-purple-900/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <Heart className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Value of Kindness</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                自己犠牲ではなく、正当な対価へ。トークンエコノミーにより、誰かを助ける行為が、経済的にも報われる社会へ。
              </p>
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none"></div>
            </div>
          </div>

          {/* Card 3: Decentralized OS */}
          <div className="group relative p-1 bg-[#0A0A12]/40 rounded-[2rem] hover:-translate-y-2 transition-transform duration-500 delay-200">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/30 via-transparent to-transparent rounded-[2rem] opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative h-full bg-[#0A0A12]/80 backdrop-blur-xl rounded-[1.9rem] p-10 overflow-hidden border border-white/5 group-hover:border-cyan-500/30 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-cyan-900/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-cyan-500/20 group-hover:bg-cyan-900/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <Globe className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">Decentralized OS</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                中央集権的な管理を排除し、透明なプログラム（Smart Contract）が公平な分配と秩序を自動執行します。
              </p>
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>
      
      <style jsx global>{`
        .animate-pulse-slow {
          animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}