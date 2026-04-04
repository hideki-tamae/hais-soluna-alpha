import { ScanHistory, CareAction } from '@prisma/client';
import { createHash } from 'crypto';

export interface ProofOfResonance {
  walletAddress: string;
  resonanceIndex: number;
  elasticityVolume: number;
  logicVersion: string;
  cryptographicHash: string;
}

/**
 * calculateAscentFromDepths
 * 茹でガエルの罠（isTrapped）からの回復プロセスを積分する。
 * 下落幅が大きいほど、Sync後の上昇ベクトルは高評価（弾性資産）となる。
 */
const calculateAscentFromDepths = (scans: ScanHistory[]): number => {
  if (scans.length < 2) return 0;
  let totalElasticity = 0;
  
  for (let i = 1; i < scans.length; i++) {
    const prev = scans[i-1].omegaScore;
    const curr = scans[i].omegaScore;
    if (curr > prev) {
      // 回復の勾配を計算。低域からの復帰にはボーナス係数を付与
      const multiplier = prev < 40 ? 2.0 : 1.0; 
      totalElasticity += (curr - prev) * multiplier;
    }
  }
  return totalElasticity;
};

export const generateProofOfResonance = (
  scans: ScanHistory[],
  actions: CareAction[]
): ProofOfResonance => {
  const elasticityVolume = calculateAscentFromDepths(scans);
  const actionAsset = actions.reduce((sum, action) => sum + action.impactScore, 0);

  // 共鳴指数 (Resonance Index) の算出式
  // R_i = E_v \times (1 + \frac{A_a}{100})
  const resonanceIndex = elasticityVolume * (1 + (actionAsset / 100));

  // 透明性のための監査ハッシュ生成
  const auditContent = JSON.stringify({ scans, actions, resonanceIndex });
  const cryptographicHash = createHash('sha256').update(auditContent).digest('hex');

  return {
    walletAddress: scans[0]?.userId || "unknown",
    resonanceIndex: parseFloat(resonanceIndex.toFixed(2)),
    elasticityVolume: parseFloat(elasticityVolume.toFixed(2)),
    logicVersion: scans[0]?.logicVersion || "Satsuma-v1.1",
    cryptographicHash
  };
};
