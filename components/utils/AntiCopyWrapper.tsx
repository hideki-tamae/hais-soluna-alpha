'use client';

import React, { useEffect } from 'react';

export default function AntiCopyWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // キーボードショートカット（コピー、印刷、ソース表示）を制限
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) && 
        (e.key === 'c' || e.key === 'u' || e.key === 'p' || e.key === 's')
      ) {
        e.preventDefault();
        alert("コンテンツの保護により、この操作は制限されています。");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      onContextMenu={(e) => e.preventDefault()} 
      className="select-none" 
      style={{ 
        userSelect: 'none', 
        WebkitUserSelect: 'none',
        msUserSelect: 'none' 
      }} 
    >
      {children}
    </div>
  );
}