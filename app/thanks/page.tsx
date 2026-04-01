import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/hmac";

export default async function ThanksPage({ searchParams }: { searchParams: { k?: string } }){
  if(process.env.CLAIM_OPEN !== '1') redirect('/');

  const token = searchParams?.k;
  if(!token) redirect('/claim');
  const secret = process.env.SIGNING_SECRET || '';
  const ok = await verifyToken(token, secret);
  if(!ok) redirect('/claim?e=invalid');

  const bonusUrl = '/api/bonus?k=' + encodeURIComponent(token);
  return (
    <main className="container py-12 space-y-6">
      <h1 className="text-3xl font-semibold">解錠に成功しました 🔓</h1>
      <p className="text-neutral-400">以下のボタンから限定特典を受け取れます（リンクは短時間で失効します）。</p>
      <a className="btn" href={bonusUrl}>限定特典を受け取る</a>
      <p className="text-sm text-neutral-500">※ ダウンロードできない場合は時間を置いて再度お試しください。</p>
    </main>
  )
}
