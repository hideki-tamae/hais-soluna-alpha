import React from "react";
import AntiCopyWrapper from "@/components/utils/AntiCopyWrapper";
import Link from "next/link";

const WhitepaperPage = () => {
  return (
    <div className="py-16 md:py-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 mb-4">
            SOLUNA Proof-of-Care Token
          </h1>
          <p className="text-xl text-gray-400 font-medium">Whitepaper（閲覧専用・著作権保護）</p>
          <div className="mt-4">
            <Link href="/whitepaper/en" className="text-cyan-400 underline text-sm hover:text-cyan-300">
              English version is available here →
            </Link>
          </div>
          <p className="mt-6 text-sm text-red-400 font-bold bg-red-900/20 py-2 px-4 rounded-full inline-block">
            PDFダウンロードリンクは終了しました。現在はコピペ防止処理済みの閲覧専用版です。
          </p>
        </div>
        <AntiCopyWrapper>
          <div className="flex flex-col gap-12 select-none">
            <section className="relative overflow-hidden bg-white text-gray-800 p-8 md:p-16 shadow-2xl rounded-sm min-h-[1100px] border border-gray-300">
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-35deg] text-[120px] font-black whitespace-nowrap">Official Document</div>
              <div className="absolute top-8 right-8 w-16 h-16 opacity-80">
                <img src="/logo.png" alt="SOLUNA Logo" className="w-full h-auto grayscale" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="border-b-2 border-gray-900 pb-4">
                  <h2 className="text-3xl font-black text-black">SOLUNA Proof-of-Care Token</h2>
                  <p className="text-lg text-gray-600">Whitepaper Version 2025.01</p>
                </div>
                <div className="space-y-6 text-[1.05rem] leading-relaxed">
                  <h3 className="text-xl font-bold border-l-4 border-black pl-3">ABSTRACT（要約）</h3>
                  <p>SOLUNAは、「優しさ（ケア）」を経済的価値として証明・循環させるWeb3ネイティブの「ケア資本主義（Care Capitalism）」を実装するプロジェクトです。</p>
                  <p>従来の経済システムでは評価不能であった社会貢献や相互扶助の行動（PoC: Proof-of-Care）をブロックチェーン上で追跡・証明し、トークン（$SLN）を通じて還元します。</p>
                  <p>本プロジェクトは、技術的完全性と国際政策との連携を前提とした次世代の社会OSの基盤を提供します。</p>
                  <h3 className="text-xl font-bold border-l-4 border-black pl-3 mt-12">I. 序論・ビジョン</h3>
                  <p>Web3.0は、巨大プラットフォームが情報を独占するWeb2.0の限界に対するアンチテーゼとして誕生しました。</p>
                  <p>その核心的な目的は、非中央集権性（Decentralization）と、改ざん不能な透明性と信頼性（Trustlessness）の確立です。</p>
                  <p>SOLUNAは、この価値観を「ケア」と「社会制度」に応用し、中央集権的な福祉システムの不透明性を根絶します。</p>
                  <p>究極的な目標は、社会の痛みを反転させ、全ての参加者がケアの提供者として報われる持続可能な経済圏を構築することです。</p>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm">© 2025 ACES CARE HUB JAPAN. All rights reserved. | Page 1</div>
              </div>
            </section>
            <section className="relative overflow-hidden bg-white text-gray-800 p-8 md:p-16 shadow-2xl rounded-sm min-h-[1100px] border border-gray-300">
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-35deg] text-[120px] font-black whitespace-nowrap">Official Document</div>
              <div className="relative z-10 space-y-8">
                <h3 className="text-xl font-bold border-l-4 border-black pl-3 mt-12">II. コアコンセプト・哲学</h3>
                <p>PoCは、従来のPoWやPoSと異なり、ブロックチェーン上で証明された「優しさ、貢献、相互扶助」の行動履歴です。</p>
                <div className="bg-gray-50 p-6 rounded border border-gray-200 space-y-4 font-medium">
                  <p>1. Proof of Care: あなたのケアを不可逆な記録として証明。優しさが資産として蓄積されます。</p>
                  <p>2. Value of Kindness: 自己犠牲ではなく正当な対価へ。助ける行為が経済的にも報われる社会へ。</p>
                  <p>3. Decentralized OS: 中央集権的な管理を排除し、透明なプログラムが公平な分配を自動執行します。</p>
                </div>
                <h3 className="text-xl font-bold border-l-4 border-black pl-3 mt-12">III. 技術とプロトコル</h3>
                <div className="overflow-hidden border border-gray-800 rounded">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="p-3 border border-gray-700">項目</th>
                        <th className="p-3 border border-gray-700">設定</th>
                        <th className="p-3 border border-gray-700">役割</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="p-3 border border-gray-200 font-bold italic">$SLN</td>
                        <td className="p-3 border border-gray-200 font-bold italic">ティッカー</td>
                        <td className="p-3 border border-gray-200">報酬、ガバナンス、サービスアクセス権</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200 font-bold italic">総供給量</td>
                        <td className="p-3 border border-gray-200">1,000,000,000 SLN</td>
                        <td className="p-3 border border-gray-200">エコシステムへの配布と流動性確保</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm">© 2025 ACES CARE HUB JAPAN. All rights reserved. | Page 2</div>
              </div>
            </section>
            <section className="relative overflow-hidden bg-white text-gray-800 p-8 md:p-16 shadow-2xl rounded-sm min-h-[1100px] border border-gray-300">
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-35deg] text-[120px] font-black whitespace-nowrap">Official Document</div>
              <div className="relative z-10 space-y-8">
                <h3 className="text-xl font-bold border-l-4 border-black pl-3 mt-12">IV. ロードマップとガバナンス</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-gray-50 rounded border border-gray-100">
                    <span className="font-bold text-indigo-600 shrink-0">Phase 0-1</span>
                    <p>完了済 | 技術的完全稼働（ERC-20, Backend, Vercel）</p>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded border border-gray-100">
                    <span className="font-bold text-indigo-600 shrink-0">Phase 2</span>
                    <p>完了済 | 制度設計、セキュリティ監査を完了</p>
                  </div>
                  <div className="flex gap-4 p-4 border border-gray-100">
                    <span className="font-bold text-gray-400 shrink-0">Next</span>
                    <p>2026年 Q2以降 | 一般社団法人設立、公共機関連携準備</p>
                  </div>
                </div>
                <div className="mt-24 text-right pt-8 border-t border-gray-200">
                  <p className="text-2xl font-black text-black mb-1">田前 秀樹（Hideki Tamae）</p>
                  <p className="text-gray-600 font-medium">プロジェクト設計者（Re-Verse Civilization Architect）<br/>ACES Care HUB JAPAN 代表</p>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm">© 2025 ACES CARE HUB JAPAN. All rights reserved. | Page 3</div>
              </div>
            </section>
          </div>
        </AntiCopyWrapper>
      </div>
      <footer className="mt-24 text-center pb-16 text-gray-600 text-xs">
        <p>© 2025 Re-Verse Civilization / ACES CARE HUB JAPAN. Verified Official Document.</p>
      </footer>
    </div>
  );
};

export default WhitepaperPage;
