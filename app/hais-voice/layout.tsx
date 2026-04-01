'use client';
import { ReactNode, useState } from 'react';

export default function HAISLayout({ children }: { children: ReactNode }) {
  const [isLocked, setIsLocked] = useState(true);
  const [lockPassword, setLockPassword] = useState('');
  const [lockError, setLockError] = useState('');
  const [lockLoading, setLockLoading] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLockError('');
    setLockLoading(true);

    const correctPassword = 'inazumahideki2030';
    
    if (lockPassword === correctPassword) {
      setIsLocked(false);
      setLockPassword('');
    } else {
      setLockError('パスワードが正しくありません');
      setLockPassword('');
    }

    setLockLoading(false);
  };

  if (isLocked) {
    return (
      <div style={styles.lockContainer}>
        <style>{`
          @keyframes pulse100 {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes rotateSmooth {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          .hais-logo {
            animation: float 4s ease-in-out infinite;
          }
          .hais-inner-circle {
            animation: rotateSmooth 20s linear infinite;
          }
          .hais-outer-circle {
            animation: rotateSmooth 30s linear infinite reverse;
          }
        `}</style>

        <div style={styles.bgGradient}></div>

        <div style={styles.lockScreen}>
          <div style={styles.logoSection}>
            <div style={styles.logo} className="hais-logo">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(232,184,109,1)" />
                    <stop offset="100%" stopColor="rgba(184,140,70,0.8)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* 外層（背側迷走神経 - 最古） */}
                <g className="hais-outer-circle" filter="url(#glow)">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="url(#goldGradient)" strokeWidth="0.8" opacity="0.3" />
                  <circle cx="40" cy="40" r="35" fill="none" stroke="url(#goldGradient)" strokeWidth="0.4" opacity="0.15" />
                </g>

                {/* 中層（交感神経） */}
                <circle cx="40" cy="40" r="26" fill="none" stroke="rgba(232,184,109,0.6)" strokeWidth="1" opacity="0.6" />
                <circle cx="40" cy="40" r="25.5" fill="none" stroke="rgba(232,184,109,0.3)" strokeWidth="0.5" opacity="0.3" />

                {/* 内層（腹側迷走神経 - 最新） */}
                <g className="hais-inner-circle">
                  <circle cx="40" cy="40" r="16" fill="none" stroke="url(#goldGradient)" strokeWidth="1.2" />
                  <circle cx="40" cy="40" r="14" fill="none" stroke="rgba(232,184,109,0.5)" strokeWidth="0.6" opacity="0.8" />
                </g>

                {/* 中央コア */}
                <circle cx="40" cy="40" r="8" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" filter="url(#glow)" />
                <circle cx="40" cy="40" r="6" fill="rgba(232,184,109,0.2)" />
                <circle cx="40" cy="40" r="3.5" fill="url(#goldGradient)" />

                {/* 神経繊維のネットワーク */}
                <path d="M 40 16 Q 38 24 40 32" stroke="rgba(232,184,109,0.4)" strokeWidth="0.8" fill="none" opacity="0.6" />
                <path d="M 40 48 Q 42 56 40 64" stroke="rgba(232,184,109,0.4)" strokeWidth="0.8" fill="none" opacity="0.6" />
                <path d="M 16 40 Q 24 38 32 40" stroke="rgba(232,184,109,0.4)" strokeWidth="0.8" fill="none" opacity="0.6" />
                <path d="M 48 40 Q 56 42 64 40" stroke="rgba(232,184,109,0.4)" strokeWidth="0.8" fill="none" opacity="0.6" />

                <path d="M 22 22 L 32 32" stroke="rgba(232,184,109,0.3)" strokeWidth="0.7" fill="none" opacity="0.4" />
                <path d="M 58 22 L 48 32" stroke="rgba(232,184,109,0.3)" strokeWidth="0.7" fill="none" opacity="0.4" />
                <path d="M 22 58 L 32 48" stroke="rgba(232,184,109,0.3)" strokeWidth="0.7" fill="none" opacity="0.4" />
                <path d="M 58 58 L 48 48" stroke="rgba(232,184,109,0.3)" strokeWidth="0.7" fill="none" opacity="0.4" />

                {/* 活性化ポイント */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 40 + 22 * Math.cos(rad);
                  const y = 40 + 22 * Math.sin(rad);
                  return (
                    <g key={angle}>
                      <circle cx={x} cy={y} r="1.5" fill="rgba(232,184,109,0.8)" />
                      <circle cx={x} cy={y} r="2.5" fill="none" stroke="rgba(232,184,109,0.4)" strokeWidth="0.6" opacity="0.5" />
                    </g>
                  );
                })}
              </svg>
            </div>
            <h1 style={styles.lockTitle}>HAIS</h1>
            <p style={styles.lockSubtitle}>VOICE SCANNER · V3.0</p>
          </div>

          <div style={styles.lockInfo}>
            <div style={styles.lockIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(232,184,109,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1" fill="rgba(232,184,109,0.9)" />
              </svg>
            </div>
            <h2 style={styles.lockSecurityTitle}>システム保護中</h2>
            <p style={styles.lockSecurityDesc}>パスワードを入力してアクセス</p>
          </div>

          <form onSubmit={handleUnlock} style={styles.lockForm}>
            <div style={styles.lockInputWrapper}>
              <input
                type="password"
                placeholder="パスワード"
                value={lockPassword}
                onChange={(e) => {
                  setLockPassword(e.target.value);
                  setLockError('');
                }}
                disabled={lockLoading}
                style={{
                  ...styles.lockInput,
                  ...(lockError && styles.lockInputError),
                  ...(!lockLoading ? {} : { opacity: 0.6, cursor: 'not-allowed' }),
                }}
                autoFocus
              />
            </div>

            {lockError && (
              <div style={styles.lockErrorMessage}>
                <span style={styles.lockErrorIcon}>⚠️</span>
                {lockError}
              </div>
            )}

            <button
              type="submit"
              disabled={lockLoading || !lockPassword}
              style={{
                ...styles.lockButton,
                ...(lockLoading || !lockPassword ? styles.lockButtonDisabled : styles.lockButtonHover),
              }}
            >
              {lockLoading ? 'チェック中...' : 'アンロック'}
            </button>
          </form>

          <div style={styles.lockFooter}>
            <p style={styles.lockFooterText}>ACES CARE HUB JAPAN</p>
            <p style={styles.lockFooterSmall}>© 2026 All Rights Reserved</p>
          </div>
        </div>
      </div>
    );
  }

  // アンロック後はchildrenを表示
  return <>{children}</>;
}

