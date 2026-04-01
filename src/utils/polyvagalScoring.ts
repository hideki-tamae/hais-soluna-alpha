/**
 * Polyvagal Theory Dynamic Scoring Engine (v3.1.2)
 * - Added HNR Noise Gate
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

interface VoiceMetrics {
    jitter: number;
    shimmer: number;
    hnr: number;
}

// ★戻り値の型に NOISE_DETECTED と error を追加
interface AnalysisResult {
    dominantState: 'VENTRAL' | 'SYMPATHETIC' | 'DORSAL' | 'MIXED' | 'NOISE_DETECTED';
    ventralScore: number;
    sympatheticScore: number;
    dorsalScore: number;
    confidence: number;
    omegaScore: number;
    timestamp?: string;
    error?: string;
}

export function analyzePolyvagalState(metrics: VoiceMetrics): AnalysisResult {
    const { jitter, shimmer, hnr } = metrics;

    // =========================================================================
    // HNR NOISE GATE（防波堤）
    // 環境ノイズが声の信号を上回っている(HNRがマイナス)場合は計算を打ち切る
    // =========================================================================
    if (hnr < 0) {
        return {
            dominantState: 'NOISE_DETECTED',
            ventralScore: 0,
            sympatheticScore: 0,
            dorsalScore: 0,
            confidence: 0,
            omegaScore: 0,
            error: '環境ノイズが大きすぎます。静かな場所で再度スキャンしてください。',
            timestamp: new Date().toISOString(),
        };
    }

    const normJitter = clampAndNormalize(jitter, BOUNDS.JITTER.MIN, BOUNDS.JITTER.MAX);
    const normShimmer = clampAndNormalize(shimmer, BOUNDS.SHIMMER.MIN, BOUNDS.SHIMMER.MAX);
    const normHnr = clampAndNormalize(hnr, BOUNDS.HNR.MIN, BOUNDS.HNR.MAX);

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

    let omegaScore = 0;
    if (finalState === 'DORSAL') {
        omegaScore = 50 + (dorsalScore * 0.5);
    } else if (finalState === 'SYMPATHETIC') {
        omegaScore = 20 + (sympatheticScore * 0.5);
    } else if (finalState === 'VENTRAL') {
        omegaScore = Math.max(0, 20 - (ventralScore * 0.2));
    } else if (finalState === 'MIXED') {
        omegaScore = (sympatheticScore * 0.5 + dorsalScore * 0.5) * 0.5 + 15;
    }

    const trustMultiplier = Math.min(1.0, Math.max(0.5, confidence / 15.0));
    const finalOmegaScore = parseFloat((omegaScore * trustMultiplier).toFixed(2));

    return {
        dominantState: finalState,
        ventralScore: parseFloat(ventralScore.toFixed(2)),
        sympatheticScore: parseFloat(sympatheticScore.toFixed(2)),
        dorsalScore: parseFloat(dorsalScore.toFixed(2)),
        confidence: parseFloat(confidence.toFixed(2)),
        omegaScore: Math.max(0.5, finalOmegaScore),
        timestamp: new Date().toISOString(),
    };
}