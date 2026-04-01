const { expect } = require("chai");
const { ethers } = require("hardhat");

// テスト対象のコントラクト名
const CONTRACT_NAME = "SolunaToken"; 

// コントラクト内のkeccak256(abi.encodePacked(to, amount, nonce))と一致させるためのヘルパー関数
// ethers v6のsolidityPackedKeccak256を使用
function getMessageHash(claimer, amount, nonce) {
    return ethers.solidityPackedKeccak256(
        ["address", "uint256", "bytes32"],
        [claimer, amount, nonce]
    );
}

describe("ClaimSecurity: Nonce Verification", function () {
    let solunaToken;
    let deployer;
    let claimant;
    let signer; // バックエンドAPIの役割を果たす署名者

    // セットアップ
    beforeEach(async function () {
        // 1. アカウントの取得
        [deployer, claimant, signer] = await ethers.getSigners();
        
        // 2. コントラクトのデプロイ
        const Soluna = await ethers.getContractFactory(CONTRACT_NAME);
        
        // 🚨 修正: コンストラクタ引数 (signer.address) を渡す
        // 🚨 修正: .deployed() は v6 では不要なため削除
        solunaToken = await Soluna.deploy(signer.address); 
    });

    it("should successfully claim tokens on the first attempt (valid nonce)", async function () {
        // 🚨 修正: parseUnits は ethers.parseUnits に変更
        const claimAmount = ethers.parseUnits("100", 18); 
        // 🚨 修正: formatBytes32String は ethers.encodeBytes32String に変更
        const uniqueNonce = ethers.encodeBytes32String("test_nonce_1"); 
        
        // 署名データの作成 (getMessageHashヘルパー関数を使用)
        const hash = getMessageHash(claimant.address, claimAmount, uniqueNonce);
        
        // 署名者 (signer) がメッセージハッシュに署名
        // 🚨 修正: arrayify は ethers.getBytes に変更
        const signature = await signer.signMessage(ethers.getBytes(hash));

        // 1. Claimに成功することを期待
        await solunaToken.claimToken(claimant.address, claimAmount, signature, uniqueNonce);

        // 2. トークンが発行されていることを確認
        expect(await solunaToken.balanceOf(claimant.address)).to.equal(claimAmount);
        
        // 3. Nonceが使用済みになっていることを確認
        expect(await solunaToken.usedNonces(uniqueNonce)).to.be.true;
    });

    it("should fail to claim tokens on the second attempt with the same nonce (replay attack)", async function () {
        const claimAmount = ethers.parseUnits("100", 18);
        const usedNonce = ethers.encodeBytes32String("replay_nonce_1");
        
        // 署名データの作成
        const hash = getMessageHash(claimant.address, claimAmount, usedNonce);
        const signature = await signer.signMessage(ethers.getBytes(hash));

        // 1. 初回Claimを成功させる
        await solunaToken.claimToken(claimant.address, claimAmount, signature, usedNonce);

        // 2. 同じNonceでClaimを試行 (リプレイ攻撃のシミュレーション)
        // 🚨 監査チェックポイント: トランザクションがリバートされることを期待
        await expect(
            solunaToken.claimToken(claimant.address, claimAmount, signature, usedNonce)
        ).to.be.revertedWith("Nonce has already been used (Replay attack detected).");
    });
});