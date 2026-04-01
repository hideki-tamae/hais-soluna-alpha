// utils/token-policy.ts

export type UserTier = 'CITIZEN' | 'NOMAD';

export interface TokenPolicy {
  amount: number;
  label: string;
  description: string;
}

// 文明の分配ルール定義
export const TOKEN_POLICY: Record<UserTier, TokenPolicy> = {
  CITIZEN: {
    amount: 500, // 購入者には正規の市民権と十分な資本を
    label: 'Citizen Grant',
    description: '書籍購入による正規市民権の証明'
  },
  NOMAD: {
    amount: 50,  // Unlimitedユーザーには体験版の資本を (1/10)
    label: 'Nomad Stipend',
    description: '知の探索者への短期滞在報酬'
  }
};

/**
 * 提出された証拠(Evidence)に基づいて階級を判定するオラクル機能
 * 将来的にはここで画像解析AIが走る想定
 */
export const analyzeEvidence = (source: 'AMAZON_HISTORY' | 'KINDLE_UNLIMITED'): UserTier => {
  // Amazon購入履歴なら市民
  if (source === 'AMAZON_HISTORY') return 'CITIZEN';
  
  // それ以外(Unlimited)ならノマド
  return 'NOMAD';
};