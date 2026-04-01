"use client";
import React from "react";

// PDFリンクの定数は不要になりましたが、コードの整合性のため残します。

const PolicySection = () => {
  return (
    <section className="relative bg-black py-24 md:py-32 px-4 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* メインカード (Glassmorphism) */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden relative">
          {/* カード内の背景光 */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-center mb-16 relative z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold tracking-widest uppercase mb-6">
              Social Implementation
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-emerald-100 to-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              政策提言：<br className="md:hidden" />SOLUNA Protocol
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light mb-10">
              「助けて」と言えない。<br className="md:hidden" />
              制度の網にかからない。

              <br className="md:hidden" /><br className="md:hidden" />

              <span className="inline-block">トリプル・アイソレーションにある家庭へ、</span><br className="md:hidden" />
              <span className="inline-block">Web3技術で支援を届ける。</span>

              <br className="md:hidden" /><br className="md:hidden" />

              これは慈善事業ではなく、<br className="md:hidden" />
              <span className="inline-block whitespace-nowrap">
                <span className="text-white font-medium border-b border-emerald-500/50">国家OSの再設計図</span>
                です。
              </span>
            </p>

            {/* 科学的根拠 & 画像エリア */}
            <div className="max-w-4xl mx-auto bg-black/40 border border-emerald-500/20 rounded-xl overflow-hidden mb-12">
              <div className="p-6 border-b border-emerald-500/10 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                <div className="p-3 bg-emerald-900/30 rounded-full text-emerald-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-emerald-100 font-light">
                    本提言は、公衆衛生学の世界的権威 <span className="font-semibold text-white">Johns Hopkins University</span> のデータと、
                    <br className="hidden md:inline" />
                    最新のレジリエンス研究（<span className="font-semibold text-white">University of Minnesota</span>）に基づいています。
                  </p>
                </div>
              </div>

              <div className="relative group">
                <img
                  src="/GBD.png"
                  alt="東京都におけるリスク起因死亡数（2021年）"
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
                  <p className="text-[10px] md:text-xs text-gray-300 font-light leading-relaxed">
                    図1：東京都における生産年齢人口（15-49歳）のリスク起因死亡数（2021年）。「自傷」の割合の高さは、ACEsと毒性ストレスの長期的影響を示唆している。（出所：GBD Compare）
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3つの柱 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
            <div className="group bg-black/40 border border-white/5 p-6 md:p-8 rounded-2xl hover:border-emerald-500/30 transition-all duration-500 hover:bg-black/60 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)]">
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                Immutable Proof<br />
                <span className="text-xs font-normal text-gray-500 tracking-wider uppercase">永続する証明</span>
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                大人の事情で消滅するポイントとは違う。子供の努力をブロックチェーンに刻み、物理法則のように永遠に残す。
              </p>
            </div>

            <div className="group bg-black/40 border border-white/5 p-6 md:p-8 rounded-2xl hover:border-emerald-500/30 transition-all duration-500 hover:bg-black/60 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)]">
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                Permissionless Care<br />
                <span className="text-xs font-normal text-gray-500 tracking-wider uppercase">許可なき支援</span>
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                人の感情や裁量を排除した「公平なコード」が支援を自動執行。躊躇いや恥を感じさせずにSOSを受理。
              </p>
            </div>

            <div className="group bg-black/40 border border-white/5 p-6 md:p-8 rounded-2xl hover:border-emerald-500/30 transition-all duration-500 hover:bg-black/60 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.15)]">
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                Zero-Knowledge Truth<br />
                <span className="text-xs font-normal text-gray-500 tracking-wider uppercase">匿名の真実</span>
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                「誰であるか」を明かさずに「助けが必要な事実」だけを証明。プライバシーと透明性の完全な両立。
              </p>
            </div>
          </div>

          <div className="text-center border-t border-white/10 pt-10 relative z-10">
            <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-[0.2em]">
              Initiator
            </p>
            <p className="text-white font-medium mb-8">
              田前 秀樹 <span className="text-gray-500 text-sm font-light ml-2">/ Liberal Arts Architect</span>
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              {/* 修正点 1: 日本語ボタンを PDF ダウンロードから /policy ページへの遷移に変更 (現状維持) */}
              <a
                href="/policy"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] text-sm md:text-base w-full sm:w-auto justify-center"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                【完全版】政策提言書 (日本語)
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              {/* ⭐ 修正点 2: 英語ボタンのリンクを /en-policy から /policy/en に修正！ */}
              <a
                href="/policy/en" // ここを修正しました
                // 外部リンクではなく内部遷移になるため、target="_blank" と rel="noopener noreferrer" を削除
                className="group inline-flex items-center gap-3 bg-white/10 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20 text-sm md:text-base w-full sm:w-auto justify-center"
              >
                Read the Full Paper (English)
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            {/* ダウンロード廃止に伴い、PDF DOWNLOADの文言を修正または削除を推奨 */}
            <p className="mt-4 text-xs text-gray-500 font-mono">VIEW ONLY (PDF DOWNLOAD ENDED)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicySection;