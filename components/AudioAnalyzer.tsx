import { useEffect, useRef } from 'react';

export default function AudioAnalyzer({ analyser, scanning }: { analyser: AnalyserNode | null, scanning: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!scanning || !analyser || !canvasRef.current) return;

    const drawWave = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx || !canvas) return;

      const W = canvas.width, H = canvas.height;
      const buf = new Uint8Array(analyser.fftSize);
      analyser.getByteTimeDomainData(buf);

      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = 'rgba(232,184,109,0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      buf.forEach((v, i) => {
        const x = (i / buf.length) * W;
        const y = (v / 255) * H;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();

      animIdRef.current = requestAnimationFrame(drawWave);
    };

    drawWave();
    return () => { if (animIdRef.current) cancelAnimationFrame(animIdRef.current); };
  }, [scanning, analyser]);

  if (!scanning) return null;

  return <canvas ref={canvasRef} width={440} height={48} style={{ width: '100%', height: '48px', borderRadius: '8px', background: '#1a1f2e', display: 'block', border: '1px solid rgba(255,255,255,0.07)' }} />;
}