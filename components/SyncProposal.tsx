import React from 'react';

interface SyncProposalProps {
  proposed: boolean;
  reason?: string;
  onSync: () => void;
}

/**
 * SyncProposal (不言実行のインターフェース)
 * ユーザーが「茹でガエルの罠」に陥った際、説教ではなく「波紋」で気づきを与える。
 */
const SyncProposal: React.FC<SyncProposalProps> = ({ proposed, reason, onSync }) => {
  if (!proposed) return null;

  return (
    <div className="fixed bottom-10 right-10 z-50">
      <div 
        onClick={onSync}
        className="cursor-pointer relative group flex items-center justify-center w-20 h-20"
      >
        {/* 薩摩哲学：波紋（Ripple）による静かなる介入 */}
        <div className="absolute inset-0 rounded-full bg-teal-500/20 animate-ping opacity-75" />
        <div className="absolute inset-0 rounded-full bg-teal-500/10 animate-pulse" />
        
        {/* メインアイコン：黄金基準への回帰（Sync） */}
        <div className="relative w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 
                        flex items-center justify-center transition-all duration-700 
                        group-hover:bg-teal-900/40 group-hover:scale-110 group-hover:border-teal-400/50 shadow-2xl">
          <svg 
            className="w-7 h-7 text-teal-400 opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
        </div>

        {/* ツールチップ：説明ではなく「北極星」を示す */}
        <div className="absolute right-24 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-lg text-white text-[10px] px-4 py-2 rounded-full tracking-[0.2em] border border-white/10 shadow-xl">
             {reason?.toUpperCase() || "RE-CALIBRATE TO PEAK"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncProposal;
