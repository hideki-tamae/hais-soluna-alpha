'use client';
import dynamic from 'next/dynamic';

// サーバーサイドレンダリング(SSR)を完全に遮断し、ブラウザ(エッジ)でのみエンジンを点火する
const VoiceScanner = dynamic(() => import('../../components/VoiceScanner'), { 
  ssr: false 
});

export default function ScanPage() {
  return <VoiceScanner />;
}