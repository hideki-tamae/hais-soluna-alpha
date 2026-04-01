'use client';
import { useState } from 'react';
import { HAIS_CONFIG } from '../../lib/hais-config';

export default function Login({ onLogin, correctPassword }: { onLogin: () => void, correctPassword: string }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === correctPassword) {
            sessionStorage.setItem('hais_auth', 'true');
            onLogin();
        } else {
            setError('パスワードが正しくありません。アクセスは記録されました。');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md p-6 md:p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wider">HAIS 認証システム</h2>
                    <p className="text-xs md:text-sm text-amber-500/90 font-medium leading-relaxed bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                        {HAIS_CONFIG.securityNotice}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            医療機関アクセス用シークレットフレーズ
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            placeholder="フレーズを入力"
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm xl:text-base text-center font-medium animate-pulse">{error}</p>}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-lg hover:from-indigo-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
                    >
                        HAIS セキュア領域へアクセス
                    </button>
                </form>
            </div>
        </div>
    );
}
