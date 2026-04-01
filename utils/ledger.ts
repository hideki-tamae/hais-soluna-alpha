// utils/ledger.ts

export type Transaction = {
  id: string;
  amount: number;
  type: string; // 'INITIAL_GRANT', 'VOICE_COMMITMENT', etc.
  timestamp: string;
  hash?: string;
};

const STORAGE_KEY_BALANCE = 'soluna_balance';
const STORAGE_KEY_TX = 'soluna_transactions';

// 残高を取得 (なければ0)
export const getBalance = (): number => {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(STORAGE_KEY_BALANCE);
  return stored ? parseFloat(stored) : 0;
};

// トランザクション履歴を取得
export const getTransactions = (): Transaction[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY_TX);
  return stored ? JSON.parse(stored) : [];
};

// トランザクションを保存して残高を更新
export const saveTransaction = (amount: number, type: string, proofHash?: string): Transaction | null => {
  if (typeof window === 'undefined') return null;

  const currentBalance = getBalance();
  const newBalance = currentBalance + amount;
  
  // 新しいトランザクションを作成
  const newTx: Transaction = {
    id: crypto.randomUUID(),
    amount,
    type,
    timestamp: new Date().toISOString(),
    hash: proofHash || `0x${Math.random().toString(16).slice(2)}...`
  };

  // 履歴に追加 (最新が先頭に来るように)
  const currentTx = getTransactions();
  const updatedTx = [newTx, ...currentTx];

  // 保存
  localStorage.setItem(STORAGE_KEY_BALANCE, newBalance.toString());
  localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(updatedTx));

  return newTx;
};