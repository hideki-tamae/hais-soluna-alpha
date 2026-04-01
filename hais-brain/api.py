from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
# main.py で作った知能（run_insight関数）を呼び出す
from main import run_insight

app = FastAPI(title="Civilization OS - HAIS Brain API")

# CORS設定（Next.jsからの通信を許可するバリア解除）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番環境ではVercelのURLなどに限定します
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Next.jsから送られてくるデータの「型（設計図）」
class ScanData(BaseModel):
    omegaScore: float
    neuralState: str

@app.post("/analyze")
async def analyze_state(data: ScanData):
    print(f"📥 [受信] 身体からのシグナル: Omega={data.omegaScore}, State={data.neuralState}")
    try:
        # 大脳（CrewAI）にデータを渡して思考開始
        insight_result = run_insight(omega_score=data.omegaScore, neural_state=data.neuralState)
        
        # 思考結果を文字列として返す
        return {
            "success": True, 
            "insight": str(insight_result)
        }
    except Exception as e:
        print(f"❌ [エラー] {e}")
        return {"success": False, "error": str(e)}

# 起動確認用のルート
@app.get("/")
def read_root():
    return {"status": "Brain is awake and listening."}