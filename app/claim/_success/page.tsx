import React from 'react';
import Link from 'next/link';

export default function ClaimSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const amount = searchParams?.amount ?? '100';
  const txHash = searchParams?.tx ?? '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      {/* 背景に淡いグラデーションを少しだけ入れる（高級感） */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white -z-10" />

      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-none p-8 text-center">
        
        {/* 修正ポイント：絵文字を廃止し、静謐なアニメーションアイコンへ */}
        <div className="mx-auto w-24 h-24 flex items-center justify-center mb-8 relative">
          {/* 外側の淡い波紋 */}
          <div className="absolute w-full h-full bg-indigo-50 rounded-full animate-pulse" />
          {/* 内側の円 */}
          <div className="relative w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-200">
            {/* SVGによる洗練されたチェックマーク */}
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* タイトル：文字間を少し広げて品格を出す */}
        <h1 className="text-xl font-bold text-gray-800 mb-4 tracking-wider">
          受け取りが完了しました
        </h1>
        
        {/* 数値表現：色味を統一 */}
        <p className="text-5xl font-light text-indigo-900 mb-8 tracking-tight">
          {String(amount)} <span className="text-lg font-medium text-gray-400 ml-1">SOLUNA</span>
        </p>

        {/* メッセージエリア：装飾を削ぎ落とし、言葉だけを立たせる */}
        <div className="text-center mb-10">
          <p className="text-gray-600 text-sm leading-loose font-medium">
            あなたが手にしたのは、<br />
            <span className="text-indigo-800">「優しさが制度となる時代」</span>への<br />
            確かな証明です。
          </p>
        </div>

        {/* トランザクションリンク */}
        {txHash && (
          <a
            href={`https://etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-gray-400 hover:text-indigo-600 transition-colors mb-12 border-b border-transparent hover:border-indigo-600 pb-0.5"
          >
            <span>証明データを確認する (Transaction)</span>
            <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {/* ボタン：角丸を少し落としてシャープに */}
        <div className="space-y-4">
          <Link 
            href="/" 
            className="block w-full bg-gray-900 hover:bg-black text-white text-sm font-medium py-4 px-6 transition duration-300 tracking-wide"
          >
            トップページへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}