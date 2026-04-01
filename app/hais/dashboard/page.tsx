'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Users, 
  AlertTriangle, 
  Lock, 
  ChevronRight,
  Building2,
  UserX,
  X,
  Calendar,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  FileText,
  Heart,
} from 'lucide-react';

// --- Custom SVG Icons ---
const AIBrainIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
    <defs>
      <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <path 
      d="M16 4C12 4 9 7 9 10C7 10 5 12 5 15C5 18 7 20 9 20C9 23 12 26 16 26C20 26 23 23 23 20C25 20 27 18 27 15C27 12 25 10 23 10C23 7 20 4 16 4Z" 
      stroke="url(#ai-grad)" 
      strokeWidth="1.5" 
      fill="url(#ai-grad)"
      fillOpacity="0.1"
    />
    <circle cx="12" cy="12" r="1.5" fill="url(#ai-grad)" />
    <circle cx="20" cy="12" r="1.5" fill="url(#ai-grad)" />
    <circle cx="16" cy="16" r="2" fill="url(#ai-grad)" />
    <circle cx="12" cy="20" r="1.5" fill="url(#ai-grad)" />
    <circle cx="20" cy="20" r="1.5" fill="url(#ai-grad)" />
    <path d="M12 12L16 16L20 12" stroke="url(#ai-grad)" strokeWidth="1" opacity="0.6" />
    <path d="M12 20L16 16L20 20" stroke="url(#ai-grad)" strokeWidth="1" opacity="0.6" />
  </svg>
);

const IntegrityIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
    <defs>
      <linearGradient id="integrity-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>
    </defs>
    <path 
      d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" 
      stroke="url(#integrity-grad)" 
      strokeWidth="1.5" 
      fill="url(#integrity-grad)"
      fillOpacity="0.1"
    />
    <path d="M8 12L11 15L16 9" stroke="url(#integrity-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// --- Configuration ---
const SECRET_PHRASE = "reverse2026"; 

// --- Mock Data ---
const DEPARTMENTS = [
  { name: 'エンジニアリング', nameEn: 'Engineering', score: 42, risk: 'Critical', debt: 12500000, members: 24 },
  { name: '営業', nameEn: 'Sales', score: 88, risk: 'Safe', debt: 0, members: 18 },
  { name: 'マーケティング', nameEn: 'Marketing', score: 65, risk: 'Caution', debt: 4200000, members: 12 },
  { name: 'カスタマーサクセス', nameEn: 'CS', score: 58, risk: 'Caution', debt: 6800000, members: 15 },
  { name: '人事・総務', nameEn: 'HR', score: 72, risk: 'Safe', debt: 1500000, members: 8 },
];

const RISKY_EMPLOYEES = [
  { id: 'EMP-8823', dept: 'エンジニアリング', risk: 92, reason: '音声バイオマーカー異常（抑うつ傾向）', status: '緊急', joinDate: '2022-04-01', role: 'シニアエンジニア' },
  { id: 'EMP-9102', dept: 'エンジニアリング', risk: 85, reason: '過重労働（残業120h超）', status: '高', joinDate: '2021-09-15', role: 'テックリード' },
  { id: 'EMP-7741', dept: 'カスタマーサクセス', risk: 78, reason: '微表情解析（抑圧された怒り）', status: '高', joinDate: '2023-01-10', role: 'CSマネージャー' },
];

// --- Types ---
type Employee = typeof RISKY_EMPLOYEES[0];

