// useCareBridge.ts 最終修正版
import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

const SOLUNA_ADDRESS = process.env.NEXT_PUBLIC_SOLUNA_CONTRACT_ADDRESS as string;

// ★ Soluna.sol (0x5e37...) の実際の仕様に完全準拠
const SOLUNA_ABI = [
  "function mint(address to, uint256 amount) external",
  "function totalSupply() view returns (uint256)",
  "function cap() view returns (uint256)"
];

export const useCareBridge = () => {
  const [isMinting, setIsMinting] = useState(false);
  const { address } = useAccount();

  const mintProofOfCare = async (omegaScore: number): Promise<boolean> => {
    if (!(window as any).ethereum || !address) {
      alert("ウォレットを接続してください");
      return false;
    }

    console.log("Target Contract Address:", SOLUNA_ADDRESS);

    try {
      setIsMinting(true);

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const solunaContract = new ethers.Contract(SOLUNA_ADDRESS, SOLUNA_ABI, signer);

      // ★ omegaScore をトークン数量（18桁）に変換
      // 例: スコア115.9なら 115.9 SLNA ミントするロジック
      const amount = ethers.parseUnits(omegaScore.toString(), 18);

      console.log(`ミント実行中: To=${address}, Amount=${omegaScore} SLNA`);
      
      // ★ コントラクト側の mint(address, uint256) を呼び出す
      const tx = await solunaContract.mint(address, amount);
      
      console.log("Tx Hash:", tx.hash);
      await tx.wait();

      console.log("ミント成功！ ケアがブロックチェーンに刻まれました。");
      return true;

    } catch (error: any) {
      console.error("Web3 Bridge Error:", error);
      // オーナー権限がない場合のエラーハンドリング
      if (error.message.includes("reverted")) {
        alert("実行拒否: あなたのアドレス(0xD6E6...)にミント権限(Owner)があるか確認してください。");
      }
      return false;
    } finally {
      setIsMinting(false);
    }
  };

  return { mintProofOfCare, isMinting, address };
};