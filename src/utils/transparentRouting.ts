/**
 * transparentRouting.ts
 * 
 * ============================================================================
 * [設計思想: 同意ベースの透過的ルーティング]
 * 
 * これまでのアルゴリズムでは、「ユーザーの神経ベクトル（トラウマ履歴）」と
 * 「ヒーラーの神経ベクトル」をシステム側で勝手に照合し、サイレントに
 * マッチングさせることで、GDPRおよび倫理的な「同意（Consent）」の欠如という
 * 問題（優しい強制・プロファイリング）を抱えていました。
 * 
 * このユーティリティは、「なぜこのヒーラーが選ばれたのか」を明示し、
 * ユーザーが『自発的に』そのマッチングを受け入れる（または拒否する）ための
 * 「トランスペアレント・マッチングモック」を提供します。
 * ============================================================================
 */

import { AnalysisResult } from './polyvagalScoring';

export interface HealerProfile {
  id: string;
  name: string;
  pastTraumaState: 'VENTRAL' | 'SYMPATHETIC' | 'DORSAL' | 'MIXED';
  baseOmegaScore: number;
}

export interface HealerMatch {
  healerId: string;
  healerName: string;
  matchScore: number;          // 相補性の高さ (0-100)
  matchReason: string;         // なぜこの人が選ばれたかの「透明な説明」
  isConsentGranted: boolean;   // ユーザーの同意ステータス (初期値は false)
  sharedPattern: string;     
}

/**
 * トランスペアレントなWounded Healer推薦（モック）
 * @param clientResult ユーザーの現在の神経状態スキャン結果
 * @param healerCandidates データベース上のヒーラー一覧
 * @returns ユーザーへの「オススメ理由」を伴うマッチングオブジェクト
 */
export const routeToWoundedHealer = async (
  clientResult: AnalysisResult,
  healerCandidates: HealerProfile[]
): Promise<HealerMatch> => {
  
  // モックとしてのアルゴリズム: クライアントの State と ヒーラーの PastTraumaState が
  // 一致、または相補的な関係にあるかを探す。
  // ここでは例として「同じ状態を過去に経験して乗り越えた人」をベストマッチとする。

  let bestCandidate = healerCandidates[0];
  let highestResonance = 0;
  let shared = '未定義';

  for (const healer of healerCandidates) {
    let resonance = 50; // ベーススコア
    
    if (clientResult.dominantState === healer.pastTraumaState) {
        resonance += 40; // 同一のトラウマ状態を経験していると共鳴力が高い
        shared = clientResult.dominantState;
    } else if (clientResult.dominantState === 'MIXED') {
        resonance += 20;
        shared = '複雑な状態遷移';
    }

    if (resonance > highestResonance) {
        highestResonance = resonance;
        bestCandidate = healer;
    }
  }

  // 「秘密のプロファイリング」ではなく、ユーザーに開示するための説明文を生成
  let explanation = '';
  switch (shared) {
    case 'DORSAL':
      explanation = `このヒーラーは、あなたと同じように「深い凍結（背側迷走神経のシャットダウン）」の状態を経験し、そこから回復した履歴を持つ方です。`;
      break;
    case 'SYMPATHETIC':
      explanation = `このヒーラーは、あなたと同じように「強い過覚醒（交感神経のファイト/フライト）」の状態を乗り越え、自身のエネルギーをコントロールできるようになった方です。`;
      break;
    default:
      explanation = `このヒーラーは、あなたが持っている複雑な神経ベクトルと強い共鳴（相補性）を示す方です。`;
  }

  return {
    healerId: bestCandidate.id,
    healerName: bestCandidate.name,
    matchScore: highestResonance,
    matchReason: explanation,
    sharedPattern: shared,
    isConsentGranted: false // 重要: デフォルトは未同意。ユーザーがUIでボタンを押して初めて True になる
  };
};

/**
 * 同意のトランザクションをブロックチェーンやバックエンドに記録する関数
 */
export const recordMatchingConsent = async (match: HealerMatch): Promise<boolean> => {
    if (!match.isConsentGranted) {
        console.error("同意が得られていないため、マッチングを確定できません。");
        return false;
    }
    
    console.log(`[Audit Log] User consented to match with Healer ${match.healerId}. Reason explicitly shared: ${match.matchReason}`);
    // ここでバックエンド（HAIS Brain）へ確証トラフィックを流す
    return true;
};
