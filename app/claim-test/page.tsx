import React from 'react';
import ClaimRewardFlow from '../../components/claim/ClaimRewardFlow';

export default function ClaimTestPage() {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex items-center justify-center p-4">
      
      {/* 背景の演出（淡い光） */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C89F53]/10 rounded-full blur-[120px]" />
      </div>

      {/* メインコンポーネントの配置 */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-xs font-mono text-gray-500 mb-2">DEVELOPER PREVIEW MODE</h1>
          <p className="text-gray-400 text-sm">Testing: Proof-of-Care Claim Flow (Visual + Vital)</p>
        </div>
        
        <ClaimRewardFlow />
        
      </div>
    </div>
  );
}