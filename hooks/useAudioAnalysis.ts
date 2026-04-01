import { useState, useRef, useEffect } from 'react';
import { analyzeAudioData } from '../utils/audioProcessor';

export const useAudioAnalysis = () => {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const [status, setStatus] = useState('スタンバイ完了');
  const [results, setResults] = useState<any>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!scanning) {
      setCountdown(10);
      return;
    }
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? (clearInterval(timer), 10) : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [scanning]);

  const startScan = async (location: string, condition: string, onComplete: (payload: any) => void) => {
    if (!location || !condition) {
      setStatus('現在地とコンディションを入力してください');
      return;
    }

    try {
      setScanning(true);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = audioCtx;
      if (audioCtx.state === 'suspended') await audioCtx.resume();

      // =========================================================================
      // AUDIO CONSTRAINTS: ノイズキャンセリング強制起動 (マクドナルド・人混み対策)
      // =========================================================================
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { 
          noiseSuppression: true,   // BGMや雑音をブラウザ側で強力にカット（変更点）
          echoCancellation: true,   // 空間の反響音をカット（変更点）
          autoGainControl: false,   // ※重要: 声の微細な震え(Jitter/Shimmer)を潰さないためここは絶対にfalse
          channelCount: 1, 
          sampleRate: 44100 
        }
      });
      
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 4096;
      analyserRef.current = analyser;
      audioCtx.createMediaStreamSource(stream).connect(analyser);

      setStatus('「あーーー」と10秒間、一定の声で発声してください');
      setProgress(0);

      const samples: any[] = [];
      let steps = 0;
      const totalSteps = (10 * 1000) / 50;

      const iv = setInterval(() => {
        if (!analyserRef.current) return;
        const freq = new Uint8Array(analyser.frequencyBinCount);
        const time = new Float32Array(analyser.fftSize);
        analyser.getByteFrequencyData(freq);
        analyser.getFloatTimeDomainData(time);
        samples.push({ freq, time });

        steps++;
        setProgress(Math.round((steps / totalSteps) * 100));

        if (steps >= totalSteps) {
          clearInterval(iv);
          stream.getTracks().forEach(t => t.stop());
          setScanning(false);
          setStatus('音響バイオマーカーを解析中...');

          // 新しいエッジVAD搭載エンジンで純粋な ω を抽出
          const res = analyzeAudioData(samples, audioCtx.sampleRate, analyser.fftSize);
          setResults(res);
          setStatus('解析完了 / ANALYSIS COMPLETE');
          onComplete(res);
        }
      }, 50);
    } catch(e: any) {
      setScanning(false);
      setStatus(e.name === 'NotAllowedError' ? 'マイクのアクセスを許可してください' : `エラー: ${e.name}`);
    }
  };

  return { scanning, progress, countdown, status, results, startScan, analyserRef };
};