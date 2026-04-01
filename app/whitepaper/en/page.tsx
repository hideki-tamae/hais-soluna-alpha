import React from "react";
import AntiCopyWrapper from "@/components/utils/AntiCopyWrapper";
import Link from "next/link";

const WhitepaperENPage = () => {
  return (
    <div className="py-16 md:py-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300 mb-4">
            SOLUNA Proof-of-Care Token
          </h1>
          <p className="text-xl text-gray-400 font-medium">Whitepaper (Read-only · Copyright Protected)</p>
          <div className="mt-4">
            <Link href="/whitepaper" className="text-cyan-400 underline text-sm hover:text-cyan-300">
              ← 日本語版はこちら
            </Link>
          </div>
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
                  <h3 className="text-xl font-bold border-l-4 border-black pl-3">ABSTRACT</h3>
                  <p>SOLUNA is a project implementing "Care Capitalism" — a Web3-native framework that proves and circulates "kindness (care)" as economic value.</p>
                  <p>Social contributions and mutual aid behaviors (PoC: Proof-of-Care) that were previously impossible to evaluate in conventional economic systems are tracked and verified on the blockchain, and returned to participants via the $SLN token.</p>
                  <p>This project provides the foundation for a next-generation social OS premised on technical integrity and alignment with international policy.</p>
                  <h3 className="text-xl font-bold border-l-4 border-black pl-3 mt-12">I. Introduction & Vision</h3>
                  <p>Web3.0 was born as an antithesis to the limitations of Web2.0, where giant platforms monopolize information.</p>
                  <p>Its core purpose is to establish decentralization and tamper-proof transparency and trustlessness.</p>
                  <p>SOLUNA applies these values to "care" and "social systems," eradicating the opacity of centralized welfare systems.</p>
                  <p>The ultimate goal is to reverse society's pain and build a sustainable economic sphere where all participants are rewarded as care providers.</p>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm">© 2025 ACES CARE HUB JAPAN. All rights reserved. | Page 1</div>
              </div>
            </section>

            <section className="relative overflow-hidden bg-white text-gray-800 p-8 md:p-16 shadow-2xl rounded-sm min-h-[1100px] border border-gray-300">
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] rotate-[-35deg] text-[120px] font-black whitespace-nowrap">Official Document</div>
              <div className="relative z-10 space-y-8">
                <h3 className="text-xl font-bold border-l-4 border-black pl-3 mt-12">II. Core Concept & Philosophy</h3>
                <p>PoC, unlike conventional PoW or PoS, is a history of "kindness, contribution, and mutual aid" behaviors proven on the blockchain.</p>
                <div className="bg-gray-50 p-6 rounded border border-gray-200 space-y-4 font-medium">
                  <p>1. Proof of Care: Prove your care as an immutable record. Kindness accumulates as an asset.</p>
                  <p>2. Value of Kindness: From self-sacrifice to fair compensation. A society where helping others is economically rewarded.</p>
                  <p>3. Decentralized OS: Eliminating centralized control, transparent programs automatically execute fair distribution.</p>
                </div>
                <h3 className="text-xl font-bold border-l-4 border-black pl-3 mt-12">III. Technology & Protocol</h3>
                <div className="overflow-hidden border border-gray-800 rounded">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="p-3 border border-gray-700">Item</th>
                        <th className="p-3 border border-gray-700">Spec</th>
                        <th className="p-3 border border-gray-700">Role</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="p-3 border border-gray-200 font-bold italic">$SLN</td>
                        <td className="p-3 border border-gray-200 font-bold italic">Ticker</td>
                        <td className="p-3 border border-gray-200">Rewards, governance, service access rights</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200 font-bold italic">Total Supply</td>
                        <td className="p-3 border border-gray-200">1,000,000,000 SLN</td>
                        <td className="p-3 border border-gray-200">Distribution to ecosystem and liquidity assurance</td>
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
                <h3 className="text-xl font-bold border-l-4 border-black pl-3 mt-12">IV. Roadmap & Governance</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-gray-50 rounded border border-gray-100">
                    <span className="font-bold text-indigo-600 shrink-0">Phase 0-1</span>
                    <p>Completed | Full technical operation (ERC-20, Backend, Vercel)</p>
                  </div>
                  <div className="flex gap-4 p-4 bg-gray-50 rounded border border-gray-100">
                    <span className="font-bold text-indigo-600 shrink-0">Phase 2</span>
                    <p>Completed | Institutional design, security audit completed</p>
                  </div>
                  <div className="flex gap-4 p-4 border border-gray-100">
                    <span className="font-bold text-gray-400 shrink-0">Next</span>
                    <p>Q2 2026 onwards | Establishment of incorporated association, preparation for public institution collaboration</p>
                  </div>
                </div>
                <div className="mt-24 text-right pt-8 border-t border-gray-200">
                  <p className="text-2xl font-black text-black mb-1">Hideki Tamae（田前 秀樹）</p>
                  <p className="text-gray-600 font-medium">Project Architect (Re-Verse Civilization Architect)<br/>Representative, ACES Care HUB JAPAN</p>
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

export default WhitepaperENPage;
