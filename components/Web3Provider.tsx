'use client';

import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';

import { coinbaseWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider, createConfig, http } from 'wagmi';
// ★ 使用するチェーンを統一（ここでは snippet に合わせ sepolia を含めています）
import { mainnet, polygon, sepolia, baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// 👇 取得した ID を直接入力（環境変数がなくても動くようにします）
const projectId = '08e0e7b17c58fae4b5a53c4ec8f0a7ca';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, coinbaseWallet],
    },
  ],
  { appName: 'ACES CARE HUB JAPAN', projectId }
);

// ★ chains の先頭を baseSepolia に固定（SOLUNA のテスト用）
const config = createConfig({
  chains: [baseSepolia, mainnet, polygon, sepolia],
  transports: {
    [baseSepolia.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
  connectors,
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* ★ 初期接続チェーンを baseSepolia に固定 */}
        <RainbowKitProvider
          initialChain={baseSepolia}
          theme={darkTheme({
            accentColor: '#22d3ee',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            overlayBlur: 'small',
          })}
          locale="ja"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}