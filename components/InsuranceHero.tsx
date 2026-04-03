// // components/InsuranceHero.tsx

// "use client";

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ShieldCheck, Activity, Lock, ArrowRight } from 'lucide-react';
// import DemoScanningModal from './DemoScanningModal';

// const CALENDLY_URL = "https://calendly.com/tamatixyan/30min";

// export default function InsuranceHero() {
//   const [isDemoOpen, setIsDemoOpen] = useState(false);

//   return (
//     <div className="relative w-full min-h-screen bg-[#0B0F19] text-white overflow-hidden flex items-center justify-center">
      
//       {/* --- 背景演出 --- */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(56,189,248,0.05),_transparent_70%)]" />
//         <div className="w-full h-full opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
//       </div>

//       <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20 lg:pt-0">
        
//         {/* --- 左側：コピーライティング --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: -30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="space-y-8"
//         >
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md">
//             <span className="relative flex h-2 w-2">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
//             </span>
//             <span className="text-xs font-mono tracking-widest text-blue-300 uppercase">System Live: HAIS v3.0</span>
//           </div>

//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tighter font-sans">
//             保険は<br />
//             <span className="text-slate-300">「事故後」</span>を補填。<br /><br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
//               HAISは<br />「事故」を防ぐ。
//             </span>
//           </h1>

//           <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
//             人的資本の「未認識債務（メンタル不調・離職予兆）」を、
//             日次30秒の生体認証（Voice & Face）で可視化・圧縮する。<br/>
//             次世代のリスク管理インフラ、<strong className="text-white">Human Asset Integrity System</strong>。
//           </p>

//           {/* --- CTA改善：メインをCalendly、サブを30秒デモに --- */}
//           <div className="flex flex-col sm:flex-row gap-4 pt-4">
//             <motion.a
//               href={CALENDLY_URL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 group"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <Activity className="w-5 h-5" />
//               <span>無料診断 (PoC) を開始</span>
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </motion.a>
            
//             <button 
//               onClick={() => setIsDemoOpen(true)}
//               className="px-8 py-4 border border-white/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-slate-300 hover:text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
//             >
//               <ShieldCheck className="w-5 h-5" />
//               <span>30秒デモを見る</span>
//             </button>
//           </div>
          
//           <div className="flex items-center gap-6 pt-6 text-xs text-slate-500 font-mono border-t border-white/5 mt-8">
//              <div className="flex items-center gap-2">
//                 <Lock className="w-3 h-3 text-emerald-500" />
//                 <span>No Raw Data Storage</span>
//              </div>
//              <div className="flex items-center gap-2">
//                 <ShieldCheck className="w-3 h-3 text-emerald-500" />
//                 <span>Apple-Grade Security</span>
//              </div>
//           </div>
//         </motion.div>

//         {/* --- 右側：スキャン演出 --- */}
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1, delay: 0.2 }}
//           className="relative"
//         >
//           <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#000000]/40 backdrop-blur-sm aspect-[4/3] group">
            
//             <div className="absolute inset-0">
//               <img 
//                 src="/scan-demo.png" 
//                 alt="Bio-Signature Analysis" 
//                 className="w-full h-full object-cover opacity-80"
//               />
//               <div className="absolute inset-0 bg-black/30" />
              
//               <div className="absolute inset-0 flex flex-col items-center justify-center">
//                  <div className="absolute inset-0 border-[1px] border-blue-500/30 m-6 rounded-lg">
//                     <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400" />
//                     <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400" />
//                     <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400" />
//                     <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400" />
//                     <motion.div 
//                       animate={{ top: ["10%", "90%", "10%"] }}
//                       transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                       className="absolute left-0 w-full h-[2px] bg-blue-400 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
//                     />
//                  </div>
                 
//                  <div className="absolute bottom-12 left-0 w-full text-center space-y-2">
//                     <p className="text-blue-400 font-mono text-sm tracking-[0.2em] animate-pulse">
//                       ANALYZING GEOMETRY...
//                     </p>
//                     <p className="text-white font-bold text-2xl tracking-widest">
//                       91%
//                     </p>
//                  </div>
//               </div>
//             </div>

//             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
//           </div>
//         </motion.div>

//       </div>

//       <DemoScanningModal 
//         isOpen={isDemoOpen} 
//         onClose={() => setIsDemoOpen(false)} 
//       />

//     </div>
//   );
// }


"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Lock, ArrowRight } from 'lucide-react';
import DemoScanningModal from './DemoScanningModal';

const CALENDLY_URL = "https://calendly.com/tamatixyan/30min";

export default function InsuranceHero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-[#0B0F19] text-white overflow-hidden flex items-center justify-center">
      
      {/* --- 背景演出：シネマティック・ビデオ背景 --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source 
            src="https://huggingface.co/spaces/JonesHideki/hais-polyvagal/resolve/main/public/9.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/20 via-[#0B0F19]/60 to-[#0B0F19]" />
        <div className="w-full h-full opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20 lg:pt-0">
        
        {/* --- 左側：コピーライティング --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-900/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs font-mono tracking-widest text-blue-300 uppercase">System Live: HAIS v3.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tighter font-sans">
            保険は<br />
            <span className="text-slate-300">「事故後」</span>を補填。<br /><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              HAISは<br />「事故」を防ぐ。
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
            人的資本の「未認識債務（メンタル不調・離職予兆）」を、
            日次30秒の生体認証で可視化・圧縮する。<br/>
            次世代のリスク管理インフラ、<strong className="text-white">Human Asset Integrity System</strong>。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <Activity className="w-5 h-5" />
              <span>無料診断 (PoC) を開始</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <button 
              onClick={() => setIsDemoOpen(true)}
              className="px-8 py-4 border border-white/20 text-slate-300 hover:text-white font-medium rounded-lg transition-all"
            >
              <ShieldCheck className="w-5 h-5 inline mr-2" />
              <span>30秒デモを見る</span>
            </button>
          </div>
        </motion.div>

        {/* --- 右側：スキャン演出 --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#000000]/40 backdrop-blur-sm aspect-[4/3]">
            <div className="absolute inset-0">
              <img 
                src="/scan-demo.png" 
                alt="Bio-Signature Analysis" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 border-[1px] border-blue-500/30 m-6 rounded-lg">
                <motion.div 
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-blue-400 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <DemoScanningModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}
