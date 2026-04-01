import SafeClient from './SafeClient';

/**
 * @file app/admin/page.tsx
 * @description
 * このファイルは Next.js App Router のサーバーコンポーネントです。
 * Hooks（useState, useEffectなど）を含むクライアントロジックを SafeClient に分離することで、
 * サーバーサイドでのビルドエラーを防ぎます。
 */

// このページコンポーネントはサーバー側でレンダリングされます。
export default function AdminPage() {
  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50">
      {/* ★クライアントコンポーネントを呼び出し★
        実際のSafe連携ロジックとUI（Hooksを含む部分）はすべて SafeClient.jsx で処理されます。
      */}
      <SafeClient />
    </div>
  );
}