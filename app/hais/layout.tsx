'use client';

import React, { useState, useEffect } from 'react';
import '../../app/globals.css';

export default function HaisLayout({ children }: { children: React.ReactNode }) {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (sessionStorage.getItem('hais_unlocked') === 'true') {
            setIsUnlocked(true);
        }
    }, []);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'inazumahideki2030') {
            setIsUnlocked(true);
            sessionStorage.setItem('hais_unlocked', 'true');
        } else {
            setError('アクセスが拒否されました。');
        }
    };

    if (!isClient) return null;

    if (isUnlocked) {
        return (
            <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
                <main className="container mx-auto p-4 md:p-8">
                    {children}
                </main>
                <link rel="stylesheet" href="/hais/styles.css" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#050511] font-sans">
            <div className="w-full max-w-md p-8 bg-slate-900/80 rounded-2xl border border-slate-700/50 shadow-2xl backdrop-blur-md">
                <div className="text-center mb-8">
                    <div className="inline-block p-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mb-6">
                        <div className="bg-slate-900 p-4 rounded-full">
                            <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-widest mb-2">HAIS SECURE ACCESS</h1>
                    <p className="text-sm text-cyan-400/80 uppercase tracking-widest font-mono">Restricted Area</p>
                </div>

                <form onSubmit={handleUnlock} className="space-y-6">
                    <div className="space-y-2">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-5 py-4 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all text-center tracking-[0.3em] font-mono placeholder:tracking-normal placeholder:text-slate-600"
                            placeholder="ACCESS KEY"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center py-2 px-3 rounded text-[11px] font-mono animate-pulse">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform active:scale-[0.98]"
                    >
                        <span className="relative z-10 tracking-[0.2em] text-sm">AUTHENTICATE</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </form>
            </div>

            <p className="mt-8 text-[10px] text-slate-500/50 font-mono tracking-widest">
                SYSTEM SECURED BY RE-VERSE PROTOCOL
            </p>
        </div>
    );
}
