import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia, base, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'ACES CARE HUB JAPAN', 
  // 👇 取得した ID を反映
  projectId: '08e0e7b17c58fae4b5a53c4ec8f0a7ca', 

  // 👇 baseSepolia を先頭に配置（開発・テスト用）
  chains: [baseSepolia, base, mainnet],

  ssr: true, 
});