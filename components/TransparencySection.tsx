"use client";

import React from 'react';

const TransparencySection = () => {
  return (
    <section className="relative bg-black py-32 px-4 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ヘッダー */}
        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-6">
            Audit & Verification
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            技術的透明性の証明
          </h2>
          <p className="text-gray-400 text-lg md:text-xl tracking-wide max-w-3xl mx-auto font-light leading-relaxed">
            SOLUNAは、システム設計と運用状況をすべて公開する<br className="hidden md:inline" />
            <span className="text-cyan-200 font-medium border-b border-cyan-500/30">「完全透明型プロジェクト」</span>です。
          </p>
        </div>

        {/* 2カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Security System */}
          <div className="group relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-10 md:p-12 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_50px_-20px_rgba(6,182,212,0.3)]">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </span>
              Claimシステム概要と検証
            </h3>
            <p className="text-gray-400 text-sm mb-10 pl-16">
              Claimフロー（API, SC, DB）の詳細な検証ロジックを公開。
            </p>

            <ul className="space-y-6 mb-12">
              {[
                "HMAC署名、Nonce検証によるリプレイ攻撃防止",
                "GCP Secret Managerによる厳格な鍵管理",
                "データベースでの監査ログ記録 (Audit Logs)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-900/30 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <svg className="w-3 h-3 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-gray-200 font-light tracking-wide">{item}</span>
                </li>
              ))}
            </ul>

            {/* Card 1 ボタン: Security & Audit */}
            <a 
              href="/audit/SOLUNA_Security_Audit_202511.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 font-medium hover:bg-cyan-900/40 hover:border-cyan-400/60 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              内部セキュリティ検証レポート (PDF)
            </a>
          </div>

          {/* Card 2: Transaction Report */}
          <div className="group relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-10 md:p-12 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_50px_-20px_rgba(59,130,246,0.3)]">
            <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-4">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </span>
              トランザクション透明性レポート
            </h3>
            <p className="text-gray-400 text-sm mb-10 pl-16">
              すべてのClaimログを監査可能な形式でリアルタイム公開。
            </p>

            <div className="bg-black/40 rounded-xl p-6 mb-8 border border-white/10">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                <span className="text-gray-400 text-sm">System Status</span>
                <span className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]" />
                  Live / Auditable
                </span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3B82F6]" />
                  Claim総数 / 総発行量のリアルタイム値
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_#3B82F6]" />
                  Txハッシュによるオンチェーン検証
                </li>
              </ul>
            </div>

            {/* Card 2 ボタン: Transaction Logs (CSV) */}
            <a 
              href="/audit/SOLUNA_Tx_Log_20251204.csv"
              target="_blank"
              rel="noopener noreferrer" 
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-500 hover:to-indigo-500 transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Tx Log Download (CSV)
            </a>
            
            {/* Smart Contract Verification */}
            <div className="mt-4 text-center">
              <a 
                href="https://sepolia.etherscan.io/token/0x3F8125C9666014e7aB889d1c7689F18a38F6F4C5" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-blue-400 transition-colors border-b border-transparent hover:border-blue-400 pb-0.5"
              >
                Smart Contract Verification &rarr;
              </a>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;