// --- Risk Label Component ---
const RiskBadge = ({ risk }: { risk: string }) => {
  const styles = {
    Critical: 'bg-rose-500 text-white',
    Caution: 'bg-yellow-500 text-yellow-950',
    Safe: 'bg-emerald-500 text-emerald-950',
  };
  const labels = {
    Critical: '危険',
    Caution: '注意',
    Safe: '良好',
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${styles[risk as keyof typeof styles]}`}>
      {labels[risk as keyof typeof labels]}
    </span>
  );
};

// --- Intervention Modal ---
const InterventionModal = ({ 
  employee, 
  onClose, 
  onSchedule 
}: { 
  employee: Employee; 
  onClose: () => void;
  onSchedule: (type: string) => void;
}) => {
  const interventionOptions = [
    { 
      id: 'care-interview', 
      icon: <Heart className="w-5 h-5" />, 
      title: 'ケア面談を設定', 
      desc: '1on1で状況を確認し、サポートを提案',
      time: '30分',
      color: 'emerald'
    },
    { 
      id: 'manager-alert', 
      icon: <MessageSquare className="w-5 h-5" />, 
      title: '上長へ通知', 
      desc: 'マネージャーに匿名でリスク情報を共有',
      time: '即時',
      color: 'blue'
    },
    { 
      id: 'hr-escalate', 
      icon: <Phone className="w-5 h-5" />, 
      title: '人事部へエスカレーション', 
      desc: '人事担当者による専門的なフォローアップ',
      time: '24時間以内',
      color: 'purple'
    },
    { 
      id: 'external-support', 
      icon: <Mail className="w-5 h-5" />, 
      title: '外部EAP連携', 
      desc: '外部カウンセラーによる専門支援を手配',
      time: '48時間以内',
      color: 'amber'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">介入アクションを選択</h2>
              <p className="text-sm text-slate-400 mt-1">従業員ID: {employee.id}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          
          {/* Employee Summary */}
          <div className="mt-4 p-4 bg-slate-800/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">部署</div>
                <div className="text-white font-medium">{employee.dept}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">役職</div>
                <div className="text-white font-medium">{employee.role}</div>
              </div>
              <div>
                <div className="text-sm text-slate-400">離職確率</div>
                <div className="text-rose-400 font-mono font-bold text-xl">{employee.risk}%</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-700">
              <div className="text-sm text-slate-400">検出理由</div>
              <div className="text-rose-300 text-sm mt-1 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {employee.reason}
              </div>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="p-6 space-y-3 max-h-[400px] overflow-y-auto">
          {interventionOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSchedule(option.id)}
              className={`w-full p-4 rounded-xl border border-slate-700 hover:border-${option.color}-500/50 bg-slate-800/30 hover:bg-slate-800/60 transition-all text-left group`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-${option.color}-500/10 text-${option.color}-400 group-hover:scale-110 transition-transform`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">{option.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {option.time}
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{option.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Action Confirmation Modal ---
const ActionConfirmModal = ({
  actionType,
  onClose,
  onConfirm,
}: {
  actionType: string;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        onConfirm();
      }, 1500);
    }, 2000);
  };

  const actionDetails = {
    'care-interview': {
      title: 'ケア面談を設定',
      desc: 'エンジニアリング部門の高リスク従業員に対して、ケア面談を設定します。',
      items: [
        '対象: EMP-8823, EMP-9102',
        '推奨日時: 今週中',
        '面談形式: 1on1（オンライン可）',
        '所要時間: 約30分',
      ]
    },
    'ai-recommendation': {
      title: 'AIレコメンデーション実行',
      desc: 'エンジニアリング部門全体へのケア面談を一括で設定します。',
      items: [
        '対象部署: エンジニアリング（24名）',
        '実施期間: 2週間',
        '予測効果: 離職リスク45%低減',
        '推定コスト削減: ¥1,125万',
      ]
    }
  };

  const details = actionDetails[actionType as keyof typeof actionDetails] || actionDetails['ai-recommendation'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {!isComplete ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <Calendar className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{details.title}</h2>
                    <p className="text-sm text-slate-400 mt-1">アクション確認</p>
                  </div>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  disabled={isProcessing}
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-slate-300 text-sm leading-relaxed">
                {details.desc}
              </p>
              
              <div className="mt-4 p-4 bg-slate-800/50 rounded-xl space-y-2">
                {details.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-3 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      処理中...
                    </>
                  ) : (
                    '実行する'
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-20 h-20 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">アクション完了</h3>
            <p className="text-slate-400 text-sm">
              ケア面談がスケジュールされました。<br />
              関係者に通知が送信されます。
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// --- Password Gate ---
const PasswordGate = ({ onUnlock }: { onUnlock: () => void }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === SECRET_PHRASE) {
      setIsUnlocking(true);
      setTimeout(onUnlock, 1500);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <AnimatePresence>
      {!isUnlocking ? (
        <motion.div exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black opacity-80" />
          <div className="relative z-10 w-full max-w-md p-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center space-y-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
                <Lock className="w-12 h-12 text-emerald-400 relative z-10" />
              </div>
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-light tracking-[0.2em] text-white">SYSTEM LOCKED</h1>
                <p className="text-slate-500 text-sm">HAISダッシュボードへのアクセスコードを入力</p>
              </div>
              <form onSubmit={handleLogin} className="w-full space-y-4">
                <input
                  type="password"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="アクセスコード"
                  className={`w-full bg-slate-900/50 border ${error ? 'border-rose-500 text-rose-500' : 'border-slate-800 text-emerald-400'} rounded-lg px-4 py-3 text-center tracking-widest outline-none focus:border-emerald-500 transition-all placeholder:text-slate-700`}
                  autoFocus
                />
                <button type="submit" className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 py-3 rounded-lg uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  認証
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
             className="text-emerald-500 font-mono tracking-widest text-sm"
           >
             認証完了。ダッシュボードを読み込み中...
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Animated Counter ---
const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-mono">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// --- Live Vital Chart ---
const LiveVitalChart = () => {
  return (
    <div className="relative h-28 w-full overflow-hidden bg-slate-900/50 rounded-lg border border-slate-800/50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
      
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="vitalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,50 Q20,40 40,55 T80,45 T120,55 T160,40 T200,50 L200,100 L0,100 Z"
          fill="url(#vitalGradient)"
          initial={{ x: 0 }}
          animate={{ x: -200 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 4 }}
        />
        <motion.path
          d="M0,50 Q20,40 40,55 T80,45 T120,55 T160,40 T200,50"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          initial={{ x: 0 }}
          animate={{ x: -200 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 4 }}
        />
      </svg>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-900 to-transparent" />
      
      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-emerald-400/60">
        リアルタイム生体モニター
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function DashboardPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showActionConfirm, setShowActionConfirm] = useState(false);
  const [actionType, setActionType] = useState('');

  const handleIntervention = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleScheduleIntervention = (type: string) => {
    setActionType(type);
    setSelectedEmployee(null);
    setShowActionConfirm(true);
  };

  const handleAIAction = () => {
    setActionType('ai-recommendation');
    setShowActionConfirm(true);
  };

  const handleConfirmAction = () => {
    setShowActionConfirm(false);
    setActionType('');
  };

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />;

  const totalDebt = DEPARTMENTS.reduce((sum, d) => sum + d.debt, 0);
  const avgScore = Math.round(DEPARTMENTS.reduce((sum, d) => sum + d.score, 0) / DEPARTMENTS.length);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px]" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-[100px]" />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {selectedEmployee && (
          <InterventionModal
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
            onSchedule={handleScheduleIntervention}
          />
        )}
        {showActionConfirm && (
          <ActionConfirmModal
            actionType={actionType}
            onClose={() => setShowActionConfirm(false)}
            onConfirm={handleConfirmAction}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="h-16 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold text-white tracking-wide">
                HAIS <span className="text-emerald-400 text-xs font-normal ml-1">Enterprise</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono -mt-0.5">Human Asset Integrity System</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                システム稼働中
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Users className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Top KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Organization Score */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="md:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-slate-400 text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <IntegrityIcon /> 組織健全性スコア
                </h3>
                <div className="flex items-end gap-4">
                  <div className="text-6xl font-light text-white tracking-tighter">
                    {avgScore}<span className="text-2xl text-slate-500">/100</span>
                  </div>
                  <div className={`text-xs mb-2 font-bold px-2 py-1 rounded ${
                    avgScore >= 70 ? 'bg-emerald-500/20 text-emerald-400' :
                    avgScore >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-rose-500/20 text-rose-400'
                  }`}>
                    {avgScore >= 70 ? '良好' : avgScore >= 50 ? '要注意' : '危険'}
                  </div>
                </div>
                <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 via-yellow-500 to-emerald-500 transition-all duration-1000"
                    style={{ width: `${avgScore}%` }}
                  />
                </div>
              </motion.div>

              {/* Hidden Debt */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                 className="md:col-span-5 bg-slate-900/60 border border-rose-900/30 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group"
              >
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
                <h3 className="text-rose-400 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> 未認識債務（HIDDEN DEBT）
                </h3>
                <div className="text-4xl md:text-5xl font-mono text-white tracking-tighter">
                  ¥<AnimatedCounter value={totalDebt} />
                </div>
                <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                  高リスク従業員3名が30日以内に離職した場合の<br />
                  推定損失額（採用・教育・機会損失含む）
                </p>
              </motion.div>

              {/* Live Vital */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                 className="md:col-span-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between"
              >
                <h3 className="text-emerald-400 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> 組織バイタル
                </h3>
                <LiveVitalChart />
                <div className="mt-3 flex justify-between text-[10px] font-mono text-slate-500">
                  <span>ストレス: 低</span>
                  <span>バイタル: 正常</span>
                </div>
              </motion.div>
            </div>

            {/* Department Heatmap & Risk List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Department Heatmap */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-slate-300 text-sm uppercase tracking-widest flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> 部署別ヒートマップ
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>良好</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500"></span>注意</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span>危険</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {DEPARTMENTS.map((dept, i) => (
                    <motion.div 
                      key={dept.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      className={`p-4 rounded-xl border relative overflow-hidden cursor-pointer transition-all
                        ${dept.risk === 'Critical' ? 'border-rose-500/40 bg-rose-500/5 hover:bg-rose-500/10' : 
                          dept.risk === 'Caution' ? 'border-yellow-500/40 bg-yellow-500/5 hover:bg-yellow-500/10' : 
                          'border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold
                            ${dept.risk === 'Critical' ? 'bg-rose-500 text-white' : 
                              dept.risk === 'Caution' ? 'bg-yellow-500 text-yellow-950' : 
                              'bg-emerald-500 text-emerald-950'}`}>
                            {dept.score}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{dept.name}</div>
                            <div className="text-[10px] text-slate-500">{dept.members}名</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <RiskBadge risk={dept.risk} />
                          {dept.debt > 0 && (
                            <div className="text-xs font-mono text-rose-400 mt-1">
                              ¥{(dept.debt / 10000).toFixed(0)}万
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="mt-3 h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            dept.risk === 'Critical' ? 'bg-rose-500' :
                            dept.risk === 'Caution' ? 'bg-yellow-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${dept.score}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* High Risk Employees */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-rose-400 text-sm uppercase tracking-widest flex items-center gap-2">
                    <UserX className="w-4 h-4" /> 高リスク従業員
                  </h3>
                  <span className="bg-rose-500/20 text-rose-400 text-xs px-3 py-1 rounded-full animate-pulse font-bold">
                    {RISKY_EMPLOYEES.length}件のアラート
                  </span>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                  {RISKY_EMPLOYEES.map((emp, i) => (
                    <motion.div 
                      key={emp.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-rose-500/30 transition-all group"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                           <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-mono text-xs border border-slate-700">
                             {emp.id.slice(-4)}
                           </div>
                           <div>
                             <div className="text-sm text-white font-mono">{emp.id}</div>
                             <div className="text-xs text-slate-500">{emp.dept}</div>
                           </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-mono text-rose-400 font-bold">{emp.risk}%</div>
                          <div className="text-[10px] text-slate-500">離職確率</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                        <div className="text-xs text-rose-300 flex items-center gap-2 flex-1">
                          <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                          <span className="line-clamp-1">{emp.reason}</span>
                        </div>
                        <button 
                          onClick={() => handleIntervention(emp)}
                          className="text-xs bg-slate-800 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-1 whitespace-nowrap group-hover:bg-rose-500"
                        >
                          介入する <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* AI Recommendation */}
            <motion.div
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
               className="bg-gradient-to-r from-emerald-900/30 to-slate-900/60 border border-emerald-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <AIBrainIcon />
                </div>
                <div>
                   <h4 className="text-white text-sm font-semibold flex items-center gap-2">
                     AIレコメンデーション
                     <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">NEW</span>
                   </h4>
                   <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                     現在のリスクレベルに基づき、<strong className="text-white">エンジニアリング部門</strong>への
                     「ケア面談」実施で離職リスクを<strong className="text-emerald-400">45%低減</strong>できる可能性があります。
                   </p>
                </div>
              </div>
              <button 
                onClick={handleAIAction}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] whitespace-nowrap"
              >
                アクション実行
              </button>
            </motion.div>

          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/50 bg-slate-900/50 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span>© 2026 ACES CARE HUB JAPAN</span>
              <span className="text-slate-700">|</span>
              <span>HAIS Enterprise Dashboard v3.0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>全システム正常稼働</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
