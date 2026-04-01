import { getDefaultConfig } from '@rainbow-me/rainbowkit';
// 👇 baseSepolia を追加インポート
import { baseSepolia, base, mainnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'ACES CARE HUB JAPAN', 
  projectId: 'YOUR_PROJECT_ID', 

  // 👇 【重要】baseSepolia を配列の先頭（[0]番目）に追加！
  // これにより、アプリはデフォルトで「Base Sepolia（テストネット）」に接続します。
  chains: [baseSepolia, base, mainnet],

  ssr: true, 
});