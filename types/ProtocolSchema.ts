// types/ProtocolSchema.ts

/**
 * SOLUNA CARE PROTOCOL - GENESIS EDITION
 * * このスキーマは、人間の「魂（Soul）」をデジタル空間における
 * 「価値（Value）」と「美（Art）」に変換するための統一規格です。
 */

// --- Layer 1: The Truth (真 - Raw Physics) ---
// 物理世界の「ありのまま」を冷凍保存するレイヤー
export interface TruthLayer {
  soul_hash: string;       // 声紋・生体情報から生成されるユニークID (例: "0x_bio_voice_...")
  spacetime_anchor: {
    coordinates: {
      lat: number;
      lng: number;
    };
    timestamp_unix: number;
    atmosphere_data: {
      noise_floor_db: number;  // 静寂レベル (孤独の指標)
      barometric_pressure?: number; // 気圧 (任意)
    };
  };
  raw_wave_ref: string;    // IPFS上の音声データURL (例: "ipfs://QmHash...")
}

// --- Layer 2: The Righteousness (義 - AI Oracle) ---
// AIが文脈を解釈し、社会を動かすレイヤー
export interface RighteousnessLayer {
  predicted_intent: {
    semantic_meaning: string;    // 顕在的意味 (例: "疲れた")
    latent_context: string;      // 潜在的意図 (例: "承認欲求", "SOS")
    singularity_prediction: string; // 未来予測 (例: "48時間以内のバーンアウトリスク高")
  };
  smart_contract_trigger: {
    target_contract: string;     // 実行対象のコントラクトアドレス
    function_name: string;       // 実行する関数 (例: "mintWithEmpathy")
    payload: {
      amount: number;            // トークン発行量
      token_type: 'CARE_TOKEN' | 'SBT'; 
      reason_code: string;       // 発行理由 (例: "SURVIVAL_PROOF")
    };
  };
}

// --- Layer 3: The Beauty (美 - Art Resonance) ---
// データが「作品」へと昇華されるレイヤー
export interface BeautyLayer {
  art_conversion_params: {
    emotional_color_code: string; // HEXカラー (例: "#2A3B90")
    base_frequency_hz: number;    // 基底周波数 (例: 440.0)
    harmonic_structure: string;   // 和音構成 (例: "minor_add9")
  };
  resonance_factor: number;       // 共鳴率 (0.0 - 1.0)
}

// === THE MASTER BLOCK ===
// 全てを統合した「ケア・プロトコル・ブロック」
export interface CareProtocolBlock {
  protocol_version: string;   // 例: "v1.0_genesis"
  block_id: string;           // ユニークハッシュ
  
  truth: TruthLayer;
  righteousness: RighteousnessLayer;
  beauty: BeautyLayer;
}