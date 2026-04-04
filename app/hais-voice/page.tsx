'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import VoiceScanner from '@/components/VoiceScanner';
import SyncProposal from '@/components/SyncProposal';
import { useSyncProposal } from '@/hooks/useSyncProposal';

/**
 * CIVILIZATION OS - HAIS Neural Interface Page
 * ユーザーの「痛み」をスキャンし、大脳(CrewAI)へ送信する専用ゲートウェイ
 * 移植: 黄金基準への回帰（SyncProposal）をコンテキスト内に統合
 */
export default function HaisVoicePage() {
  // ✅ wagmiからアドレスを取得
  const { address, isConnected } = useAccount();

  // ✅ 薩摩ロジック: DBから「茹でガエルの罠」状態を監視
  const { proposal, handleSync } = useSyncProposal(address || "");

  return (
    <main style={styles.container}>
      {/* 背景エフェクト: Jobsの審美眼に基づく、スキャンへの没入感 */}
      <div style={styles.glowEffect} />

      <div style={styles.headerWrap}>
        <p style={styles.brandTag}>Re-Verse Civilization OS</p>
        <h1 style={styles.title}>Neural State Scan</h1>
        <p style={styles.subTitle}>ポリヴェーガル理論に基づく生体解析</p>
      </div>

      {/* 統合されたVoiceScanner: 
          ここでスキャンが完了し、DBの omegaScore が低下した瞬間に、
          裏側で isTrapped フラグが立つ仕組みが必要。 */}
      <div style={styles.scannerWrapper}>
        <VoiceScanner />
      </div>

      {/* ★ 移植された「救済の波紋」
        isConnected かつ proposal.proposedSync が true の時のみ出現。
        スキャンの結果、本来の自分から乖離したユーザーを静かに誘う。
      */}
      {isConnected && (
        <SyncProposal
          proposed={proposal?.proposedSync || false}
          reason={proposal?.syncReasonJa}
          onSync={handleSync}
        />
      )}

      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2026 Limelien Inc. | Care Capitalism Protocol</p>
      </footer>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: '#0a0c12',
    color: '#e8eaf0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '"DM Sans", sans-serif',
    position: 'relative', // SyncProposalの基準
    overflow: 'hidden',
  },
  glowEffect: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(64, 150, 255, 0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  headerWrap: {
    marginBottom: '40px',
    textAlign: 'center',
    zIndex: 10,
  },
  brandTag: {
    color: '#555c74',
    fontFamily: '"DM Mono", monospace',
    fontSize: '10px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    marginBottom: '8px',
  },
  title: {
    fontSize: '36px',
    fontFamily: '"DM Serif Display", serif',
    fontWeight: 'normal',
    marginBottom: '4px',
    background: 'linear-gradient(180deg, #fff 0%, #8a94ad 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subTitle: {
    fontSize: '12px',
    color: '#555c74',
    letterSpacing: '0.05em',
  },
  scannerWrapper: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 10,
  },
  footer: {
    marginTop: '60px',
    zIndex: 10,
  },
  footerText: {
    fontSize: '9px',
    color: '#333b4d',
    fontFamily: '"DM Mono", monospace',
    letterSpacing: '0.1em',
  }
};