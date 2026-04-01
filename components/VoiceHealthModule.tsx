'use client'; 
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VoiceHealthProps {
  onAnalysisComplete: (healthData: any) => void;
}

const VoiceHealthModule: React.FC<VoiceHealthProps> = ({ onAnalysisComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'recording' | 'analyzing' | 'complete'>('idle');
  const [vitalScore, setVitalScore] = useState<number | null>(null);
  const [randomTopic, setRandomTopic] = useState('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationIdRef = useRef<number | null>(null);

  // トピック：ありのままの全領域をカバー
  const topics = [
    "自分への肯定を。（私は、私の優しさを誇りに思う）",
    "今の正直な気持ち。（辛いこと、腹が立つこと、愚痴）",
    "回復のきっかけ。（今日、何が気持ちを楽にしてくれた？）",
    "落ち込みの原因。（何があなたの心を重くしている？）",
    "今は分からなくていい。（ただ、ため息をついたり、歌ったり）"
  ];

  useEffect(() => {
    // ランダムに1つ提案を表示するが、ユーザーはそれに従わなくてもよい
    setRandomTopic(topics[Math.floor(Math.random() * topics.length)]);
  }, []);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (!canvas || !analyser || !dataArray) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // ▼▼▼ 修正箇所: 型エラー回避のため as any を追加 ▼▼▼
    analyser.getByteTimeDomainData(dataArray as any);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; 
    ctx.fillRect(0, 0, width, height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#C89F53'; 
    ctx.beginPath();

    const sliceWidth = width * 1.0 / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * height / 2;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    animationIdRef.current = requestAnimationFrame(drawWaveform);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      source.connect(analyser);
      analyser.fftSize = 2048;
      const bufferLength = analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;

      setIsRecording(true);
      setAnalysisStatus('recording');
      drawWaveform();

      setTimeout(() => stopRecording(), 5000);
    } catch (err) {
      console.error("Microphone Access Error:", err);
      alert("マイクへのアクセスを許可してください。");
    }
  };

  const stopRecording = () => {
    if (sourceRef.current) sourceRef.current.disconnect();
    if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    
    setIsRecording(false);
    setAnalysisStatus('analyzing');

    setTimeout(() => {
      // 解析結果のシミュレーション
      // 本当の自分を出せたときこそ、スコア（価値）は高まるという思想
      const score = Math.floor(Math.random() * (98 - 85 + 1)) + 85;
      setVitalScore(score);
      setAnalysisStatus('complete');
      
      setTimeout(() => {
        onAnalysisComplete({
          vitalityScore: score,
          voiceDataHash: '0x...', // 実際はIPFS等のハッシュ
          timestamp: new Date().toISOString()
        });
      }, 2500);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-white">
      <h2 className="text-xl font-bold mb-2 tracking-widest text-[#C89F53]">
        PHASE 2: VITAL PROOF
      </h2>
      
      {/* どんな感情も受け入れるメッセージ */}
      <p className="text-sm text-gray-400 mb-6 font-light text-center max-w-md">
        アファメーション、愚痴、喜び、あるいは沈黙。<br/>
        <strong className="text-white">今のあなたの「ありのまま」を5秒間記録します。</strong><br/>
        その全てが、価値ある資産になります。
      </p>

      {/* --- Random Topic Suggestion --- */}
      <div className="mb-6 p-4 bg-white/5 border border-[#C89F53]/30 rounded-lg max-w-lg text-center min-h-[80px] flex flex-col justify-center">
        <p className="text-xs text-[#C89F53] mb-1">PROMPT (ヒント)</p>
        <p className="text-lg italic font-serif text-white/90">
          "{randomTopic}"
        </p>
      </div>

      {/* --- Visualizer Canvas --- */}
      <div className="relative w-full max-w-md h-32 bg-black/50 rounded-lg border border-[#333] overflow-hidden mb-6">
        <canvas ref={canvasRef} width={500} height={128} className="w-full h-full"/>
        
        {analysisStatus === 'analyzing' && (
           <div className="absolute inset-0 flex items-center justify-center bg-black/70">
             <p className="text-[#C89F53] animate-pulse">Accepting your truth... (受容中)</p>
           </div>
        )}

        {analysisStatus === 'complete' && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
             <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Proof of Life</p>
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
                <p className="text-xl text-white font-bold">受け取りました。</p>
             </motion.div>
           </div>
        )}
      </div>

      {analysisStatus === 'idle' && (
        <button
          onClick={startRecording}
          className="px-8 py-3 rounded-full bg-[#C89F53] text-black font-bold hover:bg-[#b08b45] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(200,159,83,0.4)]"
        >
          <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
          REC (5s)
        </button>
      )}

      {analysisStatus === 'recording' && (
        <p className="text-[#C89F53] animate-pulse font-mono text-lg font-bold">
          Listening...
        </p>
      )}
    </div>
  );
};

export default VoiceHealthModule;