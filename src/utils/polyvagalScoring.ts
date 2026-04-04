/**
 * Polyvagal Theory Transparent Scoring Engine (v4.0.0 - Transparent Multiplier)
 * 
 * ============================================================================
 * [Zenn / Open Source 公開用設計思想ノート]
 * 
 * 以前のバージョン(v3)までに存在した「アルゴリズムによる専制（独裁）」を反省し、
 * Care Capitalism の根幹である「信用（信）」を確保するための透過型・同意型エンジンへ
 * アーキテクチャを全面刷新しました。
 * 
 * 【変更の要点】
 * 1. 係数の民主化:
 *    特定状態（例：Ventral）を "良い" と勝手に重み付けすることを「資本主義OSのバグ」
 *    とみなし、ユーザー自身が自分の目指す神経パターン（アーキタイプ）と
 *    重み付け（α, β, γ）を選択できる設計（Transparent Multiplier）に移行しました。
 * 
 * 2. 初期設定（デフォルト）の思想:
 *    システムが勝手に価値を決めることを防ぐため、デフォルトのプロファイルは
 *    V, S, D 全てに「1:1:1」の等価な価値(Neutral)を割り当てます。
 * 
 * 3. Re-Verse Multiplier（ACEs as Assets 仮説）の公開:
 *    「過酷な逆境（ACEs）経験者は、高い共鳴能力＝ケア能力を持つ」という仮説の下、
 *    背側迷走神経（Dorsal / 凍結）優位の際にかかる乗数（デフォルト1.5倍）を
 *    隠蔽せず、オープンな設定事項として公開・議論可能な形にしています。
 * ============================================================================
 */

const BOUNDS = {
    JITTER: { MIN: 0.1, MAX: 40.0 },
    SHIMMER: { MIN: 1.0, MAX: 25.0 },
    HNR: { MIN: -10.0, MAX: 30.0 },
};

const clampAndNormalize = (val: number, min: number, max: number): number => {
    const clamped = Math.max(min, Math.min(max, val));
    return ((clamped - min) / (max - min)) * 100;
};

export interface VoiceMetrics {
    jitter: number;
    shimmer: number;
    hnr: number;
}

export type NeuralArchetype = 
  | "VentralDominant"       // 社会的参与・共感優先
  | "SympatheticBalanced"   // 活動性と回復のバランス
  | "DorsalIntrospective"   // 内省・深い思考優先
  | "NeutralDefault"        // システムの押し付けを排除した初期設定（1:1:1）
  | "CustomWeighted";       // ユーザー自身が設定した自己決定係数

export interface NeuralWeights {
  alpha: number; // Ventral (腹側迷走神経) の重み
  beta: number;  // Sympathetic (交感神経) の重み
  gamma: number; // Dorsal (背側迷走神経) の重み
  reVerseMultiplier: number; // トラウマからの回復力（ACEs as Assets）の乗数 (例: 1.5)
}

export interface UserNeuralProfile {
  archetype: NeuralArchetype;
  weights: NeuralWeights;
  transparencyMode: "basic" | "advanced";
  consentTimestamp?: Date;
  auditLog?: string;
}

// 初期デフォルト：資本主義的偏重（特定状態が高スコアになる仕様）を避け、平等を確保
export const NEUTRAL_PROFILE: UserNeuralProfile = {
  archetype: "NeutralDefault",
  weights: {
    alpha: 0.333,
    beta: 0.333,
    gamma: 0.334,
    reVerseMultiplier: 1.5 
  },
  transparencyMode: "advanced",
  auditLog: "[System] Default neutral weighting applied to prevent algorithmic dictatorship."
};

// ============================================================================
// 分析結果の型定義
// ============================================================================
export interface AnalysisResult {
    dominantState: 'VENTRAL' | 'SYMPATHETIC' | 'DORSAL' | 'MIXED' | 'NOISE_DETECTED';
    ventralScore: number;
    sympatheticScore: number;
    dorsalScore: number;
    confidence: number;
    omegaScore: number;       // 市場取引に使う単一スカラー（透過的乗数で計算済）
    timestamp?: string;
    error?: string;
    appliedProfile?: UserNeuralProfile; // どの係数が計算に使われたかの証明
}

/**
 * ポリヴェーガル状態分析エンジン（透過的乗数対応版）
 */
export function analyzePolyvagalState(
    metrics: VoiceMetrics,
    userProfile: UserNeuralProfile = NEUTRAL_PROFILE
): AnalysisResult {
    const { jitter, shimmer, hnr } = metrics;

    // HNR NOISE GATE（防波堤）
    if (hnr < 0) {
        return {
            dominantState: 'NOISE_DETECTED',
            ventralScore: 0, sympatheticScore: 0, dorsalScore: 0,
            confidence: 0, omegaScore: 0,
            error: '環境ノイズが大きすぎます。静かな場所で再度スキャンしてください。',
            timestamp: new Date().toISOString(),
        };
    }

    // 各指標の正規化
    const normJitter = clampAndNormalize(jitter, BOUNDS.JITTER.MIN, BOUNDS.JITTER.MAX);
    const normShimmer = clampAndNormalize(shimmer, BOUNDS.SHIMMER.MIN, BOUNDS.SHIMMER.MAX);
    const normHnr = clampAndNormalize(hnr, BOUNDS.HNR.MIN, BOUNDS.HNR.MAX);

    // 基底状態ベクトルの算出（ここは物理的/音響学的指標に基づく純粋な計算）
    const ventralScore = ((100 - normJitter) + (100 - normShimmer) + normHnr) / 3;
    const sympatheticScore = (normJitter + (100 - normHnr)) / 2;
    const dorsalScore = (normShimmer + (100 - normHnr)) / 2;

    const scores = [
        { state: 'VENTRAL' as const, score: ventralScore },
        { state: 'SYMPATHETIC' as const, score: sympatheticScore },
        { state: 'DORSAL' as const, score: dorsalScore }
    ].sort((a, b) => b.score - a.score);

    const dominantState = scores[0].state;
    const confidence = scores[0].score - scores[1].score;
    const finalState = confidence < 15 ? 'MIXED' : dominantState;

    // ------------------------------------------------------------------------
    // 透過的乗数（Transparent Multiplier）による Omega Score の算出
    // ------------------------------------------------------------------------
    // 以前のブラックボックス化された条件分岐を破棄。
    // ユーザーが合意・選択したプロファイル(weights)のみを用いて市場向けスコアを算出する。
    const { alpha, beta, gamma, reVerseMultiplier } = userProfile.weights;
    
    let baseOmegaScore = 
        (ventralScore * alpha) + 
        (sympatheticScore * beta) + 
        (dorsalScore * gamma);

    // Re-Verse Factor: 逆境（凍結/MIXED）の経験を資産化する特例係数
    if (finalState === 'DORSAL' || finalState === 'MIXED') {
        baseOmegaScore = baseOmegaScore * reVerseMultiplier;
    }

    const trustMultiplier = Math.min(1.0, Math.max(0.5, confidence / 15.0));
    const finalOmegaScore = parseFloat((baseOmegaScore * trustMultiplier).toFixed(2));

    return {
        dominantState: finalState,
        ventralScore: parseFloat(ventralScore.toFixed(2)),
        sympatheticScore: parseFloat(sympatheticScore.toFixed(2)),
        dorsalScore: parseFloat(dorsalScore.toFixed(2)),
        confidence: parseFloat(confidence.toFixed(2)),
        omegaScore: Math.max(0.5, finalOmegaScore),
        timestamp: new Date().toISOString(),
        appliedProfile: userProfile // 透明性の担保（証跡）
    };
}