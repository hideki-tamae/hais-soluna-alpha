import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

// テスト対象のコントラクト名
const CONTRACT_NAME = "SolunaToken"; 
// const INITIAL_SUPPLY = ethers.parseEther("0"); // 未使用のためコメントアウト

// 署名検証に必要なヘルパー関数
function getMessageHash(claimer: string, amount: bigint, nonce: string): string {
    // コントラクト内のkeccak256(abi.encodePacked(to, amount, nonce))と一致させる
    return ethers.solidityPackedKeccak256(
        ["address", "uint256", "bytes32"],
        [claimer, amount, nonce]
    );
}

describe("🌑 SOLUNA Token Test Suite", function () {
    
    // HardhatのFixture: テスト間の状態をリセットし高速化
    // 🚨 修正: deploySolunaFixture の定義を一つに統一し、必要なアカウントをすべて追加
    async function deploySolunaFixture() {
        // 1. アカウントの取得
        const [owner, claimSigner, receiver, otherAccount] = await ethers.getSigners(); 

        // 2. コントラクトのデプロイ
        const SolunaFactory = await ethers.getContractFactory(CONTRACT_NAME);
        const soluna = await SolunaFactory.deploy(claimSigner.address); 
        
        // 以下の設定は、テストで共通して使用できるように定義
        const tokenAmount = ethers.parseEther("100");
        const initialNonce = ethers.encodeBytes32String("test-nonce-1");
        
        // 🚨 修正: otherAccount を return オブジェクトに追加
        return { soluna, owner, claimSigner, receiver, otherAccount, tokenAmount, initialNonce };
    }
    
    // ----------------------------------------------------------------------
    // ## 1. Deployment & Metadata
    // ----------------------------------------------------------------------
    describe("Deployment & Metadata", function () {
        it("Should set the right owner and claim signer", async function () {
            const { soluna, owner, claimSigner } = await loadFixture(deploySolunaFixture);

            // Ownerの確認
            expect(await soluna.owner()).to.equal(owner.address);
            // Claim Signerの確認
            expect(await soluna.claimSigner()).to.equal(claimSigner.address);
        });

        it("Should have correct name and symbol", async function () {
            const { soluna } = await loadFixture(deploySolunaFixture);
            expect(await soluna.name()).to.equal("SOLUNA"); 
            expect(await soluna.symbol()).to.equal("SLN");
        });
    });

    // ----------------------------------------------------------------------
    // ## 2. Claim Security & Minting Logic
    // ----------------------------------------------------------------------
    describe("ClaimSecurity: Nonce & Signature Verification", function () {
        
        it("Should successfully claim tokens on the first attempt (valid signature)", async function () {
            const { soluna, claimSigner, receiver, tokenAmount, initialNonce } = await loadFixture(deploySolunaFixture);

            // 1. メッセージハッシュを生成
            const hash = getMessageHash(receiver.address, tokenAmount, initialNonce);
            
            // 2. Claim署名者の秘密鍵で署名
            const signature = await claimSigner.signMessage(ethers.getBytes(hash));
            
            // 3. Claimを実行
            await expect(soluna.claimToken(receiver.address, tokenAmount, signature, initialNonce))
                .to.not.be.reverted;

            // 4. トークンの残高を確認
            expect(await soluna.balanceOf(receiver.address)).to.equal(tokenAmount);
            
            // 5. Nonceが使用済みであることを確認
            expect(await soluna.usedNonces(initialNonce)).to.be.true;
        });

        it("Should fail if the same nonce is used again (Replay Attack)", async function () {
            const { soluna, claimSigner, receiver, tokenAmount, initialNonce } = await loadFixture(deploySolunaFixture);

            // 1. 最初の成功 (上記テストと同様)
            const hash = getMessageHash(receiver.address, tokenAmount, initialNonce);
            const signature = await claimSigner.signMessage(ethers.getBytes(hash));
            await soluna.claimToken(receiver.address, tokenAmount, signature, initialNonce);

            // 2. 同じ Nonce で再度 Claim を試行し、リバートすることを確認
            await expect(soluna.claimToken(receiver.address, tokenAmount, signature, initialNonce))
                .to.be.revertedWith("Nonce has already been used (Replay attack detected).");
        });

        it("Should fail with an invalid signature (Unauthorized Signer)", async function () {
            const { soluna, owner, receiver, tokenAmount, initialNonce } = await loadFixture(deploySolunaFixture);

            // 1. メッセージハッシュを生成
            const hash = getMessageHash(receiver.address, tokenAmount, initialNonce);
            
            // 2. Claim権限のないOwnerアドレスで署名 (不正な署名)
            const signature = await owner.signMessage(ethers.getBytes(hash));
            
            // 3. Claimを実行し、署名エラーでリバートすることを確認
            await expect(soluna.claimToken(receiver.address, tokenAmount, signature, initialNonce))
                .to.be.revertedWith("Invalid signature or unauthorized signer.");
        });

        it("Should allow the owner to update the claim signer address", async function () {
            const { soluna, owner, receiver } = await loadFixture(deploySolunaFixture);
            
            // 新しい署名者アドレスを設定
            await expect(soluna.setClaimSigner(receiver.address))
                .to.not.be.reverted;
            
            // 新しいアドレスが設定されていることを確認
            expect(await soluna.claimSigner()).to.equal(receiver.address);
        });

        it("Should fail if a non-owner tries to update the claim signer", async function () {
            const { soluna, otherAccount, receiver } = await loadFixture(deploySolunaFixture);
            
            // Owner以外のユーザーが実行し、リバートすることを確認
            await expect(soluna.connect(otherAccount).setClaimSigner(receiver.address))
                .to.be.revertedWithCustomError(soluna, "OwnableUnauthorizedAccount");
        });
    });
});