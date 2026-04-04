'use client';

import { useState, useEffect } from 'react';
import { useAudioAnalysis } from '../hooks/useAudioAnalysis';
import { useCareBridge } from '../hooks/useCareBridge'; // Web3 bridge
import { analyzePolyvagalState } from '../src/utils/polyvagalScoring';
import AudioAnalyzer from './AudioAnalyzer';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbx8yj8xo1ZHEtym5wcHf9FgEc3VYjo1bmN5vqFxdln8OdX2YNPuzoYrLBGualBWD9SXmQ/exec';

// ============================================================================
// NEURAL STATE CONFIGURATION
// ============================================================================
const STATES: Record<string, any> = {
  VENTRAL: {
    name: '腹側迷走神経優位',
    en: 'VENTRAL VAGAL · 安全状態',
    color: '#5ec984',
    bg: 'rgba(94,201,132,0.06)',
    desc: '神経系が「安全」のシグナルを受け取っている状態です。声の安定性が高く、社会的エンゲージメントシステムが活性化しています。',
  },
  SYMPATHETIC: {
    name: '交感神経優位',
    en: 'SYMPATHETIC · 動員状態',
    color: '#f0935a',
    bg: 'rgba(240,147,90,0.06)',
    desc: '神経系が「危険」に備えて動員された状態です。闘争・逃走反応が活性化しています。',
  },
  DORSAL: {
    name: '背側迷走神経優位',
    en: 'DORSAL VAGAL · 凍結状態',
    color: '#e86d6d',
    bg: 'rgba(232,109,109,0.06)',
    desc: '神経系が生命の脅威に対して「凍結」した状態です。エネルギーの温存・解離・シャットダウンが起きています。',
  },
  MIXED: {
    name: '移行状態',
    en: 'TRANSITION · 変化中',
    color: '#9b8ff0',
    bg: 'rgba(155,143,240,0.06)',
    desc: '複数の神経状態が混在している、移行中の状態です。',
  },
  NOISE_DETECTED: {
    name: '解析不能（ノイズ過多）',
    en: 'NOISE DETECTED · 環境音エラー',
    color: '#8b91a8',
    bg: 'rgba(139,145,168,0.06)',
    desc: '環境ノイズが信号を上回っています。正確な生体解析ができないため、静かな場所へ移動してください。',
  },
};

