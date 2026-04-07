"use client";
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ResourceBar } from './ResourceBar';
import { CareLogChart } from './CareLogChart';

export default function Dashboard({ userId }: { userId: string }) {
  const [state, setState] = useState<any>(null);

  useEffect(() => {
    // hideki_tamae_01 のデータをリアルタイム監視
    const unsubscribe = onSnapshot(doc(db, 'civilizations', userId), (snap) => {
      if (snap.exists()) {
        setState(snap.data());
      }
    });
    return () => unsubscribe();
  }, [userId]);

  if (!state) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-950 text-cyan-500 font-mono">
      <div className="text-4xl mb-4 animate-pulse">◈</div>
      <div className="tracking-[0.2em]">LINKING TO CIVILIZATION OS...</div>
      <div className="text-[10px] mt-4 text-slate-600 uppercase">Wait for initial data from AI Studio</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <ResourceBar resources={state.resources} />
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <header className="flex justify-between items-end border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-white">
              CIVILIZATION <span className="text-cyan-500 underline decoration-cyan-500/30 underline-offset-8">OS</span>
            </h1>
            <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-widest">
              Satsuma-v1.1 / Resonance Oracle Active / Node: Shibuya
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Happiness Index</p>
            <p className="text-5xl font-mono text-emerald-400 leading-none">{state.population?.happiness || 0}%</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             <CareLogChart logs={state.careLogs || []} />
             <div className="p-8 bg-slate-900/20 rounded-3xl border border-slate-800/50 backdrop-blur-xl">
                <h3 className="text-xs text-slate-500 uppercase tracking-widest mb-6 font-bold text-cyan-500/50">Resonance Manifesto</h3>
                <p className="text-xl leading-relaxed text-slate-300 italic font-serif">
                  "Adversity is not a liability, but the raw material for a more resilient civilization."
                </p>
             </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/40 rounded-2xl border border-slate-800">
               <h3 className="text-[10px] text-slate-500 mb-6 uppercase tracking-widest font-bold">Core Neural Status</h3>
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">System Integrity</span>
                    <span className="text-xs text-cyan-400 font-mono tracking-tighter underline">OPTIMAL</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 w-3/4 animate-pulse"></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-600">
                    <span>TX_RESONANCE_OK</span>
                    <span>OS_CORE_STABLE</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
