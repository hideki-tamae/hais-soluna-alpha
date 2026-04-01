'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi'; 

import VisualProofModule from './VisualProofModule';
import VoiceHealthModule from './VoiceHealthModule';
import NFTRevealCard from './NFTRevealCard';

type Step = 'intro' | 'visual' | 'voice' | 'minting' | 'success' | 'error';

// 本番用コントラクトアドレス
const CONTRACT_ADDRESS = '0xC3Cd36f1165bD474d31F49D53410262C48f993bC'; 

const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "string", "name": "uri", "type": "string" },
      { "internalType": "uint256", "name": "vitalScore", "type": "uint256" }
    ],
    "name": "safeMint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const ClaimRewardFlow = () => {
  const { address, isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState<Step>('intro');
  const [proofData, setProofData] = useState<any>({});

  const { 
    data: hash, 
    error: mintError, 
    isPending: isWalletOpening, 
    writeContract 
  } = useWriteContract();

  const { 
    isLoading: isMinting, 
    isSuccess: isMinted 
  } = useWaitForTransactionReceipt({ hash });

  // 1. Visual Proof 完了
  const handleVisualSuccess = () => {
    setCurrentStep('voice');
  };

  // 2. Voice/Vital Proof 完了 -> Mint開始
  const handleVoiceSuccess = (healthData: any) => {
    setProofData((prev: any) => ({ ...prev, ...healthData }));
    setCurrentStep('minting');
  };

  // 3. ミント実行
  useEffect(() => {
    if (currentStep === 'minting' && !hash && !isWalletOpening && !mintError) {
      triggerMinting();
    }
  }, [currentStep]);

  const triggerMinting = () => {
    if (!isConnected || !address) {
      alert("ウォレットが接続されていません。");
      setCurrentStep('intro');
      return;
    }

    try {
      console.log("🚀 Triggering Smart Contract...");
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'safeMint',
        args: [
          address,
          "https://soluna.io/metadata/genesis.json",
          proofData.vitalityScore || 88
        ],
      });
    } catch (err) {
      console.error("Mint Error:", err);
      setCurrentStep('error');
    }
  };

  // Mint完了検知
  useEffect(() => {
    if (isMinted) {
      setCurrentStep('success');
    }
  }, [isMinted]);

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[600px] bg-black/40 border border-[#333] rounded-3xl p-8 backdrop-blur-md relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* 背景装飾 */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-[#C89F53]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <AnimatePresence mode='wait'>
        
        {/* STEP 0: INTRO */}
        {currentStep === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center w-full text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-serif">Founding Member Reward</h2>
            <p className="text-gray-400 max-w-lg mb-12 leading-relaxed">
              Gold Member限定のオーナーNFT（Proof-of-Care Token）を請求します。<br/>
              請求には、あなたが「今、ここに生きていること」の証明が必要です。
            </p>
            
            <div className="flex gap-6 text-xs text-gray-500 mb-12 tracking-widest uppercase">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center bg-gray-900">1</span>
                <span>Visual</span>
              </div>
              <div className="w-12 h-[1px] bg-gray-800"></div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center bg-gray-900">2</span>
                <span>Vital</span>
              </div>
              <div className="w-12 h-[1px] bg-gray-800"></div>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center bg-gray-900">3</span>
                <span>Mint</span>
              </div>
            </div>

            <button 
              onClick={() => setCurrentStep('visual')}
              className="px-12 py-4 bg-gradient-to-r from-[#C89F53] to-[#8E6E32] text-black font-bold rounded-full text-lg shadow-[0_0_30px_rgba(200,159,83,0.3)] hover:scale-105 transition-transform hover:shadow-[0_0_50px_rgba(200,159,83,0.5)]"
            >
              START CLAIM PROCESS
            </button>
          </motion.div>
        )}

        {/* STEP 1: VISUAL PROOF */}
        {currentStep === 'visual' && (
          <motion.div
            key="visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full"
          >
            <VisualProofModule onSuccess={handleVisualSuccess} />
          </motion.div>
        )}

        {/* STEP 2: VOICE PROOF */}
        {currentStep === 'voice' && (
          <motion.div
            key="voice"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full"
          >
            <VoiceHealthModule onAnalysisComplete={handleVoiceSuccess} />
          </motion.div>
        )}

        {/* STEP 3: MINTING (Improved UX) */}
        {currentStep === 'minting' && (
          <motion.div
            key="minting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10 w-full max-w-md"
          >
            <div className="relative w-32 h-32 mb-8">
              <motion.div 
                className="absolute inset-0 border-[1px] border-[#C89F53] rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="absolute inset-0 border-t-2 border-[#C89F53] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                {isWalletOpening ? '👆' : '⏳'}
              </div>
            </div>

            <h3 className="text-2xl text-white font-bold mb-4 tracking-wider text-center">
              {isWalletOpening ? 'PLEASE SIGN...' : isMinting ? 'MINTING IN PROGRESS...' : 'PREPARING PROOF...'}
            </h3>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 w-full text-left">
              <p className="text-white font-bold text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"/>
                ステータス: ブロックチェーン書き込み中
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                あなたの「生きた証」をブロックチェーンに刻んでいます。
                ネットワークの混雑状況により、<span className="text-yellow-400 font-bold">1〜3分ほどかかる場合があります。</span>
              </p>
              <div className="flex items-start gap-2 text-xs text-red-300 bg-red-900/20 p-3 rounded-lg border border-red-500/20">
                <span className="text-lg">⚠️</span>
                <p>
                  処理が完了するまで、<br/>
                  <span className="font-bold underline">ウィンドウを閉じずにそのままお待ちください。</span>
                </p>
              </div>
            </div>

            {mintError && (
              <div className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg text-center w-full">
                <p className="text-red-400 text-sm font-bold mb-2">Error: Transaction Failed</p>
                <button 
                  onClick={triggerMinting}
                  className="px-6 py-2 bg-red-600 text-white text-sm font-bold rounded-full hover:bg-red-500 transition-colors"
                >
                  RETRY MINT
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* STEP 4: SUCCESS */}
        {currentStep === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center w-full"
          >
            <div className="mb-10">
              <NFTRevealCard />
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C89F53] via-white to-[#C89F53] mb-4 filter drop-shadow-lg font-serif">
                Reward Claimed
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed text-sm">
                あなたの優しさと存在は、永遠の価値として証明されました。<br/>
                SOLUNAの創業メンバーとして歓迎します。
              </p>
              
              {hash && (
                <a 
                  href={`https://sepolia.basescan.org/tx/${hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block mb-6 text-[10px] text-[#C89F53] hover:underline flex items-center justify-center gap-1"
                >
                  <span>VIEW ON BASESCAN</span>
                </a>
              )}

              <button 
                onClick={() => window.location.reload()} 
                className="px-10 py-3 border border-[#C89F53] text-[#C89F53] rounded-full hover:bg-[#C89F53] hover:text-black transition-all duration-300 font-bold tracking-wider text-sm"
              >
                RETURN TO DASHBOARD
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClaimRewardFlow;