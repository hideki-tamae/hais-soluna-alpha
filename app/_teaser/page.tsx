// app/teaser/page.tsx
// ティーザーの一覧ページ：ヒーロー＋上部3カード（リンク統一）＋ Day3/2/1 のアーカイブ。

type Item = {
  day: number;
  title: string;
  url: string; // /public 配下のパス or 直URL
  provider: "mp4" | "youtube" | "vimeo";
};

// ▼ ここだけ追加・編集すればOK
const list: Item[] = [
  { day: 3, title: "DAY3", url: "/8s_a_dramatic_202510231252_mj6zk.mp4", provider: "mp4" },
  { day: 2, title: "DAY2", url: "/Katana_Video_Generation.mp4", provider: "mp4" },
  { day: 1, title: "DAY1", url: "/Cinematic_Sunrise_Video_Generation.mp4", provider: "mp4" },
];

function Player({ i }: { i: Item }) {
  if (i.provider === "mp4") {
    return (
      <video
        controls
        src={i.url}
        className="w-full aspect-video rounded-xl border"
        preload="metadata"
        playsInline
      />
    );
  }
  return (
    <iframe
      src={i.url}
      className="w-full aspect-video rounded-xl border"
      loading="lazy"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}

export default function Page() {
  const sorted = [...list].sort((a, b) => b.day - a.day);
  return (
    <main className="min-h-dvh bg-black text-white">
      {/* 上部にヒーロー＋TOPに戻る導線 */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">ティーザーの一覧</h1>
          <a href="/" className="text-sm underline opacity-80 hover:opacity-100">← TOPに戻る</a>
        </div>
        <p className="mt-3 max-w-3xl leading-relaxed opacity-85">
          最新ティーザーはホームに表示。ここでは過去アーカイブと最新分をまとめて見られます。
        </p>
      </section>

      {/* ホームと同じ3カード（リンク統一） */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          {/* 1. 世界観に触れる（聴く・観る） */}
          <div className="rounded-3xl border/30 border px-6 py-5">
            <h3 className="font-semibold mb-2">1. 世界観に触れる（聴く・観る）</h3>
            <a
              className="block underline opacity-90 hover:opacity-100"
              href="https://acescare.fanlink.tv/hidekitamae?fbclid=IwY2xjawNm_L9leHRuA2FlbQIxMABicmlkETExeTJoNFpVQ05pb0sxS2s2AR6BPfTBwZoP0nm9UeDFfjqHHz-xFrUqTHxxgPCS5gUGPTFVD8Jc7J9YbhcmbQ_aem_ck7AuB_l6RPBOCl4nm5dDw"
              target="_blank"
              rel="noopener noreferrer"
            >
              音楽（世界185カ国以上で配信中）
            </a>
            <a
              className="block underline opacity-90 hover:opacity-100 mt-1"
              href="https://oncyber.io/spaces/0DCUetEBicRPi0fem1WM?coords=-2.07x2.85x5.14x1.58"
              target="_blank"
              rel="noopener noreferrer"
            >
              メタバース美術館（Healing Ukiyo-e 3D）
            </a>
          </div>

          {/* 2. プロジェクトに参加する（繋がる） */}
          <div className="rounded-3xl border/30 border px-6 py-5">
            <h3 className="font-semibold mb-2">2. プロジェクトに参加する（繋がる）</h3>
            <a
              className="block underline opacity-90 hover:opacity-100"
              href="https://aces-care-hub-site-ru8w.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ACEs Care HUB JAPANの活動（プロジェクト）
            </a>
            <a
              className="block underline opacity-90 hover:opacity-100 mt-1"
              href="https://tally.so/r/wM9JVY"
              target="_blank"
              rel="noopener noreferrer"
            >
              β参加フォーム（共創の第一歩）
            </a>
          </div>

          {/* 3. オープンな議論の場 */}
          <div className="rounded-3xl border/30 border px-6 py-5">
            <h3 className="font-semibold mb-2">3. オープンな議論の場</h3>
            <a
              className="block underline opacity-90 hover:opacity-100"
              href="https://discord.gg/PBwPNBfE"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web3公民館で共同議論に参加
            </a>
            <div className="block underline opacity-90 hover:opacity-100 mt-1">
              リバース・ラジオ（構築中）
            </div>
            <div className="opacity-80 mt-1">月次レポート（構築中・随時更新）</div>
          </div>
        </div>
      </section>

      {/* 一覧本体（新しい順） */}
      <section className="mx-auto max-w-6xl px-4 py-10 grid gap-10">
        {sorted.map((i) => (
          <article key={i.day} className="space-y-3">
            <h2 className="text-xl font-semibold">{i.title}（Day{i.day}）</h2>
            <Player i={i} />
          </article>
        ))}
      </section>
    </main>
  );
}