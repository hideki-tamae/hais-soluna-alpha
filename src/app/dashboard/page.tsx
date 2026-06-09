export const dynamic = "force-dynamic";
import Dashboard from '@/components/civilization/Dashboard';

export default function DashboardPage() {
  // 本来はAuthから取得しますが、テスト用にあなたのWallet ID等で仮置き
  const testUserId = "hideki_tamae_01"; 
  return <Dashboard userId={testUserId} />;
}
