// components/DemoScanningModal.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, CheckCircle, AlertCircle } from 'lucide-react';
// インポート形式を修正
import { NextActionOptions } from './NextActionOptions';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoScanningModal({ isOpen, onClose }: DemoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [step, setStep] = useState<'idle' | 'initializing' | 'scanning' | 'complete' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      setStep('initializing');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 1280, height: 720 } 
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setStep('scanning');
    } catch (err) {
      setStep('error');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // 🚀 追加ポイント: モーダルが開いたらメインBGMを止める
      if (typeof window !== 'undefined') {
        const event = new Event('pause-theme-song');
        window.dispatchEvent(event);
      }
      
      startCamera();
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => { setStep('complete'); stopCamera(); }, 800);
            return 100;
          }
          return Math.min(prev + (prev > 80 ? 0.5 : 2), 100);
        });
      }, 50);
      return () => { clearInterval(interval); stopCamera(); };
    } else {
      setStep('idle');
      setProgress(0);
      stopCamera();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-4 md:py-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/90 backdrop-blur-md" />
          <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1, maxWidth: step === 'complete' ? '64rem' : '48rem' }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5, type: "spring", bounce: 0.2 }} className={`relative w-full bg-black border border-blue-500/30 rounded-xl shadow-[0_0_50px_rgba(59,130,246,0.2)] overflow-hidden flex flex-col ${step === 'complete' ? 'max-w-5xl' : 'max-w-3xl'}`}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 z-20">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${step === 'scanning' ? 'bg-red-500 animate-pulse' : step === 'complete' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-slate-500'}`} />
                <span className="font-mono text-sm tracking-wider text-slate-200">HAIS LIVE DIAGNOSTIC <span className="text-xs text-blue-400 ml-2">{step === 'scanning' ? '● REC' : step === 'complete' ? '● COMPLETE' : ''}</span></span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>

            <div className={`relative bg-black flex flex-col items-center justify-center transition-all duration-500 ${step === 'complete' ? 'min-h-[600px] h-auto p-8' : 'aspect-video overflow-hidden'}`}>
              {step !== 'complete' && (
                <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" />
              )}
              {step === 'scanning' && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="w-64 h-64 border border-blue-400/50 rounded-full animate-pulse shadow-[0_0_30px_rgba(59,130,246,0.2)]" />
                  <motion.div animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[1px] bg-cyan-400 opacity-50 shadow-[0_0_20px_#22d3ee]" />
                </div>
              )}
              {step === 'complete' && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full flex flex-col items-center">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] mb-6">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                      <span className="text-xl font-bold text-white tracking-tight">Diagnostic Complete</span>
                    </div>
                    <div className="p-10 bg-emerald-900/5 rounded-2xl border border-emerald-500/20 w-full max-w-md mx-auto shadow-[0_0_40px_rgba(16,185,129,0.05)]">
                      <p className="text-xs text-emerald-500/60 uppercase tracking-[0.3em] mb-4 font-mono">Bio-Integrity Level</p>
                      <p className="text-5xl md:text-6xl font-bold text-emerald-400 tracking-tighter drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] animate-pulse">Class A <span className="text-xl md:text-2xl font-normal text-emerald-300/70 ml-1 font-mono tracking-normal">(Stable)</span></p>
                    </div>
                  </div>
                  <NextActionOptions onCloseModal={onClose} />
                </motion.div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-white/10 bg-black/20 flex items-center justify-between text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-2"><Lock className="w-3 h-3 text-emerald-500" /><span>End-to-End Encrypted</span></div>
              <div className="flex items-center gap-4"><span>Latency: 12ms</span><span className="text-blue-500">HAIS v3.0 Core</span></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}