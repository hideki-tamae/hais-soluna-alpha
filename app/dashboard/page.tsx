'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

// Icons - 洗練されたアイコンのみを使用
import { 
  Activity, Wallet, Mic, History, 
  ShieldCheck, Zap, ChevronRight, User, Settings,
  LogOut, Crown, Sparkles, X, BookOpen, AlertCircle
} from 'lucide-react';

// Logic Integration
import { getBalance, getTransactions, Transaction } from '@/utils/ledger';

// 高級王冠コンポーネント
const LuxuryCrown = ({ className, size = 48 }: { className?: string, size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] ${className}`}
  >
    <defs>
      <linearGradient id="gold-gradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#FDE047" />
      </linearGradient>
    </defs>
    <path 
      d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5ZM19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V17H19V19Z" 
      fill="url(#gold-gradient)" 
      stroke="#FEF08A" 
      strokeWidth="0.5"
    />
    <circle cx="12" cy="2" r="1.5" fill="#FEF08A" filter="drop-shadow(0 0 2px white)"/>
    <circle cx="3" cy="3" r="1" fill="#FEF08A" />
    <circle cx="21" cy="3" r="1" fill="#FEF08A" />
  </svg>
);

// メインのロジック部分を別コンポーネントに分離
function DashboardContent() {
  const router = useRouter(); 
  const { isConnected } = useAccount();
  const searchParams = useSearchParams();
  const [balance, setBalance] = useState(0);
  const [recentTx, setRecentTx] = useState<Transaction[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    setBalance(getBalance());
    const txs = getTransactions();
    setRecentTx(txs.slice(0, 3));

    const today = new Date().toLocaleDateString();
    const done = txs.some(tx => 
      tx.type === 'VOICE_COMMITMENT' && 
      new Date(tx.timestamp).toLocaleDateString() === today
    );
    setIsConfirmed(done);

    if (searchParams.get('status') === 'claimed') {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 5000);
      router.replace('/dashboard');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-cyan-500/30">
      
      {/* --- Welcome Overlay --- */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
          >
            <div className="text-center p-8">
              <div className="inline-block p-6 rounded-full bg-gradient-to-b from-yellow-500/20 to-transparent mb-6 animate-pulse border border-yellow-500/30">
                <LuxuryCrown size={80} />
              </div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200 mb-2 drop-shadow-lg tracking-tighter">
                Identity Synced.
              </h2>
              <p className="text-gray-500 tracking-[0.3em] uppercase text-[10px]">Verification Complete | +10.00 SOLUNA</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Navigation --- */}
      <nav className="fixed bottom-0 w-full md:w-20 md:h-full md:left-0 bg-[#0A0A12]/90 backdrop-blur-md border-t md:border-t-0 md:border-r border-white/5 flex md:flex-col justify-around md:justify-center items-center p-4 z-40">
        <div className="hidden md:block absolute top-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 opacity-80" />
        </div>
        <NavIcon icon={<Wallet />} active />
        <NavIcon icon={<Activity />} />
        <Link href="/audit"><NavIcon icon={<History />} /></Link>
        <NavIcon icon={<Settings />} />
        <div className="hidden md:block absolute bottom-8">
           <LogOut className="w-6 h-6 text-gray-700 hover:text-red-400 cursor-pointer transition-colors" />
        </div>
      </nav>

      {/* --- Main Content --- */}
      <main className="md:ml-20 p-6 pb-24 md:p-12 max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <p className="text-gray-600 text-[10px] font-mono tracking-[0.4em] uppercase mb-1">Re-Verse OS v3.0.4</p>
            <h1 className="text-3xl font-black tracking-tight uppercase">Terminal</h1>
          </div>
          
          <div className="flex items-center gap-4">
             {/* ストリーク表示（絵文字廃止、タイポグラフィ重視） */}
             <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <Activity className="w-3 h-3 text-cyan-500" />
                <span className="text-gray-400 font-mono text-[10px] uppercase tracking-widest">Streak</span>
                <span className="text-white font-mono font-bold text-sm">03</span>
             </div>

             <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openConnectModal, mounted, authenticationStatus }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
                
                if (!ready) return null;
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} className="px-6 py-2.5 bg-white text-black text-[10px] font-black tracking-widest uppercase hover:bg-cyan-400 transition-all">
                      Connect
                    </button>
                  );
                }
                return (
                  <button onClick={openAccountModal} className="px-6 py-2.5 bg-[#0A0A12] border border-white/10 text-white text-[10px] font-mono tracking-widest uppercase hover:border-white/20 transition-all">
                    {account.displayName}
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </header>

        {/* ⚠️ 未確定アラート (ミニマルな警告デザイン) */}
        {!isConfirmed && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-5 rounded-sm bg-cyan-950/20 border-l-2 border-cyan-500 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4 text-center md:text-left">
              <AlertCircle className="w-5 h-5 text-cyan-500 animate-pulse" />
              <div>
                <p className="text-cyan-100 font-bold text-xs uppercase tracking-[0.2em]">Synchronization Required</p>
                <p className="text-cyan-500/60 text-[11px] font-medium">本日のバイオメトリクス・ログが未同期です。システム整合性を確保してください。</p>
              </div>
            </div>
            <Link href="/voice-commitment" className="w-full md:w-auto px-10 py-3 bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-black tracking-[0.3em] uppercase transition-all shadow-lg shadow-cyan-900/20">
              Execute Sync
            </Link>
          </motion.div>
        )}

        {/* Asset Overview */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Wallet Card */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-sm bg-[#05050A] border border-white/5 p-8 group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-[10px] font-mono uppercase tracking-[0.4em] mb-2 text-balance">Consolidated Balance</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl font-black text-white tracking-tighter">{balance.toFixed(2)}</span>
                    <span className="text-sm text-cyan-500 font-mono tracking-widest">SOLUNA</span>
                  </div>
                </div>
                <Link href="/voice-commitment">
                  <div className="p-4 bg-gradient-to-br from-yellow-900/10 to-transparent border border-yellow-500/20 hover:border-yellow-500/50 transition-all cursor-pointer group/crown">
                    <LuxuryCrown size={32} className="group-hover/crown:scale-105 transition-transform" />
                  </div>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <Link href="/tester-claim" className="text-[10px] font-black tracking-widest uppercase text-cyan-400 hover:text-white transition-colors flex items-center gap-2">
                  <BookOpen className="w-3 h-3" />
                  Read & Earn
                </Link>
                <Link href="/audit" className="text-gray-600 text-[10px] font-black tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
                  History <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Voice Commitment Card */}
          <Link href="/voice-commitment" className="group block h-full">
            <div className="h-full rounded-sm bg-[#08080E] border border-white/5 p-8 flex flex-col justify-between relative overflow-hidden transition-all hover:bg-[#0C0C15] hover:border-cyan-500/30">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-cyan-500/10 rounded-sm">
                    <Mic className="w-4 h-4 text-cyan-500" />
                  </div>
                  <h3 className="font-black text-white tracking-[0.2em] uppercase text-[11px]">Bio-Signature</h3>
                </div>
                <p className="text-gray-500 text-[11px] leading-relaxed mb-6 font-medium">
                  DAILY PROTOCOL:<br/>
                  声紋及び表情筋の解析による個体識別と<br/>精神状態のログ同期を実行します。
                </p>
              </div>
              
              <div className={`relative w-full py-4 font-black tracking-[0.3em] uppercase text-[10px] transition-all flex items-center justify-center gap-3 ${isConfirmed ? 'bg-white/5 text-gray-600 border border-white/5' : 'bg-white text-black group-hover:bg-cyan-500 group-hover:text-black'}`}>
                <span>{isConfirmed ? 'Identity Verified' : 'Initiate Sync'}</span>
                {!isConfirmed && <Zap className="w-3 h-3" />}
                {isConfirmed && <ShieldCheck className="w-3 h-3 text-cyan-500" />}
              </div>
            </div>
          </Link>
        </section>

        {/* Recent Activities */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <History className="w-4 h-4 text-gray-700" />
            <h2 className="text-[11px] font-black tracking-[0.3em] uppercase text-gray-500">Activity Log</h2>
          </div>
          <div className="space-y-[2px]">
            {recentTx.length === 0 ? (
              <div className="py-12 text-center text-gray-700 bg-white/[0.02] border border-dashed border-white/5 font-mono text-[10px] tracking-[0.4em]">
                NO LOGS FOUND
              </div>
            ) : (
              recentTx.map((tx) => (
                <div key={tx.id} className="group p-5 bg-[#05050A] border border-white/5 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-1 h-8 bg-white/5 group-hover:bg-cyan-500 transition-colors" />
                    <div>
                      <p className="font-black text-white text-[11px] tracking-widest uppercase">{tx.type.replace('_', ' ')}</p>
                      <p className="text-[10px] text-gray-600 font-mono mt-1 uppercase tracking-tight">{new Date(tx.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="font-mono font-bold text-white text-sm">+{tx.amount.toFixed(2)}</p>
                </div>
              ))
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

// Suspenseでラップしてエクスポート（これでVercelエラー解決）
export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#020205] flex items-center justify-center"><div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}

function NavIcon({ icon, active }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <div className={`p-4 transition-all cursor-pointer ${
      active ? 'text-cyan-500 border-l-2 border-cyan-500 bg-cyan-500/5' : 'text-gray-700 hover:text-gray-300'
    }`}>
      {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
    </div>
  );
}