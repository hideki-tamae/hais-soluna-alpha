// app/policy/page.tsx (政策提言書専用ページに全面置き換え)
'use client'; // イベントハンドラを使用するためクライアントコンポーネント化

import React from "react";
// ✅ 修正：実際のファイル位置である utils フォルダを経由させる
import AntiCopyWrapper from "../../components/utils/AntiCopyWrapper";
import Link from 'next/link'; 

// 🚨 政策提言書の確定パス（public/imagesフォルダ内）
const POLICY_PAGE_COVER = "/images/JP0.png"; 
const POLICY_PAGE_1_IMG = "/images/JP1.png"; 
const POLICY_PAGE_2_IMG = "/images/JP2.png";
const POLICY_PAGE_3_IMG = "/images/JP3.png";
const POLICY_PAGE_4_IMG = "/images/JP4.png";
const POLICY_PAGE_5_IMG = "/images/JP5.png";
const POLICY_PAGE_6_IMG = "/images/JP6.png"; 

const PolicyPage = () => {
  return (
    <div className="min-h-screen py-16 md:py-24 bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 lg:px-0">
        
        {/* --- ヘッダー --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-orange-400 mb-2">
            政策提言書 (Policy Proposal)
          </h1>
          <p className="text-xl text-gray-400">日本語版 / 閲覧専用・著作権保護</p>
          
          {/* 🌟 政策提言書: 英語版へのリンク */}
          <div className="mt-4 mb-4 text-center">
              <Link href="/policy/en" passHref>
                  <span className="text-sm text-gray-500 hover:text-white transition-colors cursor-pointer border-b border-gray-600 hover:border-white">
                      View English Version →
                  </span>
              </Link>
          </div>

          <div className="mt-8">
            <h3 className="text-lg text-red-500 font-bold">
              ※閲覧専用・著作権保護PDFダウンロードは終了しました。<br/>以下はコピペ防止処理が施された閲覧専用です。
            </h3>
          </div>
          
          {/* <Link href="/" passHref>
             <button className="mt-6 px-4 py-2 text-sm text-red-300 border border-red-500/50 rounded-full hover:bg-red-900/20 transition-colors">
                LPトップに戻る
             </button>
          </Link> */}
        </div>

        {/* --- コンテンツ --- */}
        {/* AntiCopyWrapperで全体を囲み、右クリック・コピペを無効化 */}
        <AntiCopyWrapper>
          <div className="space-y-12">
            
            {/* ページ (カバー) */}
            <h2 className="text-3xl font-bold text-white pt-10 border-t border-red-700">Cover</h2>
            <img src={POLICY_PAGE_COVER} alt="Policy Cover Page" className="w-full h-auto rounded-xl shadow-2xl border border-white/10" />

            {/* ページ 1 (序論/課題) */}
            <h2 className="text-3xl font-bold text-white pt-10 border-t border-red-700">Page 1 (序論/課題)</h2>
            <img src={POLICY_PAGE_1_IMG} alt="Policy Page 1" className="w-full h-auto rounded-xl shadow-2xl border border-white/10" />
            
            {/* ページ 2 (Immutable/Permissionless Care) */}
            <h2 className="text-3xl font-bold text-white pt-10 border-t border-red-700">Page 2 (Immutable/Permissionless Care)</h2>
            <img src={POLICY_PAGE_2_IMG} alt="Policy Page 2" className="w-full h-auto rounded-xl shadow-2xl border border-white/10" />

            {/* ページ 3 (科学的根拠) */}
            <h2 className="text-3xl font-bold text-white pt-10 border-t border-red-700">Page 3 (科学的根拠)</h2>
            <img src={POLICY_PAGE_3_IMG} alt="Policy Page 3" className="w-full h-auto rounded-xl shadow-2xl border border-white/10" />

            {/* ページ 4 (レジリエンスの再定義) */}
            <h2 className="text-3xl font-bold text-white pt-10 border-t border-red-700">Page 4 (レジリエンスの再定義)</h2>
            <img src={POLICY_PAGE_4_IMG} alt="Policy Page 4" className="w-full h-auto rounded-xl shadow-2xl border border-white/10" />

            {/* ページ 5 (社会的インパクト) */}
            <h2 className="text-3xl font-bold text-white pt-10 border-t border-red-700">Page 5 (社会的インパクト)</h2>
            <img src={POLICY_PAGE_5_IMG} alt="Policy Page 5" className="w-full h-auto rounded-xl shadow-2xl border border-white/10" />
            
            {/* ページ 6 (実装ロードマップ) */}
            <h2 className="text-3xl font-bold text-white pt-10 border-t border-red-700">Page 6 (実装ロードマップ)</h2>
            <img src={POLICY_PAGE_6_IMG} alt="Policy Page 6" className="w-full h-auto rounded-xl shadow-2xl border border-white/10" />
          </div>
        </AntiCopyWrapper>

        <div className="text-center mt-12 text-sm text-gray-600">
          <p>著作権 © 2025 ACEs CARE HUB JAPAN. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
};

export default PolicyPage;