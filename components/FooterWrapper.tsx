'use client';
import { usePathname } from 'next/navigation';
import Footer from './Footer'; 

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // パスが取得できない、または /hais を含む場合は、即座に null (無) を返す
  // .includes('hais') にすることで、/hais, /hais/pricing, /v3/hais など全てに対応
  if (!pathname || pathname.includes('hais')) {
    return null;
  }
  
  // それ以外のページでのみ、メインフッターを表示
  return <Footer />;
}
