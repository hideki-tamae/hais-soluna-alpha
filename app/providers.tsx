// app/providers.tsx 修正版
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';
import { WagmiProvider, http } from 'wagmi';
// ★ sepolia を追加
import { mainnet, polygon, sepolia } from 'wagmi/chains'; 
import { 
  RainbowKitProvider, 
  getDefaultConfig, 
  darkTheme 
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'ACES CARE HUB JAPAN',
  projectId: '08e0e7b17c58fae4b5a53c4ec8f0a7ca', 
  // ★ chains 配列に sepolia を追加
  chains: [mainnet, polygon, sepolia], 
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    // ★ sepolia のトランスポートを追加
    [sepolia.id]: http(), 
  },
  ssr: true,
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, 
      },
    },
  }));

  return (
    <WagmiProvider config={config} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider 
          theme={darkTheme()}
          modalSize="compact"
          // ★ 開発・テストフェーズのため initialChain を sepolia に設定
          initialChain={sepolia} 
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}