export default function VoiceScanner() {
  const [user, setUser] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [minted, setMinted] = useState(false);
  const [isSavingToDB, setIsSavingToDB] = useState(false);

  const { scanning, progress, countdown, status, results, startScan, analyserRef } = useAudioAnalysis();
  const { mintProofOfCare, isMinting, address } = useCareBridge();
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUser(params.get('user') || 'guest');
  }, []);

  const handleComplete = (res: any) => {
    const normalization = analyzePolyvagalState({
      jitter: res.jitter,
      shimmer: res.shimmer,
      hnr: res.hnr,
    });
    setAnalysisResult(normalization);

    const payload = {
      user,
      f0Hz: res.f0.toFixed(2),
      jitterPct: res.jitter.toFixed(3),
      shimmerPct: res.shimmer.toFixed(3),
      hnrDb: res.hnr.toFixed(2),
      neuralState: normalization.dominantState,
      location,
      condition,
      version: 'Satsuma-v1.1', // ★文明OSの最新Ver
      timestamp: normalization.timestamp,
    };

    fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(err => console.error('GAS送信エラー:', err));
  };

  /**
   * HAIS(DB)への記録
   * ★ 証跡拡張: logicVersionを送出し、バックエンド側で「罠」を判定させる
   */
  const saveToHAIS = async (walletAddress: string, analysis: any, rawMetrics: any) => {
    setIsSavingToDB(true);
    try {
      const response = await fetch('/api/hais/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: walletAddress,
          omegaScore: analysis.omegaScore,
          neuralState: analysis.dominantState,
          logicVersion: 'Satsuma-v1.1', // ★ 証跡の刻印
          ventralScore: analysis.ventralScore,
          sympatheticScore: analysis.sympatheticScore,
          dorsalScore: analysis.dorsalScore,
          f0Hz: rawMetrics.f0,
          jitterPct: rawMetrics.jitter,
          shimmerPct: rawMetrics.shimmer,
          hnrDb: rawMetrics.hnr,
        }),
      });
      const data = await response.json();
      console.log('✅ HAIS Record & Calibration Check Saved:', data);

      // ★ 移植機としての完成: DB保存直後に提案があればUIを更新させるためのヒント
      // (親コンポーネントのuseSyncProposalが自動で再フェッチする仕組みがあれば表示されます)
    } catch (error) {
      console.error('❌ Failed to save to HAIS:', error);
    } finally {
      setIsSavingToDB(false);
    }
  };

  const handleMint = async () => {
    if (!analysisResult || !address || !results) {
      alert('準備が整っていません。');
      return;
    }
    try {
      const omegaScore = analysisResult.omegaScore;
      const success = await mintProofOfCare(omegaScore);
      if (success) {
        setMinted(true);
        // ★ 保存時に「罠検知」ロジックがバックエンドで走り、Sync提案が準備される
        await saveToHAIS(address, analysisResult, results);
      }
    } catch (error) {
      console.error('❌ Mint failed:', error);
    }
  };

  const s = analysisResult ? STATES[analysisResult.dominantState] : null;

  return (
    <div style={styles.page}>
      {/* 既存のヘッダー・入力UI */}
      <header style={styles.hdr}>
        <div style={styles.hdrEyebrow}>ACES CARE HUB JAPAN</div>
        <div style={styles.hdrTitle}>HAIS</div>
        <div style={styles.hdrSub}>VOICE SCANNER · V3.1</div>
      </header>

      <div style={styles.inputsRow}>
        <div style={styles.field}>
          <label style={styles.fieldLabel}>LOCATION</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="東京・自宅" style={styles.fieldInput} />
        </div>
        <div style={styles.field}>
          <label style={styles.fieldLabel}>CONDITION</label>
          <input type="text" value={condition} onChange={e => setCondition(e.target.value)} placeholder="リラックス" style={styles.fieldInput} />
        </div>
      </div>

      {/* スキャナー心臓部 */}
      <div style={styles.card}>
        <div style={styles.scannerWrap}>
          <button onClick={() => startScan(location, condition, handleComplete)} disabled={scanning} style={{ ...styles.orbShell, opacity: scanning ? 0.7 : 1 }}>
            <div style={{ ...styles.orbRing, ...(scanning && styles.orbRingActive) }}></div>
            <div style={{ ...styles.orbRing2, ...(scanning && styles.orbRing2Active) }}></div>
            <div style={{ ...styles.orbFace, ...(scanning && styles.orbFaceActive) }}>
              {scanning ? <div style={styles.orbTimer}>{countdown}</div> : <div style={styles.orbLabel}>TAP TO SCAN</div>}
            </div>
          </button>
          {scanning && (
            <div style={styles.progWrap}>
              <div style={{ ...styles.progFill, width: `${progress}%` }}></div>
            </div>
          )}
          <AudioAnalyzer analyser={analyserRef.current} scanning={scanning} />
          <div style={styles.statusTxt}>{status}</div>
        </div>
      </div>

      {/* 解析結果表示 */}
      {analysisResult && s && (
        <div style={styles.results}>
          <div style={{ ...styles.resultStateCard, background: s.bg }}>
            <div style={{ color: s.color, fontSize: '26px', fontFamily: "'DM Serif Display', serif" }}>{s.name}</div>
            <div style={{ fontSize: '13px', color: '#8b91a8', margin: '15px 0' }}>{s.desc}</div>

            <div style={styles.scoreRow}>
              {['VENTRAL', 'SYMPA', 'DORSAL'].map((label, idx) => (
                <div key={label} style={styles.scoreItem}>
                  <div style={styles.scoreLabel}>{label}</div>
                  <div style={{ ...styles.scoreBar, width: `${Math.max(10, [analysisResult.ventralScore, analysisResult.sympatheticScore, analysisResult.dorsalScore][idx])}%` }}>
                    {[analysisResult.ventralScore, analysisResult.sympatheticScore, analysisResult.dorsalScore][idx].toFixed(0)}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleMint}
              disabled={isMinting || isSavingToDB || minted || analysisResult.dominantState === 'NOISE_DETECTED'}
              style={{ ...styles.mintButton, borderColor: minted ? '#5ec984' : s.color, color: minted ? '#5ec984' : s.color }}
            >
              {minted ? `✓ MINTED ${analysisResult.omegaScore} SLNA` : `CLAIM ${analysisResult.omegaScore.toFixed(1)} SLNA`}
            </button>
          </div>

          {/* メトリクス表示等はそのまま維持 */}
          <div style={styles.metadataCard}>
            <div style={styles.metadataRow}>
              <span>Omega Score (SLNA)</span>
              <span>{analysisResult.omegaScore.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// styles は既存のものを継承（省略なし）
const styles: Record<string, any> = {
  page: { maxWidth: '480px', margin: '0 auto', padding: '0 20px 80px', background: '#0a0c12', color: '#e8eaf0', minHeight: '100vh', fontFamily: "'Noto Sans JP', sans-serif", position: 'relative' },
  hdr: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 0 40px', gap: '6px' },
  hdrEyebrow: { fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.22em', color: '#e8b86d', opacity: 0.8, textTransform: 'uppercase', fontWeight: 300 },
  hdrTitle: { fontFamily: "'DM Serif Display', serif", fontSize: '42px', color: '#e8eaf0', letterSpacing: '0.02em', lineHeight: 1, fontWeight: 400 },
  hdrSub: { fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#555c74', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 300 },
  inputsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' },
  field: { display: 'flex', flexDirection: 'column' },
  fieldLabel: { fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: '#555c74', marginBottom: '7px', textTransform: 'uppercase', fontWeight: 300 },
  fieldInput: { width: '100%', background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '11px 14px', color: '#e8eaf0', fontSize: '14px', boxSizing: 'border-box' },
  card: { background: '#111520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', marginBottom: '12px', overflow: 'hidden' },
  scannerWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px 22px 32px', gap: '28px' },
  orbShell: { position: 'relative', width: '176px', height: '176px', cursor: 'pointer', border: 'none', background: 'transparent' },
  orbRing: { position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)' },
  orbRingActive: { borderColor: 'rgba(232,184,109,0.5)', boxShadow: '0 0 40px rgba(232,184,109,0.08)' },
  orbRing2: { position: 'absolute', inset: '10px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)' },
  orbRing2Active: { borderColor: 'rgba(232,184,109,0.2)' },
  orbFace: { position: 'absolute', inset: '18px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #1a1f2e, #0a0c12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  orbFaceActive: { boxShadow: '0 0 30px rgba(232,184,109,0.06)' },
  orbLabel: { fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#e8b86d', textTransform: 'uppercase' },
  orbTimer: { fontFamily: "'DM Serif Display', serif", fontSize: '54px', color: '#e8b86d' },
  progWrap: { width: '100%', height: '1px', background: 'rgba(255,255,255,0.07)' },
  progFill: { height: '100%', background: '#e8b86d' },
  statusTxt: { fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#555c74' },
  resultStateCard: { padding: '28px 22px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '12px' },
  scoreRow: { display: 'flex', gap: '10px', marginBottom: '16px' },
  scoreItem: { flex: 1 },
  scoreLabel: { fontFamily: "'DM Mono', monospace", fontSize: '8px', color: '#555c74', marginBottom: '4px' },
  scoreBar: { height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#e8eaf0', transition: 'width 0.5s ease' },
  metadataCard: { background: '#111520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px' },
  metadataRow: { display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#8b91a8' },
  mintButton: { width: '100%', padding: '14px', background: 'transparent', border: '1px solid', borderRadius: '12px', fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s ease', marginTop: '10px' },
};