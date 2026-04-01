'use client';

import { useState, useEffect } from 'react';
import { useAudioAnalysis } from '../hooks/useAudioAnalysis';
import { useCareBridge } from '../hooks/useCareBridge'; // Web3 bridge
import { analyzePolyvagalState } from '../src/utils/polyvagalScoring'; // ★パスを修正
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
    desc: '環境ノイズ（BGMや周囲の話し声）があなたの声の信号を上回っています。正確な生体解析ができないため、静かな場所へ移動して再度スキャンしてください。',
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
  
  // 新しい正規化ロジックの解析結果を保持
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUser(params.get('user') || 'guest');
  }, []);

  const handleComplete = (res: any) => {
    // 1. 新しいポリヴェーガルロジックで正規化＆スコアリング
    const normalization = analyzePolyvagalState({
      jitter: res.jitter,
      shimmer: res.shimmer,
      hnr: res.hnr,
    });
    console.log('📊 Polyvagal Analysis Result:', normalization);
    setAnalysisResult(normalization);

    // 2. GASへの送信（ログ用）
    const payload = {
      user,
      f0Hz: res.f0.toFixed(2),
      jitterPct: res.jitter.toFixed(3),
      shimmerPct: res.shimmer.toFixed(3),
      hnrDb: res.hnr.toFixed(2),
      neuralState: normalization.dominantState, // 新しい判定結果を使用
      location,
      condition,
      version: 'v3.1 Polyvagal-Normalized',
      timestamp: normalization.timestamp,
    };

    fetch(GAS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(err => console.error('GAS送信エラー:', err));
  };

  // HAIS(DB)への記録 (旧APIの互換性を維持しつつ拡張データを送信)
  const saveToHAIS = async (walletAddress: string, analysis: any, rawMetrics: any) => {
    setIsSavingToDB(true);
    try {
      const response = await fetch('/api/hais/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: walletAddress,
          omegaScore: analysis.omegaScore,
          neuralState: analysis.dominantState, // 旧API互換
          dominantState: analysis.dominantState,
          ventralScore: analysis.ventralScore,
          sympatheticScore: analysis.sympatheticScore,
          dorsalScore: analysis.dorsalScore,
          confidence: analysis.confidence,
          f0Hz: rawMetrics.f0,
          jitterPct: rawMetrics.jitter,
          shimmerPct: rawMetrics.shimmer,
          hnrDb: rawMetrics.hnr,
          timestamp: analysis.timestamp,
        }),
      });
      const data = await response.json();
      console.log('✅ HAIS Record Saved:', data);
    } catch (error) {
      console.error('❌ Failed to save to HAIS:', error);
    } finally {
      setIsSavingToDB(false);
    }
  };

  const handleMint = async () => {
    if (!analysisResult || !address || !results) {
      alert('ウォレットが接続されていないか、解析結果がありません。');
      return;
    }

    try {
      const omegaScore = analysisResult.omegaScore;
      console.log(`🚀 Minting ${omegaScore} SLNA for ${address}`);

      // 1. ブロックチェーンへの刻印
      const success = await mintProofOfCare(omegaScore);

      // 2. ミント成功時にHAIS(DB)へ記録
      if (success) {
        setMinted(true);
        await saveToHAIS(address, analysisResult, results);
      }
    } catch (error) {
      console.error('❌ Mint failed:', error);
      alert('ミント処理に失敗しました。コンソールを確認してください。');
    }
  };

  const s = analysisResult ? STATES[analysisResult.dominantState] : null;

  return (
    <div style={styles.page}>
      <header style={styles.hdr}>
        <div style={styles.hdrEyebrow}>ACES CARE HUB JAPAN</div>
        <div style={styles.hdrTitle}>HAIS</div>
        <div style={styles.hdrSub}>VOICE SCANNER · V3.1</div>
        <div style={styles.userPill}>
          <div style={styles.pulseDot}></div>
          <span>{user}</span>
        </div>
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

      <div style={styles.card}>
        <div style={styles.scannerWrap}>
          <button onClick={() => startScan(location, condition, handleComplete)} disabled={scanning} style={{ ...styles.orbShell, opacity: scanning ? 0.7 : 1 }}>
            <div style={{ ...styles.orbRing, ...(scanning && styles.orbRingActive) }}></div>
            <div style={{ ...styles.orbRing2, ...(scanning && styles.orbRing2Active) }}></div>
            <div style={{ ...styles.orbFace, ...(scanning && styles.orbFaceActive) }}>
              {scanning ? (
                <div style={styles.orbTimer}>{countdown}</div>
              ) : (
                <>
                  <div style={styles.orbLabel}>TAP TO SCAN</div>
                  <div style={styles.orbSub}>10秒間「あー」と発声</div>
                </>
              )}
            </div>
          </button>

          {scanning && (
            <div style={styles.progWrap}>
              <div style={styles.progRow}>
                <span>RECORDING</span>
                <span>{progress}%</span>
              </div>
              <div style={styles.progTrack}>
                <div style={{ ...styles.progFill, width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          <AudioAnalyzer analyser={analyserRef.current} scanning={scanning} />

          <div style={styles.statusTxt}>{status}</div>
        </div>
      </div>

      {analysisResult && s && (
        <div style={styles.results}>
          <div style={{ ...styles.resultStateCard, background: s.bg }}>
            <div style={{ color: s.color, fontSize: '10px', letterSpacing: '0.2em', marginBottom: '12px', fontFamily: "'DM Mono', monospace" }}>
              NEURAL STATE ANALYSIS
            </div>
            <div style={{ color: s.color, fontSize: '26px', fontFamily: "'DM Serif Display', serif", marginBottom: '6px', fontWeight: 300 }}>
              {s.name}
            </div>
            <div style={{ color: s.color, fontSize: '10px', letterSpacing: '0.15em', marginBottom: '16px', fontFamily: "'DM Mono', monospace" }}>
              {s.en}
            </div>
            <div style={{ fontSize: '13px', color: '#8b91a8', lineHeight: '1.9', marginBottom: '20px' }}>
              {s.desc}
            </div>

            {/* 新機能: ポリヴェーガルスコアの視覚化 */}
            <div style={styles.scoreRow}>
              <div style={styles.scoreItem}>
                <div style={styles.scoreLabel}>VENTRAL</div>
                <div style={{ ...styles.scoreBar, width: `${Math.max(10, analysisResult.ventralScore)}%` }}>
                  {analysisResult.ventralScore.toFixed(0)}
                </div>
              </div>
              <div style={styles.scoreItem}>
                <div style={styles.scoreLabel}>SYMPA</div>
                <div style={{ ...styles.scoreBar, width: `${Math.max(10, analysisResult.sympatheticScore)}%` }}>
                  {analysisResult.sympatheticScore.toFixed(0)}
                </div>
              </div>
              <div style={styles.scoreItem}>
                <div style={styles.scoreLabel}>DORSAL</div>
                <div style={{ ...styles.scoreBar, width: `${Math.max(10, analysisResult.dorsalScore)}%` }}>
                  {analysisResult.dorsalScore.toFixed(0)}
                </div>
              </div>
            </div>

            <button
              onClick={handleMint}
              disabled={isMinting || isSavingToDB || minted || analysisResult.dominantState === 'NOISE_DETECTED'}
              style={{
                ...styles.mintButton,
                borderColor: minted ? '#5ec984' : s.color,
                color: minted ? '#5ec984' : s.color,
                opacity: analysisResult.dominantState === 'NOISE_DETECTED' ? 0.3 : 1, // ノイズ時は半透明に
              }}
            >
              {analysisResult.dominantState === 'NOISE_DETECTED'
                ? 'MINT UNAVAILABLE (NOISE)'
                : isMinting
                  ? 'MINTING TO BLOCKCHAIN...'
                  : isSavingToDB
                    ? 'SAVING TO HAIS...'
                    : minted
                      ? `✓ MINTED ${analysisResult.omegaScore} SLNA`
                      : `CLAIM ${analysisResult.omegaScore.toFixed(1)} SLNA`}
            </button>
          </div>

          <div style={styles.metricsGrid}>
            <div style={styles.metricTile}>
              <div style={styles.metricLabel}>F0 · 基本周波数</div>
              <div style={styles.metricVal}>
                {results.f0.toFixed(1)}<span style={styles.metricUnit}>Hz</span>
              </div>
            </div>
            <div style={styles.metricTile}>
              <div style={styles.metricLabel}>JITTER · 周期ゆらぎ</div>
              <div style={styles.metricVal}>
                {results.jitter.toFixed(2)}<span style={styles.metricUnit}>%</span>
              </div>
            </div>
            <div style={styles.metricTile}>
              <div style={styles.metricLabel}>SHIMMER · 振幅ゆらぎ</div>
              <div style={styles.metricVal}>
                {results.shimmer.toFixed(2)}<span style={styles.metricUnit}>%</span>
              </div>
            </div>
            <div style={styles.metricTile}>
              <div style={styles.metricLabel}>HNR · 調波対雑音比</div>
              <div style={styles.metricVal}>
                {results.hnr.toFixed(2)}<span style={styles.metricUnit}>dB</span>
              </div>
            </div>
          </div>

          <div style={styles.metadataCard}>
            <div style={styles.metadataRow}>
              <span>Confidence</span>
              <span>{analysisResult.confidence.toFixed(1)}</span>
            </div>
            <div style={styles.metadataRow}>
              <span>Omega Score (SLNA)</span>
              <span>{analysisResult.omegaScore.toFixed(2)}</span>
            </div>
          </div>

          <div style={styles.disclaimerCard}>
            <p style={{ fontSize: '11px', color: '#555c74', lineHeight: 1.6, margin: 0 }}>
              本解析はポリヴェーガル理論に基づいた正規化スコアリングです。臨床診断ではありません。解析された神経状態（Ω）はブロックチェーンへ刻まれ、あなたのレジリエンス資産となります。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, any> = {
  page: { maxWidth: '480px', margin: '0 auto', padding: '0 20px 80px', background: '#0a0c12', color: '#e8eaf0', minHeight: '100vh', fontFamily: "'Noto Sans JP', sans-serif", position: 'relative' },
  hdr: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 0 40px', gap: '6px' },
  hdrEyebrow: { fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.22em', color: '#e8b86d', opacity: 0.8, textTransform: 'uppercase', fontWeight: 300 },
  hdrTitle: { fontFamily: "'DM Serif Display', serif", fontSize: '42px', color: '#e8eaf0', letterSpacing: '0.02em', lineHeight: 1, fontWeight: 400 },
  hdrSub: { fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#555c74', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 300 },
  userPill: { display: 'inline-flex', alignItems: 'center', gap: '7px', marginTop: '10px', padding: '6px 16px', background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '100px', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#8b91a8', fontWeight: 300 },
  pulseDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#5ec984', flexShrink: 0 },
  inputsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' },
  field: { display: 'flex', flexDirection: 'column' },
  fieldLabel: { fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: '#555c74', marginBottom: '7px', textTransform: 'uppercase', fontWeight: 300 },
  fieldInput: { width: '100%', background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '11px 14px', color: '#e8eaf0', fontFamily: "'Noto Sans JP', sans-serif", fontSize: '14px', fontWeight: 300, boxSizing: 'border-box' },
  card: { background: '#111520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', marginBottom: '12px', overflow: 'hidden' },
  scannerWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px 22px 32px', gap: '28px' },
  orbShell: { position: 'relative', width: '176px', height: '176px', cursor: 'pointer', border: 'none', background: 'transparent', padding: 0 },
  orbRing: { position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)', boxSizing: 'border-box' },
  orbRingActive: { borderColor: 'rgba(232,184,109,0.5)', boxShadow: '0 0 0 12px rgba(232,184,109,0.04), 0 0 40px rgba(232,184,109,0.08)' },
  orbRing2: { position: 'absolute', inset: '10px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)', boxSizing: 'border-box' },
  orbRing2Active: { borderColor: 'rgba(232,184,109,0.2)' },
  orbFace: { position: 'absolute', inset: '18px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #1a1f2e, #0a0c12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  orbFaceActive: { boxShadow: '0 0 0 8px rgba(232,184,109,0.03), 0 0 30px rgba(232,184,109,0.06)' },
  orbLabel: { fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#e8b86d', textTransform: 'uppercase' },
  orbSub: { fontSize: '10px', color: '#555c74' },
  orbTimer: { fontFamily: "'DM Serif Display', serif", fontSize: '54px', color: '#e8b86d' },
  progWrap: { width: '100%' },
  progRow: { display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#555c74', marginBottom: '6px' },
  progTrack: { height: '1px', background: 'rgba(255,255,255,0.07)' },
  progFill: { height: '100%', background: '#e8b86d' },
  statusTxt: { fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#555c74', textAlign: 'center' },
  resultStateCard: { padding: '28px 22px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '12px' },
  scoreRow: { display: 'flex', gap: '10px', marginBottom: '16px' },
  scoreItem: { flex: 1 },
  scoreLabel: { fontFamily: "'DM Mono', monospace", fontSize: '8px', color: '#555c74', marginBottom: '4px' },
  scoreBar: { height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#e8eaf0', fontFamily: "'DM Mono', monospace", transition: 'width 0.5s ease' },
  metricsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' },
  metricTile: { background: '#111520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px' },
  metricLabel: { fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#555c74' },
  metricVal: { fontFamily: "'DM Mono', monospace", fontSize: '22px' },
  metricUnit: { fontSize: '11px', color: '#555c74' },
  metadataCard: { background: '#111520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px' },
  metadataRow: { display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#8b91a8', marginBottom: '8px' },
  disclaimerCard: { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px 16px', marginBottom: '12px' },
  mintButton: { width: '100%', padding: '14px', background: 'transparent', border: '1px solid', borderRadius: '12px', fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s ease', marginTop: '10px' },
};