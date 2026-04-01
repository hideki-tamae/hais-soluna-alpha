import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Starting deployment of SOLUNA Proof-of-Care...");

  // 1. デプロイする人（オーナー）の情報を取得
  const [deployer] = await ethers.getSigners();
  console.log("👨‍🎨 Deploying contract with account:", deployer.address);

  // 2. ProofOfCareコントラクトの工場を取得
  // ここを "SolunaToken" ではなく "ProofOfCare" に修正しました
  const ProofOfCare = await ethers.getContractFactory("ProofOfCare");

  // 3. デプロイ実行
  // コンストラクタの引数 (initialOwner) にデプロイ実行者のアドレスを渡します
  const proofOfCare = await ProofOfCare.deploy(deployer.address);

  // 4. デプロイ完了待ち
  await proofOfCare.waitForDeployment();

  // 5. 住所（アドレス）の表示
  const address = await proofOfCare.getAddress();
  console.log("🌞 SOLUNA ProofOfCare deployed to:", address);
  console.log("📝 Copy this address to your frontend!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});