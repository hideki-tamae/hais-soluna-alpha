'use client';

import React, { useState } from 'react';
import { 
  Box, 
  Book, 
  Upload, 
  Wallet, 
  Lock, 
  ScanLine, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

type TabType = 'oracle' | 'guardian';
type ProofType = 'amazon' | 'kindle' | null;

export default function ReverseGate() {
  const [activeTab, setActiveTab] = useState<TabType>('oracle');
  const [selectedProof, setSelectedProof] = useState<ProofType>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <div className="min-h-screen bg-[#02040a] text-white font-sans selection:bg-emerald-500/30">
      
      {/* --- Header Area --- */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#02040a]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold">
            ACES
          </div>
          <span className="font-bold tracking-wider text-sm">ACES CARE HUB JAPAN</span>
        </div>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-white/60">
            <a href="#" className="hover:text-white transition-colors">共創参加</a>
            <a href="#" className="hover:text-white transition-colors">読者限定</a>
          </nav>
          <button className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            Connect ID
          </button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="pt-32 pb-20 px-4 max-w-5xl mx-auto flex flex-col items-center relative">
        
        {/* Title Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2 opacity-60">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase">System Ready // Est. 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-900 drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            RE-VERSE GATE
          </h1>
          
          <div className="space-y-1">
            <p className="text-xs md:text-sm text-cyan-400 tracking-[0.2em] uppercase font-mono">
              Powered by AI Oracle Technology
            </p>
            <p className="text-sm md:text-base text-white/80 font-bold tracking-[0.1em] uppercase">
              Proof of Care Protocol
            </p>
            <p className="text-[10px] text-white/40 mt-2">
              優しさを資産に変える、世界初の認証ゲート
            </p>
          </div>
        </div>

        {/* --- Tab Switcher (The Gate Toggle) --- */}
        <div className="w-full max-w-4xl p-1 bg-white/5 rounded-2xl border border-white/10 mb-8 flex relative overflow-hidden">
          {/* Active Background Slider */}
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#0a0f1c] rounded-xl border border-white/10 shadow-lg transition-all duration-300 ease-out z-0
              ${activeTab === 'oracle' ? 'left-1' : 'left-[calc(50%+4px)]'}
            `}
          />

          <button
            onClick={() => setActiveTab('oracle')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 relative z-10 transition-all duration-300
              ${activeTab === 'oracle' ? 'text-emerald-400' : 'text-white/40 hover:text-white/60'}
            `}
          >
            <ScanLine size={18} />
            <span className="text-xs font-bold tracking-widest uppercase">AI Oracle Protocol</span>
            {activeTab === 'oracle' && <span className="text-[10px] ml-2 opacity-60">画像認証 (Kindle / Amazon)</span>}
          </button>

          <button
            onClick={() => setActiveTab('guardian')}
            className={`flex-1 flex items-center justify-center gap-3 py-4 relative z-10 transition-all duration-300
              ${activeTab === 'guardian' ? 'text-cyan-400' : 'text-white/40 hover:text-white/60'}
            `}
          >
            <ShieldCheck size={18} />
            <span className="text-xs font-bold tracking-widest uppercase">Guardian Gate</span>
          </button>
        </div>


        {/* --- Content Area --- */}
        <div className="w-full max-w-4xl bg-[#0a0f1c] border border-white/5 rounded-3xl p-6 md:p-10 min-h-[500px] relative overflow-hidden shadow-2xl">
          
          {/* Background Glows */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-50" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]" />


          {/* === SCENARIO A: AI ORACLE (Amazon/Kindle) === */}
          {activeTab === 'oracle' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Card Selection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                
                {/* Amazon Card */}
                <button
                  onClick={() => setSelectedProof('amazon')}
                  className={`relative group p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden
                    ${selectedProof === 'amazon' 
                      ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.15)]' 
                      : 'bg-white/5 border-white/10 hover:border-orange-500/30 hover:bg-white/[0.07]'}
                  `}
                >
                  <div className="absolute top-4 right-4">
                    {selectedProof === 'amazon' && <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_orange]" />}
                  </div>
                  
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors
                    ${selectedProof === 'amazon' ? 'bg-orange-500/20 text-orange-500' : 'bg-white/10 text-white/40'}
                  `}>
                    <Box size={28} />
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Amazon History</h3>
                      <p className="text-[10px] text-white/50">注文履歴 (¥3,880) をアップロード</p>
                    </div>
                    {selectedProof === 'amazon' && (
                      <span className="text-[9px] font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded uppercase tracking-wider">For Citizen</span>
                    )}
                  </div>
                </button>

                {/* Kindle Card */}
                <button
                  onClick={() => setSelectedProof('kindle')}
                  className={`relative group p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden
                    ${selectedProof === 'kindle' 
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]' 
                      : 'bg-white/5 border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.07]'}
                  `}
                >
                  <div className="absolute top-4 right-4">
                    {selectedProof === 'kindle' && <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_cyan]" />}
                  </div>

                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors
                    ${selectedProof === 'kindle' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-white/40'}
                  `}>
                    <Book size={28} />
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">Kindle Unlimited</h3>
                      <p className="text-[10px] text-white/50">ライブラリ画面をアップロード</p>
                    </div>
                    {selectedProof === 'kindle' && (
                      <span className="text-[9px] font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded uppercase tracking-wider">For Nomad</span>
                    )}
                  </div>
                </button>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center relative group hover:border-white/20 transition-colors bg-black/20">
                {!selectedProof ? (
                   <div className="flex flex-col items-center justify-center h-32 opacity-40">
                     <p className="text-xs tracking-widest uppercase mb-2">Select Type First</p>
                     <p className="text-[10px]">先に認証タイプ (Amazon / Kindle) を選択してください</p>
                   </div>
                ) : (
                  <div className="flex flex-col items-center cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={20} className="text-white/60" />
                    </div>
                    <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2
                      ${selectedProof === 'amazon' ? 'text-orange-400' : 'text-cyan-400'}
                    `}>
                      Target: {selectedProof === 'amazon' ? 'Citizen' : 'Nomad'} Verification
                    </p>
                    <h3 className="text-lg font-bold mb-1">画像をタップして選択</h3>
                    <p className="text-[10px] text-white/40 tracking-wider uppercase">or drop proof here</p>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button 
                  disabled={!selectedProof}
                  className={`w-full py-4 rounded-xl font-bold tracking-[0.2em] text-xs transition-all duration-300 flex items-center justify-center gap-2
                    ${selectedProof 
                      ? 'bg-slate-800 hover:bg-slate-700 text-white shadow-lg cursor-pointer' 
                      : 'bg-white/5 text-white/20 cursor-not-allowed'}
                  `}
                >
                  VERIFY & CLAIM
                  <span className="text-[9px] font-normal opacity-50 ml-1">認証してトークンを受け取る</span>
                </button>
              </div>

            </div>
          )}


          {/* === SCENARIO B: GUARDIAN GATE (Restricted) === */}
          {activeTab === 'guardian' && (
            <div className="animate-in fade-in zoom-in-95 duration-500 h-full flex flex-col items-center justify-center min-h-[400px]">
              
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
                <Lock size={64} className="relative z-10 text-cyan-400" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-[#0a0f1c]">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
              </div>

              <h2 className="text-2xl font-bold tracking-widest text-white mb-4 uppercase">Restricted Access</h2>
              
              <div className="max-w-md text-center mb-8">
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  ここは「文明の守護者」のみが通過できるゲートです。<br />
                  Genesis Code または Guardian Wallet を接続してください。
                </p>
              </div>

              <button 
                onClick={() => setIsWalletConnected(!isWalletConnected)}
                className="bg-white text-black px-8 py-4 rounded-full font-bold text-xs tracking-[0.1em] hover:scale-105 transition-transform flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                <Wallet size={16} />
                CONNECT GUARDIAN WALLET
              </button>

            </div>
          )}

        </div>
      </main>

    </div>
  );
}