const { PrismaClient } = require('@prisma/client');
const { generateProofOfResonance } = require('../src/utils/authoritativeOracle');
const prisma = new PrismaClient();
// ...
async function main() {
  // ★ ここを「あなたの実際のウォレットアドレス」に書き換えてください
  const wallet = "0xD6E601AB09A05d60267167e7B21E6dD24D149d79";
  console.log("🚀 Starting Elasticity Simulation for:", wallet);
  // ...

  // 1. ユーザー作成
  const user = await prisma.user.upsert({
    where: { walletAddress: wallet },
    update: {},
    create: { walletAddress: wallet, baseAcesScore: 4.0 }
  });

  // 2. 絶望への下落シナリオ（Omega 80 -> 30）
  // logicVersion: "Satsuma-v1.1" を明示的に記録
  const history = [
    { score: 80, state: "ventral" },
    { score: 65, state: "mixed" },
    { score: 45, state: "sympathetic" },
    { score: 30, state: "dorsal" }
  ];

  for (const h of history) {
    await prisma.scanHistory.create({
      data: {
        userId: user.id,
        omegaScore: h.score,
        neuralState: h.state,
        logicVersion: "Satsuma-v1.1"
      }
    });
  }

  // 3. 茹でガエルの罠とSyncの提案をセット
  await prisma.peakCalibration.upsert({
    where: { userId: user.id },
    update: {
      isTrapped: true,
      proposedSync: true,
      peakScore: 80,
      syncReasonJa: "本来のあなたより60%低下しています"
    },
    create: {
      userId: user.id,
      peakScore: 80,
      isTrapped: true,
      proposedSync: true,
      syncReasonJa: "本来のあなたより60%低下しています"
    }
  });

  // 4. ケア行動（利他）の記録。これが共鳴指数のブースターになる
  await prisma.careAction.create({
    data: { userId: user.id, actionType: "PROVIDE_CARE", impactScore: 150 }
  });

  // 5. 回復の執行（Omega 85への急上昇）
  await prisma.scanHistory.create({
    data: {
      userId: user.id,
      omegaScore: 85,
      neuralState: "ventral",
      logicVersion: "Satsuma-v1.1"
    }
  });

  console.log("✅ Data Seeded. Calling Oracle...");

  // 6. オラクルの召喚（共鳴指数の算出）
  const scans = await prisma.scanHistory.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'asc' }
  });
  const actions = await prisma.careAction.findMany({
    where: { userId: user.id }
  });

  const proof = generateProofOfResonance(scans, actions);

  console.log("\n--- 🔮 Resonance Oracle Result ---");
  console.log("Wallet:", proof.walletAddress);
  console.log("Elasticity Volume (弾性総量):", proof.elasticityVolume);
  console.log("Resonance Index (共鳴資産):", proof.resonanceIndex);
  console.log("Logic Version:", proof.logicVersion);
  console.log("Audit Hash:", proof.cryptographicHash);
  console.log("----------------------------------\n");
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
