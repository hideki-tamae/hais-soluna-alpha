'use client';

import React, { useState, useEffect } from 'react';
import HAISJapanesePremium from './presentation';  // ← これに変更

export default function ProPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem('pro_unlocked') === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'inazumahideki2030') {
      setIsUnlocked(true);
      sessionStorage.setItem('pro_unlocked', 'true');
    } else {
      setError('アクセスが拒否されました。正しい解除キーを入力してください。');
    }
  };

  if (!isClient) return null;

  if (isUnlocked) {
    return <HAISJapanesePremium />;
  }

  return (
    <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-slate-900/80 border border-emerald-500/30 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
        <div className="flex justify-center mb-6">
          <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2 text-center tracking-widest font-mono">
          SYSTEM LOCKED
        </h1>
        <p className="text-gray-400 text-sm mb-8 text-center">
          HAIS PRO (97+) Area
        </p>
        <form onSubmit={handleUnlock} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            placeholder="ACCESS KEY"
            className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-center text-white font-mono focus:outline-none focus:border-emerald-500 transition-colors tracking-widest"
          />
          {error && <p className="text-red-400 text-xs text-center font-mono">{error}</p>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 font-mono tracking-wider"
          >
            AUTHORIZE
          </button>
        </form>
      </div>
    </div>
  );
}