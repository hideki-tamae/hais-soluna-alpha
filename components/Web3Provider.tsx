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
// ★ sepolia を確実に追加
import { mainnet, polygon, sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, coinbaseWallet],
    },
  ],
  { appName: 'Re-Verse Civilization', projectId }
);

// ★ chainsに sepolia を追加し、先頭に置く
const config = createConfig({
  chains: [sepolia, mainnet, polygon],
  transports: {
    [sepolia.id]: http(),
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
  connectors,
  ssr: true,
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* ★ initialChain を sepolia に固定 */}
        <RainbowKitProvider
          initialChain={sepolia}
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