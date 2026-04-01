'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, AlertCircle, BookOpen, ShoppingCart, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { saveTransaction } from '../../utils/ledger';

/**
 * TesterClaimPage (RE-VERSE GATE)
 * SOLUNA v3: 読書履歴の証明とSBT発行のゲートウェイ
 */
export default function TesterClaimPage() {
  const router = useRouter();
  const [step, setStep] = useState<'select' | 'upload' | 'analyzing' | 'result'>('select');
  const [selectedType, setSelectedType] = useState<'amazon' | 'kindle' | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  // ファイル選択時の処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setStep('upload');
    }
  };

  // 申請ボタンを押した時の処理
  const handleClaim = async () => {
    if (!file || !selectedType) return;
    
    setStep('analyzing');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', selectedType);

    try {
      const response = await fetch('/api/verify-commitment', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();
      
      // 演出用ウェイト（AI Oracleの審判）
      setTimeout(() => {
        setResult(data);
        if (data.success) {
          saveTransaction(data.rewardAmount, 'READING_CLAIM');
        }
        setStep('result');
      }, 2000);

    } catch (error) {
      console.error("Claim Error:", error);
      setResult({ 
        success: false, 
        reason: "システムエラーが発生しました。ネットワーク接続を確認してください。", 
        detected_warnings: "Network Error" 
      });
      setStep('result');
    }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col relative overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* 背景エフェクト */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ヘッダーエリア */}
      <header className="p-8 pb-0 text-center relative z-10 flex flex-col items-center">
        <div className="mb-0">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            RE-VERSE GATE
          </h1>
          <p className="text-blue-500 text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold mt-2 opacity-80">
            Proof of Care Protocol
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-5xl mx-auto">
        
        {/* ステータスインジケーター */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-0 mb-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </div>
            <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide">
              証拠画像をアップロード
            </span>
          </div>
        </motion.div>

        {/* プロトコルステータス表示 */}
        <div className="flex gap-6 mb-10 opacity-40 hover:opacity-100 transition-opacity justify-center">
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
            <div className="w-1 h-1 bg-emerald-500 rounded-full" /> AI ORACLE: ONLINE
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500">
            <div className="w-1 h-1 bg-blue-500 rounded-full" /> GUARDIAN: ACTIVE
          </div>
        </div>

        <AnimatePresence mode="wait">
          
          {step === 'select' && (
            <motion.div 
              key="select"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-2"
            >
              {/* Amazon History Card */}
              <label className="cursor-pointer group relative block h-full">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { setSelectedType('amazon'); handleFileChange(e); }} />
                <div className="h-full bg-[#0A0A12] border border-white/10 p-8 rounded-[2rem] transition-all duration-300 group-hover:bg-[#0f0f1a] group-hover:border-orange-500/50 group-hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] group-hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 blur-[60px] rounded-full group-hover:bg-orange-500/20 transition-all duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500/10 to-orange-900/10 rounded-2xl flex items-center justify-center mb-6 text-orange-500 border border-white/5 group-hover:border-orange-500/30">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-orange-100 transition-colors">Amazon History</h3>
                      <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">Upload proof of purchase for <br/>"Re-Verse Civilization".</p>
                    <div className="mt-auto">
                      <div className="inline-flex items-center gap-2 text-orange-400 text-xs font-bold tracking-widest bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full mb-6">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" /> REWARD: 500 SOL
                      </div>
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-600 group-hover:text-gray-300 transition-colors">
                        <span>Tap to upload evidence</span>
                        <Upload className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </label>

              {/* Kindle Card */}
              <label className="cursor-pointer group relative block h-full">
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { setSelectedType('kindle'); handleFileChange(e); }} />
                <div className="h-full bg-[#0A0A12] border border-white/10 p-8 rounded-[2rem] transition-all duration-300 group-hover:bg-[#0f0f1a] group-hover:border-blue-500/50 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] group-hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/10 to-blue-900/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500 border border-white/5 group-hover:border-blue-500/30">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-100 transition-colors">Kindle Unlimited</h3>
                      <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">Upload screenshot of your <br/>Kindle Library screen.</p>
                    <div className="mt-auto">
                      <div className="inline-flex items-center gap-2 text-blue-400 text-xs font-bold tracking-widest bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full mb-6">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" /> REWARD: 50 SOL
                      </div>
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-600 group-hover:text-gray-300 transition-colors">
                        <span>Tap to upload evidence</span>
                        <Upload className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </motion.div>
          )}

          {step === 'upload' && (
            <motion.div key="upload" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl">
              <div className="bg-[#0A0A12] border border-white/10 rounded-[2rem] p-3 shadow-2xl">
                <div className="relative w-full h-64 bg-black rounded-3xl overflow-hidden mb-4 group border border-white/5">
                  {previewUrl && <img src={previewUrl} alt="Evidence" className="w-full h-full object-contain" />}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm cursor-pointer" onClick={() => setStep('select')}>
                    <div className="flex flex-col items-center gap-2 text-white">
                       <Upload className="w-6 h-6" /> <span className="text-sm font-bold">Change Image</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-2 text-center">
                  <div className="mb-6 flex items-center justify-center gap-3">
                     <span className={`w-2 h-2 rounded-full ${selectedType === 'amazon' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                     <p className="text-gray-300 text-sm font-bold">{selectedType === 'amazon' ? 'Amazon Purchase Verification' : 'Kindle Library Verification'}</p>
                  </div>
                  <button onClick={handleClaim} className={`w-full py-4 rounded-xl font-bold tracking-widest transition-all shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 relative overflow-hidden group ${selectedType === 'amazon' ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white' : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white'}`}>
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-[5] block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 animate-shiny" />
                    <span className="relative z-10 text-lg">VERIFY & CLAIM</span> <ShieldCheck className="w-5 h-5 relative z-10" />
                  </button>
                  <button onClick={() => setStep('select')} className="mt-4 text-xs text-gray-500 hover:text-white transition-colors border-b border-transparent hover:border-gray-500 pb-0.5">Cancel</button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center"><ShieldCheck className="w-8 h-8 text-blue-500 animate-pulse" /></div>
              </div>
              <h2 className="text-2xl font-bold mb-2 tracking-tight">AI Oracle is Judging...</h2>
              <p className="text-gray-500 font-mono text-sm">Validating proof on-chain</p>
            </motion.div>
          )}

          {step === 'result' && result && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl">
              {result.success ? (
                <div className="bg-[#0A0A12] border border-emerald-500/30 rounded-[2rem] p-10 text-center relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-green-400" />
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-white mb-2 tracking-tighter">APPROVED</h2>
                  <div className="bg-emerald-950/20 border border-emerald-500/20 p-8 rounded-3xl mb-10 relative">
                    <p className="text-emerald-400 text-5xl font-mono font-bold">+{result.rewardAmount} SOL</p>
                  </div>
                  <button onClick={() => router.push('/dashboard')} className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <span>Return to Dashboard</span> <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="bg-[#0A0A12] border border-red-500/30 rounded-[2rem] p-10 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-500" />
                  <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20" ><AlertCircle className="w-12 h-12 text-red-500" /></div>
                  <h2 className="text-3xl font-bold text-white mb-2">REJECTED</h2>
                  <div className="bg-red-950/20 border border-red-500/20 p-6 rounded-2xl mb-8 text-left">
                    <p className="text-white text-sm leading-relaxed mb-4 pl-5 border-l-2 border-red-500/30">{result.reason}</p>
                  </div>
                  <button onClick={() => setStep('select')} className="w-full py-4 rounded-xl bg-white/10 font-bold transition-all border border-white/10">Try Again</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}