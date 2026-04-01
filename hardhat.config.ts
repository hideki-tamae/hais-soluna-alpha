import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config"; // .envを読み込む魔法

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BASE_SEPOLIA_URL = process.env.BASE_SEPOLIA_URL || "https://sepolia.base.org";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    // 👇 Base Sepoliaの設定を追加しました
    "base-sepolia": {
      url: BASE_SEPOLIA_URL,
      accounts: PRIVATE_KEY !== "" ? [PRIVATE_KEY] : [],
      gasPrice: 1000000000, // ガス代の設定（少し余裕を持たせる）
    },
  },
  // EtherscanでVerify（認証）するための設定（今回はBase用）
  etherscan: {
    apiKey: {
     "base-sepolia": "PLACEHOLDER_STRING", // Base SepoliaはAPIキーなしでも通ることが多いですが、必要ならBlockscout等のキーを
    },
    customChains: [
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com"
        }
      }
    ]
  },
};

export default config;