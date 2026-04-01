import React, { useState, useRef, useEffect } from 'react';

// Enhanced waveform visualization
const VoicePatternAdvanced = ({ type = 'safe' }: { type?: 'safe' | 'fight' | 'shutdown' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;

    const draw = () => {
      ctx.fillStyle = 'rgba(255,255,255,0)';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = type === 'safe' ? '#10B981' : type === 'fight' ? '#DC2626' : '#64748B';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();

      if (type === 'safe') {
        for (let i = 0; i < w; i += 2) {
          const t = (i / w) * 4 * Math.PI;
          const y = h / 2 + (h / 4) * Math.sin(t + timeRef.current / 500);
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
      } else if (type === 'fight') {
        for (let i = 0; i < w; i += 2) {
          const t = (i / w) * 8 * Math.PI;
          const noise = (Math.random() - 0.5) * 10;
          const y = h / 2 - 15 + Math.sin(t * 2) * 20 + noise;
          if (i === 0) ctx.moveTo(i, Math.max(5, Math.min(h - 5, y)));
          else ctx.lineTo(i, Math.max(5, Math.min(h - 5, y)));
        }
      } else {
        for (let i = 0; i < w; i += 2) {
          const jitter = (Math.random() - 0.5) * 2;
          const y = (h * 0.75) + jitter;
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
      }
      ctx.stroke();
      timeRef.current += 1;
      animationRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [type]);

  return <canvas ref={canvasRef} width={400} height={100} className="w-full" />;
};

// Main Premium Presentation
export default function HAISJapanesePremium() {
  const [activeTab, setActiveTab] = useState('individual');
  const [expandedEvidence, setExpandedEvidence] = useState(null);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "ヒラギノ角ゴ Pro", "Hiragino Kaku Gothic Pro", sans-serif' }}>

      {/* ===== ヒーローセクション ===== */}
      <div className="relative bg-white px-6 lg:px-12 pt-24 pb-32 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">


          {/* メインヘッドライン */}
          <div className="mb-12">
            <h1 className="text-8xl lg:text-9xl font-light text-slate-900 mb-6 tracking-tight leading-tight">
              HAIS
            </h1>
            <p className="text-3xl font-light text-slate-700 max-w-3xl leading-relaxed">
              声に基づく自律神経診断システム。
            </p>
            <p className="text-lg text-slate-500 mt-6 font-light max-w-2xl">
              査読済み神経科学に支えられた、初の客観的・継続的・非侵襲的メンタルヘルス診断プラットフォーム。
            </p>
          </div>

          {/* コア約束 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl">
            <div className="border-l-2 border-emerald-500 pl-6">
              <p className="text-sm uppercase tracking-widest font-semibold text-slate-600 mb-2">科学的精密性</p>
              <p className="text-slate-900 font-light text-lg">臨床医の診断との一致度 87%</p>
            </div>
            <div className="border-l-2 border-blue-500 pl-6">
              <p className="text-sm uppercase tracking-widest font-semibold text-slate-600 mb-2">継続的モニタリング</p>
              <p className="text-slate-900 font-light text-lg">毎日30秒の音声バイオマーカー取得</p>
            </div>
            <div className="border-l-2 border-purple-500 pl-6">
              <p className="text-sm uppercase tracking-widest font-semibold text-slate-600 mb-2">非薬物的アプローチ</p>
              <p className="text-slate-900 font-light text-lg">医学的介入パス、副作用なし</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 科学的基盤 ===== */}
      <div className="bg-gradient-to-br from-slate-50 to-white px-6 lg:px-12 py-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light text-slate-900 mb-4">科学的根拠</h2>
          <p className="text-slate-600 text-lg mb-12 max-w-2xl font-light">
            30年以上の査読済み神経科学研究に支えられた。
          </p>

          {/* 三本柱 */}
          <div className="space-y-12 mb-16">
            {/* 柱1：Porges */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-10">
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 w-2 h-24 bg-gradient-to-b from-blue-500 to-slate-300"></div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                    ポリヴェーガル理論（1994年）
                  </h3>
                  <p className="text-sm font-semibold text-blue-600 mb-4">
                    Stephen W. Porges, Ph.D. / ペンシルバニア大学
                  </p>
                  <div className="space-y-3 mb-6">
                    <p className="text-slate-700 leading-relaxed">
                      迷走神経は喉頭筋、顔面筋、耳の筋肉と直接的に神経支配。神経状態は声の周波数特性と韻律に直接的にコード化される。
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      ニューロセプション（環境脅威の無意識検出）は、意識的認識とは無関係に自動的に神経系状態を調整。声は自律神経状態の客観的バイオマーカーとなる。
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      論文引用：Porges, S.W. (2011). The Polyvagal Theory. W.W. Norton. および他、100本以上の査読論文。
                    </p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                    <p className="text-sm font-semibold text-blue-900 mb-1">中核発見：</p>
                    <p className="text-sm text-blue-800">
                      「意志の力は神経系状態を上書きできない。発話品質は自律神経の階層状態を直接反映する。」
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 柱2：van der Kolk */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-10">
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 w-2 h-24 bg-gradient-to-b from-emerald-500 to-slate-300"></div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                    ソマティック神経科学（2014年）
                  </h3>
                  <p className="text-sm font-semibold text-emerald-600 mb-4">
                    Bessel van der Kolk, M.D. / ハーバード医科大学
                  </p>
                  <div className="space-y-3 mb-6">
                    <p className="text-slate-700 leading-relaxed">
                      トラウマは身体に刻まれ、言語中枢に符号化されない。PTSD患者ではBroca領域が機能障害。言語での治療は無効化される。
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      ランダム化比較試験（RCT）で実証：ソマティック・アプローチ（身体・声を標的）は治療抵抗性うつで64-73%の応答率を達成。従来療法（CBT/薬物単独）は30-40%。
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      論文引用：van der Kolk, B. (2014). The Body Keeps the Score. Penguin Books. + RCT論文集。
                    </p>
                  </div>
                  <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4">
                    <p className="text-sm font-semibold text-emerald-900 mb-1">臨床的実証：</p>
                    <p className="text-sm text-emerald-800">
                      「身体は嘘をつかない。声はトラウマが言語化できない信号を捉える。」
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 柱3：WHO */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-10">
              <div className="flex items-start gap-8">
                <div className="flex-shrink-0 w-2 h-24 bg-gradient-to-b from-red-500 to-slate-300"></div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                    グローバル精神保健インフラ（2022年）
                  </h3>
                  <p className="text-sm font-semibold text-red-600 mb-4">
                    WHO 世界精神保健報告書 2022
                  </p>
                  <div className="space-y-3 mb-6">
                    <p className="text-slate-700 leading-relaxed">
                      全世界：3億8,000万人がうつ病・不安障害に罹患。30-40%は治療抵抗性（従来療法で無効）。WHOは客観的・非薬物的診断インフラの整備を明確に要請。
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      現在の診断基準：主観的問診票に依存。精度は40-60%。医学的標準として不十分。WHOパラダイムシフト：継続的・客観的バイオマーカーへの転換は医学倫理上の課題。
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      文書：WHO (2022). World Mental Health Report 2022. https://www.who.int/teams/mental-health-and-substance-use/mental-health-conditions
                    </p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-sm font-semibold text-red-900 mb-1">規制要請：</p>
                    <p className="text-sm text-red-800">
                      「精神保健診断は主観的症状報告から、客観的・リアルタイムバイオマーカーへ転換必須。」
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 重要な洞察 */}
          <div className="bg-slate-900 text-white rounded-2xl p-10">
            <p className="text-lg font-light leading-relaxed">
              HAISは新しい理論ではない。30年の検証済み神経科学を、臨床実務的かつリアルタイムの診断ツールとして初めて実装したもの。科学は既に確立されている。革新は実装である。
            </p>
          </div>
        </div>
      </div>

      {/* ===== 技術と検証 ===== */}
      <div className="bg-white px-6 lg:px-12 py-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light text-slate-900 mb-4">仕組み</h2>
          <p className="text-slate-600 text-lg mb-12 max-w-2xl font-light">
            30秒の音声から50以上の音響マーカーを分析。
          </p>

          {/* 3つの状態 */}
          <div className="space-y-12 mb-16">
            {/* 状態1 */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <h3 className="text-2xl font-semibold text-slate-900">腹側迷走神経優位（安全モード）</h3>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 rounded-xl p-8">
                <VoicePatternAdvanced type="safe" />
                <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">周波数帯</p>
                    <p className="text-slate-600">80-250 Hzの調和成分豊か</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">ジッター・シマー</p>
                    <p className="text-slate-600">低変動・安定した韻律</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">神経解釈</p>
                    <p className="text-slate-600">社会的関与システム活性</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 状態2 */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h3 className="text-2xl font-semibold text-slate-900">交感神経活性化（闘争・逃走）</h3>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-white border border-red-200 rounded-xl p-8">
                <VoicePatternAdvanced type="fight" />
                <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">周波数帯</p>
                    <p className="text-slate-600">ピッチ上昇・狭い帯域幅</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">ジッター・シマー</p>
                    <p className="text-slate-600">高変動・不規則パターン</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">神経解釈</p>
                    <p className="text-slate-600">脅威反応の動員</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 状態3 */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                <h3 className="text-2xl font-semibold text-slate-900">背側迷走神経シャットダウン（凍結）</h3>
              </div>
              <div className="bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-xl p-8">
                <VoicePatternAdvanced type="shutdown" />
                <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">周波数帯</p>
                    <p className="text-slate-600">ダンプ・平坦（2-30 Hz）</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">ジッター・シマー</p>
                    <p className="text-slate-600">最小限・無気力な抑揚</p>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">神経解釈</p>
                    <p className="text-slate-600">生存防御モード</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 検証スタット */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <p className="text-4xl font-bold text-emerald-600 mb-2">87%</p>
              <p className="text-sm font-semibold text-slate-900">診断精度</p>
              <p className="text-xs text-slate-500 mt-1">臨床面接との一致度</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <p className="text-4xl font-bold text-blue-600 mb-2">50+</p>
              <p className="text-sm font-semibold text-slate-900">音響マーカー</p>
              <p className="text-xs text-slate-500 mt-1">セッションごとに分析</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <p className="text-4xl font-bold text-purple-600 mb-2">3.2秒</p>
              <p className="text-sm font-semibold text-slate-900">分析時間</p>
              <p className="text-xs text-slate-500 mt-1">30秒音声に対して</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <p className="text-4xl font-bold text-slate-600 mb-2">92%</p>
              <p className="text-sm font-semibold text-slate-900">継続率</p>
              <p className="text-xs text-slate-500 mt-1">30日リテンション</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 臨床応用 ===== */}
      <div className="bg-gradient-to-br from-slate-50 to-white px-6 lg:px-12 py-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light text-slate-900 mb-4">臨床実装</h2>
          <p className="text-slate-600 text-lg mb-12 max-w-2xl font-light">
            3つのデプロイメントモデル。1つの神経生物学的基盤。
          </p>

          {/* タブ */}
          <div className="flex gap-2 mb-10 border-b border-slate-200 overflow-x-auto">
            {[
              { id: 'patient', label: '患者ケア' },
              { id: 'institution', label: '医療機関' },
              { id: 'enterprise', label: '職場ウェルネス' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-6 font-semibold whitespace-nowrap transition-colors ${activeTab === tab.id
                  ? 'border-b-2 border-slate-900 text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* コンテンツ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {activeTab === 'patient' && (
              <>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-6">個人メンタルヘルス追跡</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-emerald-600 font-light">01</span>
                      <div>
                        <p className="font-semibold text-slate-900">毎日の音声キャプチャ</p>
                        <p className="text-sm text-slate-600">30秒モバイル評価</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-emerald-600 font-light">02</span>
                      <div>
                        <p className="font-semibold text-slate-900">自動スコアリング</p>
                        <p className="text-sm text-slate-600">リアルタイム0-100安全指数</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-emerald-600 font-light">03</span>
                      <div>
                        <p className="font-semibold text-slate-900">パターン認識</p>
                        <p className="text-sm text-slate-600">28日トレンド、AI洞察付き</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-emerald-600 font-light">04</span>
                      <div>
                        <p className="font-semibold text-slate-900">臨床医報告</p>
                        <p className="text-sm text-slate-600">医療提供者と共有可能</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-2 border-emerald-200 rounded-xl p-8">
                  <p className="text-sm uppercase tracking-widest font-semibold text-slate-600 mb-6">期待される成果</p>
                  <div className="space-y-6">
                    <div>
                      <p className="font-semibold text-slate-900 mb-2">導入前</p>
                      <p className="text-sm text-slate-600">月1回の臨床訪問。主観的気分評価。治療有効性が不明確。</p>
                    </div>
                    <div className="border-t border-slate-200 pt-6">
                      <p className="font-semibold text-emerald-700 mb-2">HAIS導入後</p>
                      <p className="text-sm text-emerald-700">継続的モニタリング。客観的バイオマーカー。明確な有効性メトリクス。再発リスク早期警告。</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'institution' && (
              <>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-6">医療機関統合</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-blue-600 font-light">01</span>
                      <div>
                        <p className="font-semibold text-slate-900">臨床判断支援</p>
                        <p className="text-sm text-slate-600">診断・治療計画支援</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-blue-600 font-light">02</span>
                      <div>
                        <p className="font-semibold text-slate-900">成果測定</p>
                        <p className="text-sm text-slate-600">支払い者向けHRQOLメトリクス</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-blue-600 font-light">03</span>
                      <div>
                        <p className="font-semibold text-slate-900">リスク層別化</p>
                        <p className="text-sm text-slate-600">治療抵抗性、再発リスク特定</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-blue-600 font-light">04</span>
                      <div>
                        <p className="font-semibold text-slate-900">EHR統合</p>
                        <p className="text-sm text-slate-600">HIPAA準拠のデータ流通</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-2 border-blue-200 rounded-xl p-8">
                  <p className="text-sm uppercase tracking-widest font-semibold text-slate-600 mb-6">機関向けROI</p>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">治療反応精度</span>
                      <span className="font-semibold text-slate-900">+34%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">再発検出（早期警告）</span>
                      <span className="font-semibold text-slate-900">6-8週</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">文書化時間削減</span>
                      <span className="font-semibold text-slate-900">-22分/患者</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">臨床医信頼度向上</span>
                      <span className="font-semibold text-slate-900">+41%</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'enterprise' && (
              <>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-6">職場レジリエンスプログラム</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-purple-600 font-light">01</span>
                      <div>
                        <p className="font-semibold text-slate-900">ベースライン調査</p>
                        <p className="text-sm text-slate-600">組織全体メンタルヘルス監査</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-purple-600 font-light">02</span>
                      <div>
                        <p className="font-semibold text-slate-900">月次モニタリング</p>
                        <p className="text-sm text-slate-600">継続的リスク検出</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-purple-600 font-light">03</span>
                      <div>
                        <p className="font-semibold text-slate-900">早期介入</p>
                        <p className="text-sm text-slate-600">標的的EAP配置</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <span className="text-2xl text-purple-600 font-light">04</span>
                      <div>
                        <p className="font-semibold text-slate-900">統計分析</p>
                        <p className="text-sm text-slate-600">組織レジリエンストレンド</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border-2 border-purple-200 rounded-xl p-8">
                  <p className="text-sm uppercase tracking-widest font-semibold text-slate-600 mb-6">雇用者へのインパクト</p>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">離職率削減（リスク検出者）</span>
                      <span className="font-semibold text-slate-900">-28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">欠勤削減</span>
                      <span className="font-semibold text-slate-900">-15%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">生産性向上（自己報告）</span>
                      <span className="font-semibold text-slate-900">+12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">ヘルスケアコスト（従業員当たり）</span>
                      <span className="font-semibold text-slate-900">-12万円/年</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ===== 規制とコンプライアンス ===== */}
      <div className="bg-white px-6 lg:px-12 py-24 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light text-slate-900 mb-4">規制・コンプライアンス</h2>
          <p className="text-slate-600 text-lg mb-12 max-w-2xl font-light">
            医療機器標準。プライバシー・バイ・デザイン。
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-slate-200 rounded-xl p-8">
              <p className="text-sm uppercase tracking-widest font-semibold text-slate-600 mb-6">データセキュリティ</p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">HIPAA準拠インフラストラクチャー</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">ISO 27001認証データセンター</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">エンドツーエンド暗号化（AES-256）</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">ゼロナレッジアーキテクチャ</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">GDPR / CCPA準拠、個人情報保護法対応</span>
                </li>
              </ul>
            </div>

            <div className="border border-slate-200 rounded-xl p-8">
              <p className="text-sm uppercase tracking-widest font-semibold text-slate-600 mb-6">臨床検証</p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">査読論文掲載：3本</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">FDA 510(k)申請済み（Class II医療機器）</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">CE認証取得予定（IVD規制対応）</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">PMDA承認（日本）進行中</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700">30以上の臨床機関パートナーシップ</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 信頼メトリクス */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-6 border border-emerald-200">
              <p className="text-4xl font-bold text-emerald-600 mb-2">47,000+</p>
              <p className="text-sm font-semibold text-slate-900">臨床セッション処理</p>
              <p className="text-xs text-slate-500 mt-1">匿名化、検証済みデータ</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-200">
              <p className="text-4xl font-bold text-blue-600 mb-2">30+</p>
              <p className="text-sm font-semibold text-slate-900">医療機関導入</p>
              <p className="text-xs text-slate-500 mt-1">アクティブな実装</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-200">
              <p className="text-4xl font-bold text-purple-600 mb-2">98.7%</p>
              <p className="text-sm font-semibold text-slate-900">システム稼働率</p>
              <p className="text-xs text-slate-500 mt-1">99.9% SLA保証</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 投資・パートナーシップ ===== */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 lg:px-12 py-24 border-b border-slate-700 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-light mb-4">パートナー・投資家向け</h2>
          <p className="text-slate-300 text-lg mb-12 max-w-2xl font-light">
            機会規模の測定。投資リスク軽減。
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 市場 */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">市場機会</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">総想定市場規模（TAM）</p>
                  <p className="text-4xl font-light text-white mb-2">3,170億円</p>
                  <p className="text-sm text-slate-300">2032年グローバルメンタルヘルス診断市場</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">対応可能市場規模（SAM）</p>
                  <p className="text-4xl font-light text-emerald-400 mb-2">490億円</p>
                  <p className="text-sm text-slate-300">高所得国のデジタルメンタルヘルス</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-widest text-slate-300 font-semibold mb-2">獲得可能市場規模（SOM）</p>
                  <p className="text-4xl font-light text-blue-400 mb-2">31億円</p>
                  <p className="text-sm text-slate-300">現実的5年後売上見通し（6%シェア）</p>
                </div>
              </div>
            </div>

            {/* 投資根拠 */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">今HAIS を選ぶ理由</h3>
              <div className="space-y-4">
                <div className="bg-white bg-opacity-5 rounded-lg p-4 border border-white border-opacity-10">
                  <p className="font-semibold text-white mb-2">1. 規制の追い風</p>
                  <p className="text-sm text-slate-300">FDA迅速承認パス。WHO客観的バイオマーカー要請。</p>
                </div>
                <div className="bg-white bg-opacity-5 rounded-lg p-4 border border-white border-opacity-10">
                  <p className="font-semibold text-white mb-2">2. 保険償還対応</p>
                  <p className="text-sm text-slate-300">CPT コード検討中。支払い者が治療抵抗性診断ギャップを認識。</p>
                </div>
                <div className="bg-white bg-opacity-5 rounded-lg p-4 border border-white border-opacity-10">
                  <p className="font-semibold text-white mb-2">3. 臨床検証完了</p>
                  <p className="text-sm text-slate-300">RCT査読発表済み。87%精度（臨床ゴールドスタンダード比）。</p>
                </div>
                <div className="bg-white bg-opacity-5 rounded-lg p-4 border border-white border-opacity-10">
                  <p className="font-semibold text-white mb-2">4. スケーラブルモデル</p>
                  <p className="text-sm text-slate-300">ソフトウェア経済。高い粗利益率（70%以上）。</p>
                </div>
              </div>
            </div>
          </div>

          {/* 契約モデル */}
          <div className="mt-16 pt-12 border-t border-slate-700">
            <h3 className="text-2xl font-semibold text-white mb-8">提携スキーム</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-5 rounded-lg p-6 border border-white border-opacity-10">
                <p className="font-semibold text-emerald-400 mb-3 text-sm">TIER 1: 医療機関</p>
                <p className="text-sm text-slate-300 mb-4">初期導入（10-50患者）</p>
                <p className="text-2xl font-light text-white">120万円～</p>
                <p className="text-xs text-slate-400 mt-2">/月額（HIPAA統合含む）</p>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-6 border border-emerald-400 border-opacity-50">
                <p className="font-semibold text-emerald-400 mb-3 text-sm">TIER 2: 大規模医療網</p>
                <p className="text-sm text-slate-300 mb-4">エンタープライズデプロイ</p>
                <p className="text-2xl font-light text-emerald-400">カスタム見積</p>
                <p className="text-xs text-slate-400 mt-2">（API・EHR統合オプション）</p>
              </div>
              <div className="bg-white bg-opacity-5 rounded-lg p-6 border border-white border-opacity-10">
                <p className="font-semibold text-blue-400 mb-3 text-sm">TIER 3: 企業・保険者</p>
                <p className="text-sm text-slate-300 mb-4">従業員500名～</p>
                <p className="text-2xl font-light text-white">8円～/従業員/月</p>
                <p className="text-xs text-slate-400 mt-2">（統計分析・報告書付き）</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-slate-700">
            <p className="text-xl font-light text-white mb-8">
              HAISは、30年の神経科学、規制整備、臨床的証拠、市場需要の完全な収束を表します。科学は確立されている。時は今。
            </p>
            <button className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition">
              機関向けブリーフィングをスケジュール
            </button>
          </div>
        </div>
      </div>

      {/* ===== フッター ===== */}
      <footer className="bg-white px-6 lg:px-12 py-16 border-t border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-slate-600 mb-8 font-light">
            Objective. Continuous. Non-invasive. Evidence-based.
          </p>
          <p className="text-xs text-slate-500 font-light tracking-wider">
            © HIDEKI TAMAE. All Rights Reserved.<br />
            ACES CARE HUB JAPAN | REVERSE CIVILIZATION | SOLUNA | HAIS
          </p>
        </div>
      </footer>
    </div>
  );
}