// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 世界標準のセキュリティ規格 (OpenZeppelin) を採用
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SOLUNA Proof-of-Care (SBT)
 * @dev ケア（優しさ）と生命（Vital）を証明するためのNFT。
 * "Care Capitalism" の基軸通貨となる資産。
 */
contract ProofOfCare is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;

    // ケア証明データの構造体
    struct CareData {
        uint256 timestamp;   // 証明された日時
        uint256 vitalScore;  // バイタルスコア (Vital Proof)
        string proofType;    // "Visual" or "Voice" etc.
    }

    // TokenID ごとにケアデータを紐付けるマッピング
    mapping(uint256 => CareData) public careRecords;

    // イベント: 世界に「ケア」が刻まれたことを通知する
    event CareMinted(address indexed healer, uint256 tokenId, uint256 vitalScore);

    constructor(address initialOwner)
        ERC721("SOLUNA Proof-of-Care", "CARE")
        Ownable(initialOwner)
    {
        // TokenIDは 1 からスタート（0は欠番）
        _nextTokenId = 1;
    }

    /**
     * @dev ユーザーが自分のケアを証明してNFTを発行する関数
     * @param to 受取人のアドレス
     * @param uri メタデータ(JSON)のURL (IPFSなど)
     * @param vitalScore 測定されたバイタルスコア
     */
    function safeMint(address to, string memory uri, uint256 vitalScore) public {
        uint256 tokenId = _nextTokenId++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        // ブロックチェーンに「生きた証」を刻む
        careRecords[tokenId] = CareData({
            timestamp: block.timestamp,
            vitalScore: vitalScore,
            proofType: "Visual_Voice_Hybrid"
        });

        emit CareMinted(to, tokenId, vitalScore);
    }

    // --- 以下、必須のオーバーライド関数 (Boilerplate) ---

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}