'use client';
export default function Dashboard({ onViewChange, onLogout }: { onViewChange: (view: 'dashboard' | 'presentation') => void, onLogout: () => void }) {
    return (
        <div className="animation-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-indigo-400 tracking-wide">HAIS 統合ダッシュボード</h2>
                <div className="flex gap-4 w-full md:w-auto">
                    <button
                        onClick={() => onViewChange('presentation')}
                        className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/50 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm md:text-base justify-center flex-1 md:flex-none"
                    >
                        <span>プレゼンテーション画面表示</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/50 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm md:text-base justify-center"
                    >
                        ログアウト
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-slate-800/80 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <h3 className="text-lg text-slate-300 mb-2 relative z-10">総データトリアージ件数</h3>
                    <p className="text-4xl font-bold text-white relative z-10">1,248<span className="text-base font-normal text-slate-400 ml-2">件</span></p>
                </div>
                <div className="p-6 bg-slate-800/80 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden group hover:border-red-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <h3 className="text-lg text-slate-300 mb-2 relative z-10">異常検知インシデント</h3>
                    <p className="text-4xl font-bold text-red-400 relative z-10">3.2<span className="text-base font-normal text-slate-400 ml-2">%</span></p>
                </div>
                <div className="p-6 bg-slate-800/80 rounded-xl border border-slate-700 shadow-lg relative overflow-hidden group hover:border-green-500/50 transition-colors">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <h3 className="text-lg text-slate-300 mb-2 relative z-10">システム稼働評価</h3>
                    <p className="text-4xl font-bold text-green-400 relative z-10">最適<span className="text-base font-normal text-slate-400 ml-2">Optimal</span></p>
                </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl border border-slate-700 shadow-lg p-6 min-h-[300px] flex items-center justify-center">
                <p className="text-slate-500 italic">HAIS 詳細分析ウィジェット領域 (モック)</p>
            </div>
        </div>
    );
}
