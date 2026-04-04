/**
 * Peak State Discovery (Satsuma Architecture v1.0)
 * 
 * ============================================================================
 * [Zenn / OSS公開用 設計思想: 薩摩哲学と茹でガエルの罠からの解放]
 * 
 * システム利用者が漸進的な不調（茹でガエルの罠）に陥った際、
 * OSが低下した状態を移動平均等で「現在の普通」として学習してしまうと、
 * 資本主義的な「機能不全社会」に迎合するバグとなります。
 * 
 * 当エンジンは、この罠を打破するため【薩摩哲学】の4次元ベクトルを実装します。
 * 
 * 1. 【地：知行合一】 (Logic)
 *    音声の生体スコア（知）だけが最高でも意味がありません。
 *    「その状態でCare Marketplaceにて他者をケアしたか・関わったか（行）」
 *    を掛け合わせた積分値こそが、真の Peak（頂点到達点）です。
 * 
 * 2. 【天：敬天愛人】 (Governance)
 *    過去90日で一度記録した Peak（天の理：絶対的ポテンシャル）は、システム内で
 *    決して下方修正（妥協）しません。しかし、それを現在の疲弊したユーザーに
 *    強制・強要・説教することは「独裁」です。提案は常に「同意ベース」で行います。
 * 
 * 3. 【人：不言実行】 (UI/UX)
 *    キャリブレーション（再設定）を促す際、AI特有の冗長なテキスト（議）を排し、
 *    UIには2つの波形の共鳴ビジュアルと "Sync"（同意）のみを置く「沈黙の提案」とします。
 * 
 * 4. 【郷中教育】 (Decentralized Resilience / Hope Routing)
 *    不調の底にいるユーザーに「過去の栄光（Peak）」だけを見せるのは残酷な場合があります。
 *    そこで、自分と全く同じ神経下降線を辿ったあと自力でPeakを更新した、
 *    名もなき他者（郷中の先輩）のベクトル推移をP2P的に参照し、
 *    「誰かの回復の軌跡そのものを、自分の希望とする」連隊網を構築します。
 * ============================================================================
 */

import { AnalysisResult, NeuralArchetype } from './polyvagalScoring';

// ----------------------------------------------------------------------------
// データ構造
// ----------------------------------------------------------------------------

export interface CareActionLog {
    sessionId: string;
    actionType: 'MINT_SOLUNA' | 'PROVIDE_CARE' | 'RECEIVE_CARE';
    impactScore: number; // ケアによる貢献度（1-100）
}

export interface UserDailyRecord {
    dateId: string; // YYYY-MM-DD
    voiceMetrics: AnalysisResult; // その日の代表的な音声分析結果（知）
    careActions: CareActionLog[]; // その日に行った行動（行）
}

export interface PeakWindow {
    startDate: string;
    endDate: string;
    peakScore: number;
    baseVoiceScore: number;
    actionMultiplier: number;
}

export interface CalibrationProposal {
    currentAverageScore: number;
    historicalPeakScore: number;
    // 不言実行(Silent UI): 説教となるテキストを持たず、発火の真偽と最低限のUIラベルのみ。
    shouldPropose: boolean;
    silentUiActionLabel: "Sync" | "Remember"; // UIでのみ使われる1単語
}

export interface GojuHopeVector {
    peerAnonymousId: string;
    sharedArchetype: NeuralArchetype;
    // 「底打ち」と「回復開始」の軌跡。個人情報なしの純粋なベクトル(0-100)
    descentVector: number[]; // 過去にあなたと同じようにスコアが落ちた軌跡
    ascentVector: number[];  // その後這い上がった軌跡
}

// ----------------------------------------------------------------------------
// 【地：知行合一】 真のPeakを特定するアルゴリズム
// ----------------------------------------------------------------------------
/**
 * 過去90日間の記録から「知識（生体状態）× 行動（ケア実績）」の合算が
 * 最も高かった期間（Peak Window）を特定する。
 */