// ============================================
// スタイル定義
// ============================================

const styles: any = {
  lockContainer: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0c12',
    fontFamily: "'Noto Sans JP', sans-serif",
    overflow: 'hidden',
  },

  bgGradient: {
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(ellipse, rgba(232,184,109,0.04) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },

  lockScreen: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '420px',
    width: '90%',
    padding: '60px 40px',
    background: 'rgba(17,21,32,0.8)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '20px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 0 40px rgba(232,184,109,0.08)',
    textAlign: 'center',
  },

  logoSection: {
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },

  logo: {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px',
  },

  lockTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: '36px',
    color: '#e8eaf0',
    margin: 0,
    fontWeight: 400,
    letterSpacing: '0.02em',
  },

  lockSubtitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '10px',
    color: '#555c74',
    margin: 0,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    fontWeight: 300,
  },

  lockInfo: {
    marginBottom: '40px',
    padding: '28px 20px',
    background: 'rgba(232,184,109,0.06)',
    border: '1px solid rgba(232,184,109,0.1)',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },

  lockIcon: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(232,184,109,0.12)',
    border: '1px solid rgba(232,184,109,0.2)',
    borderRadius: '12px',
  },

  lockSecurityTitle: {
    fontFamily: "'Noto Sans JP', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    color: '#e8b86d',
    margin: 0,
    letterSpacing: '0.02em',
  },

  lockSecurityDesc: {
    fontFamily: "'Noto Sans JP', sans-serif",
    fontSize: '12px',
    color: '#8b91a8',
    margin: 0,
    lineHeight: 1.5,
    fontWeight: 300,
  },

  lockForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },

  lockInputWrapper: {
    position: 'relative',
  },

  lockInput: {
    width: '100%',
    padding: '14px 16px',
    background: '#1a1f2e',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '12px',
    color: '#e8eaf0',
    fontFamily: "'DM Mono', monospace",
    fontSize: '14px',
    fontWeight: 300,
    letterSpacing: '0.05em',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    WebkitAppearance: 'none',
  },

  lockInputError: {
    borderColor: 'rgba(232,109,109,0.5)',
    background: 'rgba(232,109,109,0.06)',
    boxShadow: '0 0 0 3px rgba(232,109,109,0.06)',
  },

  lockErrorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 12px',
    background: 'rgba(232,109,109,0.06)',
    border: '1px solid rgba(232,109,109,0.2)',
    borderRadius: '10px',
    fontFamily: "'Noto Sans JP', sans-serif",
    fontSize: '12px',
    color: '#e86d6d',
    fontWeight: 300,
  },

  lockErrorIcon: {
    fontSize: '14px',
  },

  lockButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, rgba(232,184,109,0.2) 0%, rgba(232,184,109,0.08) 100%)',
    border: '1px solid rgba(232,184,109,0.3)',
    borderRadius: '12px',
    color: '#e8b86d',
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    WebkitAppearance: 'none',
  },

  lockButtonHover: {
    background: 'linear-gradient(135deg, rgba(232,184,109,0.3) 0%, rgba(232,184,109,0.15) 100%)',
    borderColor: 'rgba(232,184,109,0.5)',
    boxShadow: '0 0 20px rgba(232,184,109,0.1)',
    cursor: 'pointer',
  },

  lockButtonDisabled: {
    background: 'rgba(232,184,109,0.08)',
    borderColor: 'rgba(232,184,109,0.15)',
    color: '#555c74',
    cursor: 'not-allowed',
    opacity: 0.6,
  },

  lockFooter: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    textAlign: 'center',
  },

  lockFooterText: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '9px',
    color: '#555c74',
    margin: '0 0 4px 0',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    fontWeight: 300,
  },

  lockFooterSmall: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '8px',
    color: '#555c74',
    margin: 0,
    opacity: 0.5,
    fontWeight: 300,
  },
};
