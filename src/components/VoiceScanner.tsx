'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { useAudioAnalysis } from '@/hooks/useAudioAnalysis';
import { useCareBridge } from '@/hooks/useCareBridge';
import { analyzePolyvagalState } from '@/utils/polyvagalScoring';
import AudioAnalyzer from '@/components/AudioAnalyzer';

const GAS_URL = 'https://script.google.com/macros/s/AKfycbx8yj8xo1ZHEtym5wcHf9FgEc3VYjo1bmN5vqFxdln8OdX2YNPuzoYrLBGualBWD9SXmQ/exec';
const HAIS_API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

const STATES: Record<string, any> = {
  VENTRAL: {
    name: '腹側迷走神経優位',
    en: 'VENTRAL VAGAL · 安全状態',
    color: '#5ec984',
    bg: 'rgba(94,201,132,0.06)',
    desc: '神経系が「安全」のシグナルを受け取っている状態です。社会的エンゲージメントシステムが活性化しています。',
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

export default function VoiceScanner({ onScanComplete }: { onScanComplete?: (payload: any) => void } = {}) {
  const [user, setUser] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [minted, setMinted] = useState(false);
  const [isSavingToDB, setIsSavingToDB] = useState(false);

  const [insight, setInsight] = useState<string | null>(null);
  const [tokenReward, setTokenReward] = useState<number | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  // 🆕 累計資産の状態管理
  const [totalEquity, setTotalEquity] = useState<number>(0);

  const { scanning, progress, countdown, status, results, startScan, analyserRef } = useAudioAnalysis();
  const { mintProofOfCare, isMinting, address } = useCareBridge();
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // 🆕 累計残高を再取得する関数（Torvalds的堅牢性：useCallbackでメモ化）
  const refreshEquity = useCallback(async (userId: string) => {
    if (!userId) return;
    try {
      const response = await fetch(`${HAIS_API_BASE}/api/hais/equity/${userId}`);
      const data = await response.json();
      if (data.status === 'success') {
        setTotalEquity(data.total_soluna);
      }
    } catch (error) {
      console.error('❌ Failed to fetch total equity:', error);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('user') || 'hideki';
    setUser(userId);
    refreshEquity(userId);
  }, [refreshEquity]);

  const fetchVoiceInsight = async (analysis: any, rawMetrics: any) => {
    setIsSavingToDB(true);
    try {
      const response = await fetch(`${HAIS_API_BASE}/api/hais/voice-insight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user,
          polyvagal_score: analysis.omegaScore,
          autonomic_state: analysis.dominantState.toLowerCase(),
          f0_hz: rawMetrics.f0,
          jitter_pct: rawMetrics.jitter,
          shimmer_pct: rawMetrics.shimmer,
          hnr_db: rawMetrics.hnr,
          condition: condition
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setInsight(data.insight);
        setTokenReward(data.care_token_reward);
        setAssessmentId(data.assessment_id);

        // 🆕 資産確定後、即座に累計残高をリフレッシュ
        refreshEquity(user);
      }
    } catch (error) {
      console.error('❌ Failed to fetch HAIS insight:', error);
    } finally {
      setIsSavingToDB(false);
    }
  };

  const handleComplete = (res: any) => {
    const normalization = analyzePolyvagalState({
      jitter: res.jitter,
      shimmer: res.shimmer,
      hnr: res.hnr,
    });
    setAnalysisResult(normalization);
    fetchVoiceInsight(normalization, res);

    const payload = {
      user,
      f0Hz: res.f0.toFixed(2),
      jitterPct: res.jitter.toFixed(3),
      shimmerPct: res.shimmer.toFixed(3),
      hnrDb: res.hnr.toFixed(2),
      neuralState: normalization.dominantState,
      location,
      condition,
      version: 'Satsuma-v2.2',
      timestamp: normalization.timestamp,
    };
    onScanComplete?.(payload);
  };

  const handleMint = async () => {
    if (!analysisResult || !address) return;
    try {
      const amountToClaim = tokenReward || analysisResult.omegaScore;
      const success = await mintProofOfCare(amountToClaim);
      if (success) setMinted(true);
    } catch (error) {
      console.error('❌ Mint failed:', error);
    }
  };

  const s = analysisResult ? STATES[analysisResult.dominantState] : null;

  return (
    <div style={styles.page}>
      <header style={styles.hdr}>
        <div style={styles.hdrEyebrow}>ACES CARE HUB JAPAN</div>
        <div style={styles.hdrTitle}>HAIS</div>
        <div style={styles.hdrSub}>VOICE INSIGHT · v2.2</div>

        {/* 🆕 累計資産表示（Jobs的審美：情報の階層化とタイポグラフィ） */}
        <div style={styles.equityCounter}>
          <span style={styles.equityLabel}>TOTAL CARE EQUITY</span>
          <span style={styles.equityValue}>
            {totalEquity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <small style={styles.equityUnit}>SLNA</small>
          </span>
        </div>
      </header>

      <div style={styles.inputsRow}>
        <div style={styles.field}>
          <label style={styles.fieldLabel}>LOCATION</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="SHIBUYA" style={styles.fieldInput} />
        </div>
        <div style={styles.field}>
          <label style={styles.fieldLabel}>CONDITION</label>
          <input type="text" value={condition} onChange={e => setCondition(e.target.value)} placeholder="FOCUS" style={styles.fieldInput} />
        </div>
      </div>

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

      {analysisResult && s && (
        <div style={styles.results}>
          <div style={{ ...styles.resultStateCard, background: s.bg }}>
            <div style={{ color: s.color, fontSize: '26px', fontFamily: "'DM Serif Display', serif" }}>{s.name}</div>
            <div style={{ fontSize: '13px', color: '#8b91a8', margin: '15px 0', lineHeight: 1.6 }}>{s.desc}</div>

            {insight && (
              <div style={styles.insightCard}>
                <div style={styles.insightHeader}>
                  <span style={styles.hdrEyebrow}>SYSTEM INSIGHT</span>
                </div>
                <div style={styles.insightText}>{insight}</div>
                {tokenReward && (
                  <div style={styles.rewardBadge}>
                    <span style={styles.rewardLabel}>CARE EQUITY REWARD</span>
                    <span style={styles.rewardValue}>+{tokenReward.toFixed(2)} SLNA</span>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleMint}
              disabled={isMinting || isSavingToDB || minted || analysisResult.dominantState === 'NOISE_DETECTED'}
              style={{ ...styles.mintButton, borderColor: minted ? '#5ec984' : s.color, color: minted ? '#5ec984' : s.color }}
            >
              {minted ? `✓ RECORDED IN LEDGER` : `CLAIM CARE EQUITY`}
            </button>
          </div>

          <div style={styles.metadataCard}>
            <div style={styles.metadataRow}>
              <span>Assessment ID</span>
              <span style={{ fontSize: '9px' }}>{assessmentId || 'Pending...'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, any> = {
  page: { maxWidth: '480px', margin: '0 auto', padding: '0 20px 80px', background: '#0a0c12', color: '#e8eaf0', minHeight: '100vh', fontFamily: "'Noto Sans JP', sans-serif" },
  hdr: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '52px 0 20px', gap: '6px' },
  hdrEyebrow: { fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.22em', color: '#e8b86d', opacity: 0.8, textTransform: 'uppercase' },
  hdrTitle: { fontFamily: "'DM Serif Display', serif", fontSize: '42px', color: '#e8eaf0', letterSpacing: '0.02em' },
  hdrSub: { fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#555c74', letterSpacing: '0.18em', textTransform: 'uppercase' },

  // 🆕 資産表示ユニットのスタイル（ゼロ・フリクションな美学）
  equityCounter: { marginTop: '24px', padding: '16px 32px', background: 'rgba(232,184,109,0.02)', border: '1px solid rgba(232,184,109,0.12)', borderRadius: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '200px' },
  equityLabel: { fontFamily: "'DM Mono', monospace", fontSize: '8px', color: '#e8b86d', letterSpacing: '0.15em', marginBottom: '6px', opacity: 0.7 },
  equityValue: { fontFamily: "'DM Serif Display', serif", fontSize: '32px', color: '#e8eaf0', lineHeight: 1.0 },
  equityUnit: { fontSize: '14px', color: '#555c74', marginLeft: '6px', fontWeight: 300, verticalAlign: 'baseline' },

  inputsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' },
  field: { display: 'flex', flexDirection: 'column' },
  fieldLabel: { fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.2em', color: '#555c74', marginBottom: '7px' },
  fieldInput: { width: '100%', background: '#1a1f2e', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '11px 14px', color: '#e8eaf0', fontSize: '13px' },
  card: { background: '#111520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', marginBottom: '12px', overflow: 'hidden' },
  scannerWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '36px 22px 32px', gap: '28px' },
  orbShell: { position: 'relative', width: '176px', height: '176px', cursor: 'pointer', border: 'none', background: 'transparent' },
  orbRing: { position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)' },
  orbRingActive: { borderColor: 'rgba(232,184,109,0.5)', boxShadow: '0 0 40px rgba(232,184,109,0.08)' },
  orbRing2: { position: 'absolute', inset: '10px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)' },
  orbRing2Active: { borderColor: 'rgba(232,184,109,0.2)' },
  orbFace: { position: 'absolute', inset: '18px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #1a1f2e, #0a0c12)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  orbFaceActive: { boxShadow: '0 0 30px rgba(232,184,109,0.06)' },
  orbLabel: { fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#e8b86d' },
  orbTimer: { fontFamily: "'DM Serif Display', serif", fontSize: '54px', color: '#e8b86d' },
  progWrap: { width: '100%', height: '1px', background: 'rgba(255,255,255,0.07)' },
  progFill: { height: '100%', background: '#e8b86d' },
  statusTxt: { fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#555c74' },
  resultStateCard: { padding: '28px 22px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)', marginBottom: '12px' },
  insightCard: { background: 'rgba(232,184,109,0.03)', border: '1px solid rgba(232,184,109,0.15)', borderRadius: '16px', padding: '20px', margin: '20px 0', textAlign: 'left' },
  insightHeader: { marginBottom: '12px' },
  insightText: { fontSize: '13px', lineHeight: '1.7', color: '#cbd5e1', whiteSpace: 'pre-wrap' },
  rewardBadge: { marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(94,201,132,0.1)', borderRadius: '8px', border: '1px solid rgba(94,201,132,0.2)' },
  rewardLabel: { fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#5ec984' },
  rewardValue: { fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#5ec984' },
  metadataCard: { background: '#111520', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px' },
  metadataRow: { display: 'flex', justifyContent: 'space-between', fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#8b91a8' },
  mintButton: { width: '100%', padding: '16px', background: 'transparent', border: '1px solid', borderRadius: '12px', fontFamily: "'DM Mono', monospace", fontSize: '12px', letterSpacing: '0.1em', cursor: 'pointer', transition: 'all 0.3s ease', marginTop: '10px' },
};