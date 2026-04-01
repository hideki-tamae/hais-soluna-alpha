'use client';

import VoiceScanner from '@/components/VoiceScanner';

/**
 * CIVILIZATION OS - HAIS Neural Interface Page
 * ユーザーの「痛み」をスキャンし、大脳(CrewAI)へ送信する専用ゲートウェイ
 */
export default function HaisVoicePage() {
  return (
    <main style={styles.container}>
      <div style={styles.headerWrap}>
        <p style={styles.brandTag}>Re-Verse Civilization OS</p>
        <h1 style={styles.title}>Neural State Scan</h1>
        <p style={styles.subTitle}>ポリヴェーガル理論に基づく生体解析</p>
      </div>
      
      {/* 統合されたVoiceScanner: Web3, DB保存, Python API通信のすべてを内包 */}
      <div style={styles.scannerWrapper}>
        <VoiceScanner />
      </div>

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
  },
  headerWrap: {
    marginBottom: '40px',
    textAlign: 'center',
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
  },
  footer: {
    marginTop: '60px',
  },
  footerText: {
    fontSize: '9px',
    color: '#333b4d',
    fontFamily: '"DM Mono", monospace',
    letterSpacing: '0.1em',
  }
};