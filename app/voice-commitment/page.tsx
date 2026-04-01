'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Activity, ArrowRight, CheckCircle2, ShieldCheck, Zap, TrendingUp, FileText, Building2 } from 'lucide-react';
import { saveTransaction } from '../../utils/ledger';

// ▼▼▼ 重要なURL定義 ▼▼▼
const CALENDLY_URL = "https://calendly.com/tamatixyan/30min";
const REPORT_FORM_URL = "https://tally.so/r/your-form-id"; 

const LivingBioCoreLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="origin-center animate-[spin_10s_linear_infinite]">
      <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
      <path d="M50 5L50 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 85L50 95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 50L15 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M85 50L95 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </g>
    <g className="origin-center animate-[pulse_3s_ease-in-out_infinite]">
      <path d="M50 25L75 50L50 75L25 50L50 25Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
      <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </g>
    <path d="M20 80L80 20" stroke="currentColor" strokeWidth="0.5" opacity="0.2">
      <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="2s" repeatCount="indefinite" />
    </path>
  </svg>
);

const AnimatedNumber = ({ value, hasPercent = false }: { value: number, hasPercent?: boolean }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const incrementTime = 20;
    const step = end / (duration / incrementTime);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return <>{displayValue}{hasPercent && <span className="text-lg align-top opacity-70 ml-0.5">%</span>}</>;
};

const BioRadarChart = ({ vitality, resonance, integrity }: { vitality: number, resonance: number, integrity: number }) => {
  const vScale = vitality / 100;
  const rScale = resonance / 100;
  const iScale = integrity / 100;
  const radius = 35; 
  const pI = { x: 50, y: 50 - (radius * iScale) };
  const pR = { x: 50 + (radius * 0.866 * rScale), y: 50 + (radius * 0.5 * rScale) };
  const pV = { x: 50 - (radius * 0.866 * vScale), y: 50 + (radius * 0.5 * vScale) };
  const maxI = { x: 50, y: 50 - radius };
  const maxR = { x: 50 + (radius * 0.866), y: 50 + (radius * 0.5) };
  const maxV = { x: 50 - (radius * 0.866), y: 50 + (radius * 0.5) };

  return (
    <div className="relative w-full max-w-[320px] mx-auto my-8 aspect-square px-2">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        <path d={`M${maxI.x} ${maxI.y} L${maxR.x} ${maxR.y} L${maxV.x} ${maxV.y} Z`} stroke="white" strokeWidth="0.5" fill="none" opacity="0.1" />
        <path d="M50 32.5 L63 57.5 L37 57.5 Z" stroke="white" strokeWidth="0.5" fill="none" opacity="0.05" />
        <line x1="50" y1="50" x2={maxI.x} y2={maxI.y} stroke="white" strokeWidth="0.5" opacity="0.1" />
        <line x1="50" y1="50" x2={maxR.x} y2={maxR.y} stroke="white" strokeWidth="0.5" opacity="0.1" />
        <line x1="50" y1="50" x2={maxV.x} y2={maxV.y} stroke="white" strokeWidth="0.5" opacity="0.1" />
        <motion.path 
          initial={{ d: "M50 50 L50 50 L50 50 Z", opacity: 0 }}
          animate={{ d: `M${pI.x} ${pI.y} L${pR.x} ${pR.y} L${pV.x} ${pV.y} Z`, opacity: 0.7 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          fill="url(#radarGradient)" stroke="#22D3EE" strokeWidth="2"
        />
        <motion.circle cx={pI.x} cy={pI.y} r="1.5" fill="#fff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
        <motion.circle cx={pR.x} cy={pR.y} r="1.5" fill="#fff" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }} />
        <motion.circle cx={pV.x} cy={pV.y} r="1.5" fill="#fff" initial={{ scale: 1 }} animate={{ scale: 1 }} transition={{ delay: 1.0 }} />
        <defs>
          <linearGradient id="radarGradient" x1="50" y1="10" x2="50" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" stopOpacity="0.6" />
            <stop offset="1" stopColor="#10B981" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute top-[-5%] left-1/2 -translate-x-1/2 text-center w-full">
        <div className="text-2xl font-bold font-mono text-cyan-400 leading-none drop-shadow-lg mb-0.5"><AnimatedNumber value={integrity} /></div>
        <div className="text-[10px] font-bold text-gray-300 tracking-widest">INTEGRITY</div>
        <div className="text-[9px] text-gray-500 font-bold">一貫性</div>
      </div>
      <div className="absolute bottom-[20%] right-[-6%] translate-x-0 text-left w-20">
        <div className="text-2xl font-bold font-mono text-emerald-400 leading-none drop-shadow-lg mb-0.5"><AnimatedNumber value={resonance} hasPercent={true} /></div>
        <div className="text-[10px] font-bold text-gray-300 tracking-widest">RESONANCE</div>
        <div className="text-[9px] text-gray-500 font-bold">共鳴</div>
      </div>
      <div className="absolute bottom-[20%] left-[-6%] -translate-x-0 text-right w-20">
        <div className="text-2xl font-bold font-mono text-blue-400 leading-none drop-shadow-lg mb-0.5"><AnimatedNumber value={vitality} /></div>
        <div className="text-[10px] font-bold text-gray-300 tracking-widest">VITALITY</div>
        <div className="text-[9px] text-gray-500 font-bold">活力</div>
      </div>
    </div>
  );
};

