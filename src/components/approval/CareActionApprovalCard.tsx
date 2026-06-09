import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, AlertTriangle, FileAudio } from 'lucide-react';
import { useApproveAction } from '@/hooks/useApproveAction';

interface CareActionProps {
  action: {
    id: string;
    employeeName: string;
    neuralState: 'STABLE' | 'STRESSED' | 'CRITICAL' | string;
    audioSizeBytes: number;
    analysisReason: string;
    createdAt: string;
  };
  onSuccess?: () => void;
}

export const CareActionApprovalCard: React.FC<CareActionProps> = ({ action, onSuccess }) => {
  const { approveAction, isApproving, txHash, error } = useApproveAction();

  const handleApprove = async () => {
    const success = await approveAction(action.id);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'STABLE': return 'text-emerald-400 border-emerald-500/30 bg-emerald-950/20';
      case 'STRESSED': return 'text-amber-400 border-amber-500/30 bg-amber-950/20';
      case 'CRITICAL': return 'text-rose-400 border-rose-500/30 bg-rose-950/20';
      default: return 'text-cyan-400 border-cyan-500/30 bg-cyan-950/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-mono bg-slate-950 border border-slate-800 p-6 rounded-none max-w-xl mx-auto my-4 relative overflow-hidden shadow-2xl"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-40 animate-pulse" />

      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-xs text-slate-500 tracking-widest uppercase block mb-1">SYSTEM://CARE_ACTION_LOG</span>
          <h3 className="text-xl font-bold text-slate-100 tracking-tight">{action.employeeName}</h3>
        </div>
        <div className={`text-xs border px-2.5 py-1 flex items-center gap-1.5 ${getStatusColor(action.neuralState)}`}>
          <Activity className="w-3.5 h-3.5" />
          <span>{action.neuralState}</span>
        </div>
      </div>

      <div className="space-y-4 text-sm border-t border-b border-slate-900 py-4 mb-6">
        <div className="grid grid-cols-3 gap-2">
          <span className="text-slate-500 text-xs uppercase flex items-center gap-1"><FileAudio className="w-3 h-3" /> AUDIO_SIZE:</span>
          <span className="text-slate-300 col-span-2 text-right">{(action.audioSizeBytes / 1024).toFixed(2)} KB</span>
        </div>
        
        <div className="space-y-1">
          <span className="text-slate-500 text-xs uppercase block">ANALYSIS_REASON_CONTEXT:</span>
          <p className="text-slate-300 bg-slate-900/50 p-3 border border-slate-850 text-xs leading-relaxed">
            {action.analysisReason}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {!txHash ? (
          <button
            onClick={handleApprove}
            disabled={isApproving}
            className="w-full bg-slate-900 hover:bg-slate-850 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 py-3 text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApproving ? (
              <>
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                MINTING_PROOF_ON_CHAIN...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                APPROVE & MINT "Proof of CARE"
              </>
            )}
          </button>
        ) : (
          <div className="bg-emerald-950/30 border border-emerald-500/40 p-4 text-xs text-emerald-400 space-y-2">
            <div className="font-bold tracking-widest uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> GENESIS_TRANSACTION_SUCCESS
            </div>
            <p className="text-slate-400 break-all">
              TxHash: <span className="text-emerald-300">{txHash}</span>
            </p>
          </div>
        )}

        {error && (
          <div className="bg-rose-950/30 border border-rose-500/40 p-4 text-xs text-rose-400 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold tracking-widest uppercase block mb-0.5">TRANSACTION_EXECUTION_ERROR</span>
              <p className="text-slate-400">{error}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
