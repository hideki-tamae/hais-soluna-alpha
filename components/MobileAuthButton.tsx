'use client';

import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// 🚨 修正: '@/hooks/...' を '../hooks/...' に変更 (相対パス)
import useIsMobile from '../hooks/useIsMobile';

// Passkey認証を開始する関数 (実際の実装に置き換える必要があります)
// CEO、この関数名は、あなたのプロジェクトでPasskey認証を開始する関数に置き換えてください。
const startPasskeyAuth = () => {
    console.log("MOBILE DETECTED: Starting Re-Verse ID (Passkey) Authentication...");
    // ⚠️ 実際のPasskey認証APIの呼び出しをここに追加してください。
    alert("Passkey認証フローを開始します (Coinbaseアプリへの遷移をスキップしました)");
    // 例: yourPasskeySDK.authenticate();
};


const MobileAuthButton = () => {
    const isMobile = useIsMobile();

    if (isMobile) {
        // モバイルの場合: WalletConnectのモーダルをスキップし、Passkey認証を強制
        return (
            <button
                onClick={startPasskeyAuth}
                className="px-3 py-1.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm transition-colors shadow-md"
                style={{ whiteSpace: 'nowrap' }}
            >
                Connect ID
            </button>
        );
    }

    // PCの場合: 従来のRainbowKit ConnectButtonを表示
    return (
        <ConnectButton 
            label="Connect ID" 
            accountStatus="avatar" 
            chainStatus="icon"
            showBalance={false}
        />
    );
};

export default MobileAuthButton;