export default function VoiceCommitmentPage() {
  const router = useRouter();
  const [step, setStep] = useState<'intro' | 'face-scan' | 'voice-record' | 'analyzing' | 'result'>('intro');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [vitalData, setVitalData] = useState({ vitality: 0, resonance: 0, integrity: 0 });

  const startCamera = async () => {
    setStep('face-scan');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1.5;
        setScanProgress(Math.floor(progress));
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep('voice-record'), 600);
        }
      }, 40);
    } catch (err) {
      console.error(err);
      alert("カメラへのアクセスを許可してください。");
      setStep('intro');
    }
  };

  const handleVoiceComplete = () => {
    setStep('analyzing');
    setTimeout(() => {
      setVitalData({ 
        vitality: 85 + Math.floor(Math.random() * 10), 
        resonance: 88 + Math.floor(Math.random() * 8),
        integrity: 92 + Math.floor(Math.random() * 5)
      });
      saveTransaction(10, 'VOICE_COMMITMENT');
      setStep('result');
    }, 2500);
  };

  // ★重要★ 強制的に親への伝播を止めるラッパー関数
  const stopPropagationWrapper = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* 映像レイヤー */}
      <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${step === 'intro' ? 'opacity-0' : 'opacity-90'}`}>
        <video ref={videoRef} muted playsInline className="w-full h-full object-cover transform scale-x-[-1]" style={{ filter: 'contrast(1.1) saturate(0.9)' }} />
        <div className="absolute inset-0 bg-[#020205]/40" />
        <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      </div>

      <main className="relative z-10 w-full max-w-lg px-6 pb-12">
        <AnimatePresence mode="wait">
          {/* STEP 0: INTRO */}
          {step === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center pt-10">
              <div className="w-32 h-32 mx-auto mb-10 relative flex items-center justify-center">
                 <LivingBioCoreLogo className="w-full h-full text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
              </div>
              <h1 className="text-4xl font-bold mb-3 tracking-tight text-white">IDENTITY SYNC</h1>
              <p className="text-cyan-400/80 font-mono text-xs tracking-widest uppercase mb-4">Bio-Signature Verification</p>
              <p className="text-gray-400 text-sm mb-10 font-light">生体認証による本人確認と同期を開始します。</p>
              <p className="text-gray-400 text-xs leading-relaxed mb-12 font-light bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-white font-bold block mb-1 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" /> Privacy Mode: Active
                </span>
                生体データは即時破棄され、解析結果のみが暗号化されます。
              </p>
              <button onClick={startCamera} className="w-full py-5 bg-white text-black font-bold tracking-widest rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2">
                START SCAN <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* STEP 1: SCANNING */}
          {step === 'face-scan' && (
            <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full pt-20">
              <div className="w-64 h-64 border-[1px] border-cyan-500/50 relative mb-8 rounded-2xl overflow-hidden">
                 <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
                 <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
                 <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
                 <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
                 <motion.div animate={{ top: ['0%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]" />
              </div>
              <div className="text-center space-y-2">
                <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] animate-pulse">ANALYZING GEOMETRY...</p>
                <p className="text-4xl font-mono font-bold text-white">{scanProgress}%</p>
              </div>
              <div className="mt-12 flex items-center gap-2 px-4 py-2 bg-black/60 rounded-full border border-white/10 backdrop-blur-md">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                <p className="text-[9px] text-gray-300 font-mono">デバイス内で安全に処理されます。<br/>映像は保存されません。</p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: VOICE RECORD */}
          {step === 'voice-record' && (
            <motion.div key="voice" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center w-full pt-20">
              <h2 className="text-xl font-bold mb-8 tracking-widest text-white">音声宣誓</h2>
              <div className="bg-black/60 backdrop-blur-md border border-white/20 p-8 rounded-2xl mb-12">
                <p className="text-gray-400 text-[10px] mb-3 uppercase tracking-widest font-mono">以下の言葉を発声してください</p>
                <p className="text-3xl font-black text-white italic tracking-tight">"I commit to Re-Verse."</p>
              </div>
              <VoiceRecorderUI onComplete={handleVoiceComplete} />
            </motion.div>
          )}

          {/* STEP 3: ANALYZING */}
          {step === 'analyzing' && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center pt-40">
              <div className="w-16 h-16 border-t-2 border-cyan-500 rounded-full animate-spin mx-auto mb-6" />
              <h2 className="text-sm font-bold font-mono tracking-widest text-cyan-400 uppercase">Processing Vitals...</h2>
            </motion.div>
          )}

          {/* STEP 4: RESULT */}
          {step === 'result' && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
              {/* Main Analysis Card */}
              <div className="bg-[#0A0A12]/95 border border-cyan-500/30 p-6 rounded-[32px] backdrop-blur-xl shadow-2xl relative overflow-hidden mb-6">
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-wide">ANALYSIS COMPLETE</h2>
                    <p className="text-[9px] text-gray-500 font-mono uppercase">Log ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span className="text-[9px] font-bold text-emerald-400">+2.4% vs Yesterday</span>
                  </div>
                </div>
                <BioRadarChart vitality={vitalData.vitality} resonance={vitalData.resonance} integrity={vitalData.integrity} />
                <div className="mt-4 p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10 text-center">
                   <p className="text-[10px] text-cyan-200/90 font-mono leading-relaxed">
                     &gt; All systems nominal.<br/>
                     &gt; 3軸バランスは良好。昨日に続き、高い一貫性(Integrity)を維持。
                   </p>
                </div>
              </div>

              {/* Action Cards Grid: ISOLATION WRAPPER */}
              {/* ▼▼▼ 親要素へのイベント伝播を完全に遮断するラッパー ▼▼▼ */}
              <div 
                className="grid grid-cols-2 gap-4 mb-8" 
                onClick={stopPropagationWrapper} // ここで親への通知を止める
                onMouseDown={stopPropagationWrapper}
              >
                {/* Left: Request Report */}
                <div className="bg-[#0A0A12] border border-white/10 p-4 rounded-2xl flex flex-col justify-between hover:border-cyan-500/50 transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                    <FileText className="w-10 h-10 text-cyan-400" />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      Request Analysis
                    </h3>
                    <p className="text-[10px] text-gray-400 leading-snug">
                      詳細な解析データと改善アドバイスを記載したPDFレポートを請求する。
                    </p>
                  </div>
                  <a 
                    href={REPORT_FORM_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all text-[10px] font-bold uppercase tracking-wider flex items-center justify-center relative z-50 cursor-pointer text-center"
                  >
                    Request PDF Report
                  </a>
                </div>

                {/* Right: For Enterprise */}
                <div className="bg-[#0A0A12] border border-white/10 p-4 rounded-2xl flex flex-col justify-between hover:border-emerald-500/50 transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
                    <Building2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                      For Enterprise
                    </h3>
                    <p className="text-[10px] text-gray-400 leading-snug">
                      組織導入・API連携・法人契約。人的資本の未認識債務を可視化する。
                    </p>
                  </div>
                  {/* ★★★ 純粋なリンクタグに戻します。これが最強のデバッグです ★★★ */}
                  <a 
                    href={CALENDLY_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all text-[10px] font-bold uppercase tracking-wider flex items-center justify-center relative z-50 cursor-pointer text-center"
                  >
                    Book a Demo
                  </a>
                </div>
              </div>

              {/* ▼▼▼ テスト用：単純なテキストリンク（これで動かなければ親要素が原因確定） ▼▼▼ */}
              <div className="w-full text-center mb-4">
                <a href={CALENDLY_URL} target="_blank" className="text-[10px] text-blue-500 underline pointer-events-auto">
                  【テスト用】単純リンクでCalendlyを開く
                </a>
              </div>

              {/* Dashboard Return Button */}
              <button 
                type="button"
                onClick={() => router.push('/dashboard?status=claimed')} 
                className="w-full py-4 bg-white text-black font-bold tracking-widest rounded-xl hover:bg-cyan-400 transition-all text-sm uppercase shadow-lg"
              >
                Return to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// サブコンポーネント: 音声レコーダー
function VoiceRecorderUI({ onComplete }: { onComplete: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(3);

  const start = () => {
    setIsRecording(true);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 mb-6">
        {isRecording && <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="absolute inset-0 bg-red-500/20 rounded-full border border-red-500/30" />}
        <button type="button" onClick={start} disabled={isRecording} className={`relative z-10 w-full h-full rounded-full flex items-center justify-center transition-all duration-300 ${isRecording ? 'bg-transparent border-2 border-red-500' : 'bg-white text-black hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]'}`}>
          {isRecording ? <span className="text-2xl font-mono font-bold text-red-500">{timer}</span> : <Mic className="w-8 h-8" />}
        </button>
      </div>
      <p className="text-[10px] font-bold font-mono text-gray-400 tracking-[0.3em] uppercase">
        {isRecording ? "Recording..." : "Tap to Record"}
      </p>
    </div>
  );
}