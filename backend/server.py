import os
import re
import json
import logging
import uuid
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime, Text, create_engine, func
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from dotenv import load_dotenv

# ログ設定
logging.basicConfig(level=logging.INFO, format='[%(asctime)s] [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

# 環境設定
env_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../.env.local'))
load_dotenv(env_path)

# DB設定
DATABASE_URL = "sqlite:///hais.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ====================================================
# Models (Database)
# ====================================================
class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True)
    wallet_address = Column(String, unique=True, index=True)
    name = Column(String)

class Assessment(Base):
    __tablename__ = 'assessment'
    id = Column(String, primary_key=True, index=True)
    user_id = Column(Integer)
    care_score = Column(Float)
    soluna_allocated = Column(Float)
    insight_text = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# ====================================================
# Request Schemas
# ====================================================
class VoiceAnalysisRequest(BaseModel):
    """旧 /analyze 用の互換モデル"""
    user: str
    condition: str
    f0Hz: float
    jitterPct: float
    shimmerPct: float
    hnrDb: float
    neuralState: str
    location: str

class VoiceInsightRequest(BaseModel):
    """最新 /api/hais/voice-insight 用"""
    user_id: str
    polyvagal_score: float
    autonomic_state: str
    f0_hz: Optional[float] = None
    jitter_pct: Optional[float] = None
    shimmer_pct: Optional[float] = None
    hnr_db: Optional[float] = None
    condition: Optional[str] = None

# ====================================================
# Main API
# ====================================================
app = FastAPI(title="Civilization OS HAIS Core")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LLM Router のインポート
try:
    from llm_router import get_llm_router
    llm_router = get_llm_router()
    logger.info("✅ LLM Router successfully initialized")
except ImportError:
    logger.error("❌ llm_router.py not found. Please ensure it is in the same directory.")
    llm_router = None

def identify_user(uid: str) -> str:
    if 'tamae' in uid.lower() or 'hideki' in uid.lower(): return "田前 秀樹"
    return uid

# ----------------------------------------------------
# Endpoints
# ----------------------------------------------------

@app.get("/api/hais/equity/{user_id}")
async def get_total_equity(user_id: str):
    """
    ユーザーの累計 Care Equity (SOLUNA) を算出する
    論理的根拠: 累計資産 E_total = \sum_{i=1}^{n} R_i
    """
    db = SessionLocal()
    try:
        user_record = db.query(User).filter(User.wallet_address == user_id).first()
        if not user_record:
            return {
                "status": "success",
                "total_soluna": 0.0, 
                "assessment_count": 0,
                "message": "User not found, returning zero equity"
            }

        # 集計クエリの実行
        result = db.query(
            func.sum(Assessment.soluna_allocated),
            func.count(Assessment.id)
        ).filter(Assessment.user_id == user_record.id).first()

        total_soluna = result[0] if result[0] else 0.0
        count = result[1] if result[1] else 0

        return {
            "status": "success",
            "user_id": user_id,
            "user_name": user_record.name,
            "total_soluna": round(total_soluna, 2),
            "assessment_count": count,
            "last_updated": datetime.now().isoformat()
        }
    except Exception as e:
        logger.error(f"❌ Equity Calculation Error: {e}")
        raise HTTPException(status_code=500, detail="Internal Equity Error")
    finally:
        db.close()

@app.post("/analyze")
@app.post("/api/hais/analyze")
async def analyze_legacy(req: VoiceAnalysisRequest):
    """既存のNotion/GAS連携用エンドポイント（後方互換性）"""
    user_name = identify_user(req.user)
    logger.info(f"✅ Legacy flow triggered for {user_name}")
    return {"status": "success", "message": "Legacy record received"}

@app.post("/api/hais/voice-insight")
async def get_voice_insight(req: VoiceInsightRequest):
    """文明OSの核：意味の再構築と報酬の永続化"""
    user_name = identify_user(req.user_id)
    
    voice_payload = {
        "polyvagal_score": req.polyvagal_score,
        "autonomic_state": req.autonomic_state,
        "condition": req.condition,
        "f0_hz": req.f0_hz,
        "jitter_pct": req.jitter_pct,
        "shimmer_pct": req.shimmer_pct
    }

    # ==========================================
    # Antigravity Triad Integration (Master Directive)
    # ==========================================
    import asyncio
    try:
        from crew import AntigravityTriad
        def execute_triad():
            triad = AntigravityTriad(user_name=user_name, voice_data=voice_payload)
            return triad.run()
            
        # 非同期スレッドでCrewAIを実行し、FastAPIメインループをブロックしない
        logger.info(f"🚀 Triggering Antigravity Triad for {user_name}...")
        crew_result = await asyncio.to_thread(execute_triad)
        
        insight_text = crew_result["insight"]
        token_reward = crew_result["care_token_reward"]
        logger.info(f"✨ Triad Execution Successful: +{token_reward} SLUNA")
    except Exception as e:
        logger.error(f"❌ Triad Pipeline Error: {e}")
        # Fallback in case of module or generation error
        insight_text = "System Notice: The strategy generation encountered interference. Autonomous correction pending."
        token_reward = 5.0

    db = SessionLocal()
    try:
        user_record = db.query(User).filter(User.wallet_address == req.user_id).first()
        if not user_record:
            user_record = User(wallet_address=req.user_id, name=user_name)
            db.add(user_record)
            db.commit()
            db.refresh(user_record)

        assessment_id = str(uuid.uuid4())
        new_assessment = Assessment(
            id=assessment_id,
            user_id=user_record.id,
            care_score=req.polyvagal_score,
            soluna_allocated=token_reward,
            insight_text=insight_text
        )
        db.add(new_assessment)
        db.commit()
        logger.info(f"✅ DB Saved: {assessment_id} for {user_name}")

    except Exception as e:
        db.rollback()
        logger.error(f"❌ DB Save Error: {e}")
        assessment_id = "error-not-saved"
    finally:
        db.close()

    return {
        "status": "success",
        "assessment_id": assessment_id,
        "user": user_name,
        "insight": insight_text,
        "care_token_reward": token_reward,
        "timestamp": datetime.now().isoformat()
    }

# The triad_dispatch endpoint is deprecated since the Triad is now
# embedded directly into /api/hais/voice-insight asynchronously.

if __name__ == "__main__":
    import uvicorn
    logger.info("🚀 Civilization OS HAIS Core booting up on port 8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")