// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// v5.0+ では MessageHashUtils を使用
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SolunaToken is ERC20, Ownable {
    // using ECDSA for bytes32; // <== これは不要になる

    // 監査チェックポイント: リプレイ攻撃防止
    mapping(bytes32 => bool) public usedNonces;

    // バックエンドAPIの署名アドレスをオーナーが設定（Claim承認の権限を持つアドレス）
    address public claimSigner;

    constructor(address initialClaimSigner) ERC20("SOLUNA", "SLN") Ownable(msg.sender) {
        claimSigner = initialClaimSigner;
    }

    // Claim承認者アドレスを更新する関数（オーナーのみ実行可能）
    function setClaimSigner(address newSigner) public onlyOwner {
        claimSigner = newSigner;
    }

    // トークン発行のメイン関数 (Claimロジック)
    function claimToken(address to, uint256 amount, bytes memory signature, bytes32 nonce) public {
        // 1. Nonceが過去に使用されていないことを確認
        require(!usedNonces[nonce], "Nonce has already been used (Replay attack detected).");
        
        // 2. メッセージハッシュを作成 (EIP-712を推奨しますが、ここではabi.encodePackedを維持)
        bytes32 rawHash = keccak256(abi.encodePacked(to, amount, nonce));
        
        // 3. EIP-191のプレフィックスを付けて署名検証用のハッシュを生成
        // MessageHashUtils.to="EthSignedMessageHash"がこれを行う (v5.0+パターン)
        bytes32 signedMessageHash = MessageHashUtils.toEthSignedMessageHash(rawHash);
        
        // 4. 署名がClaim承認者（API）によって行われたことを検証
        address recoveredSigner = ECDSA.recover(signedMessageHash, signature);

        require(recoveredSigner == claimSigner, "Invalid signature or unauthorized signer.");

        // 5. トークンの発行
        _mint(to, amount);

        // 6. Nonceを使用済みとして記録
        usedNonces[nonce] = true;
    }
}