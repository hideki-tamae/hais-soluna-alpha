import { useState, useEffect } from 'react';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // クライアント側でマウントされた後に実行
    if (typeof window !== 'undefined') {
      // 画面幅が768px未満 (Tailwindのmdブレークポイント未満) をモバイルと判定
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  return isMobile;
};

export default useIsMobile;