export const findPeakWindow = (history90Days: UserDailyRecord[]): PeakWindow | null => {
    if (history90Days.length === 0) return null;

    let highestTheoreticalScore = 0;
    let bestRecord: UserDailyRecord | null = null;

    for (const record of history90Days) {
        // [知]: その日の純粋な脳神経キャパシティスコア
        const intellectScore = record.voiceMetrics.omegaScore;
        
        // [行]: その日に行ったアクションの総和による乗数
        // ※ 行動を伴うことで、単なる「健康」から「資産」へと昇華する
        let actionSum = 0;
        for (const action of record.careActions) {
            actionSum += action.impactScore;
        }
        
        // ベース 1.0 に、アクション量に応じたボーナス最大 1.5 倍を付与
        const actionMultiplier = 1.0 + Math.min(0.5, actionSum / 200); 

        // [知行合一]: 実際の価値
        const integratedScore = intellectScore * actionMultiplier;

        if (integratedScore > highestTheoreticalScore) {
            highestTheoreticalScore = integratedScore;
            bestRecord = record;
        }
    }

    if (!bestRecord) return null;

    // Peak Window として（概念上3日間のローリング平均等を用いる前提だが、今回は単日に簡略化）
    return {
        startDate: bestRecord.dateId,
        endDate: bestRecord.dateId,
        peakScore: parseFloat(highestTheoreticalScore.toFixed(2)),
        baseVoiceScore: bestRecord.voiceMetrics.omegaScore,
        actionMultiplier: parseFloat((highestTheoreticalScore / bestRecord.voiceMetrics.omegaScore).toFixed(2))
    };
}

// ----------------------------------------------------------------------------
// 【天：敬天愛人 & 人：不言実行】 透明なプロポーザルの生成
// ----------------------------------------------------------------------------
/**
 * 茹でガエルの罠を検知し、過去のPeakとの乖離が一定以上なら
 * 「沈黙の提案」を発行する。
 */
export const generateCalibrationProposal = (
    current3DayAverage: number, 
    peak: PeakWindow
): CalibrationProposal => {
    
    // 現在の平均が、過去のPeak（天の理）の 70% を下回っている場合、罠に陥っているとみなす。
    const DEGRADATION_THRESHOLD = 0.7;
    const isTrapped = (current3DayAverage / peak.peakScore) < DEGRADATION_THRESHOLD;

    return {
        currentAverageScore: current3DayAverage,
        historicalPeakScore: peak.peakScore,
        shouldPropose: isTrapped,
        // 不言実行: 「最近調子が悪いですね。過去のあなたは…」等のテキストは生成”させない”。
        // 直感に訴えかけるただ1語のボタンラベルのみを提供する。
        silentUiActionLabel: "Sync" 
    };
};

// ----------------------------------------------------------------------------
// 【郷中教育】 P2P 分散型レジリエンス (Hope Routing)
// ----------------------------------------------------------------------------
/**
 * 茹でガエルの底にいるユーザーに「自分と同じパターンの底から生還した」
 * アノニマスなネットワーク・ピアの軌跡を提示し、希望とする。
 */
export const findGojuHope = (
    clientRecentVector: number[], 
    networkHistories: any[] // 実際はDBからの過去履歴データ
): GojuHopeVector | null => {
    
    // モック実装: 最もベクトル下落の傾き（相関）が近かったピアを探し出し、
    // そのピアがその後上昇（回復）したベクトルの部分のみを抽出して返す。
    // （GDPR対応のため、絶対的なアイデンティティは持たせず、純粋な数値配列のみを保証）

    if (clientRecentVector.length < 3) return null;

    // 仮の回復ベクトル生成モック（本来はCos類似度などで networkHistories から抽出）
    const simulatedDescent = [...clientRecentVector]; // 自分の過去数日と同じ下落
    const simulatedAscent = [
        clientRecentVector[clientRecentVector.length - 1] * 1.1,
        clientRecentVector[clientRecentVector.length - 1] * 1.4,
        clientRecentVector[clientRecentVector.length - 1] * 1.8 
    ];

    return {
        peerAnonymousId: "anonymous-peer-goju-773",
        sharedArchetype: "DorsalIntrospective", // あなたと同じ性質
        descentVector: simulatedDescent,
        ascentVector: simulatedAscent
    };
};
