// VisualProofModule.tsx -

'use client'; //
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VisualProofProps {
  onSuccess: () => void;
}

const VisualProofModule: React.FC<VisualProofProps> = ({ onSuccess }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'verified'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('カメラへのアクセスを許可してください');

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setFeedbackMsg('あなたの「顔（Proof）」をフレームに収めてください');
    } catch (err) {
      console.error("Camera Access Error:", err);
      setFeedbackMsg('カメラへのアクセスが拒否されました。設定を確認してください。');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleScan = async () => {
    if (!videoRef.current) return;

    setIsScanning(true);
    setScanStatus('scanning');
    setFeedbackMsg('Verifying Identity... (解析中)');

    // Simulation of Amazon Rekognition / API call
    setTimeout(() => {
      setScanStatus('verified');
      setFeedbackMsg('Identity Verified. (存在証明完了)');
      
      setTimeout(() => {
        onSuccess(); 
      }, 1500);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      
      <h2 className="text-xl font-bold mb-4 tracking-widest text-[#C89F53]">
        PHASE 1: VISUAL PROOF
      </h2>
      <p className="text-sm text-gray-400 mb-8 font-light">
        Proof-of-Careのために、あなたの存在を証明してください。
      </p>

      <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-[#333] shadow-[0_0_30px_rgba(200,159,83,0.2)]">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover transform scale-x-[-1]"
        />

        {scanStatus === 'scanning' && (
          <motion.div 
            className="absolute top-0 left-0 w-full h-2 bg-[#C89F53] opacity-50 blur-md"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {scanStatus === 'verified' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
             <motion.div 
               initial={{ scale: 0 }} 
               animate={{ scale: 1 }}
               className="text-[#C89F53] text-5xl"
             >
               ✓
             </motion.div>
          </div>
        )}
      </div>

      <p className="mt-6 text-sm font-mono text-[#C89F53] animate-pulse">
        {feedbackMsg}
      </p>

      {scanStatus === 'idle' && stream && (
        <button
          onClick={handleScan}
          className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-[#C89F53] to-[#8E6E32] text-black font-bold tracking-wider hover:scale-105 transition-transform shadow-lg"
        >
          SCAN FACE
        </button>
      )}
    </div>
  );
};

export default VisualProofModule;