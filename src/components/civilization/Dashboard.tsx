"use client";
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CivilizationState } from '@/types/civilization';

export default function Dashboard({ userId }: { userId: string }) {
  const [state, setState] = useState<CivilizationState | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'civilizations', userId), (snap) => {
      if (snap.exists()) setState(snap.data() as CivilizationState);
    });
    return () => unsubscribe();
  }, [userId]);

  if (!state) return <div className="p-10 text-cyan-500 animate-pulse">Connecting to Civilization OS...</div>;

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-cyan-400">Civilization OS V1.0</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(state.resources).map(([k, v]) => (
          <div key={k} className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <p className="text-xs text-slate-500 uppercase">{k}</p>
            <p className="text-2xl font-mono">{v}</p>
          </div>
        ))}
      </div>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
        <h2 className="text-xl mb-4">Care Assets (Happiness: {state.population.happiness}%)</h2>
        <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${state.population.happiness}%` }} />
        </div>
      </div>
    </div>
  );
}
