import os
import json
import sqlite3
import logging
from typing import Dict, Any
from crewai import Agent, Task, Crew, Process
from langchain.tools import Tool

logger = logging.getLogger(__name__)

# ==========================================
# STRICT META-INSTRUCTION (Master Directive)
# ==========================================
META_PROMPT = """
【No Empty Talk 鉄則】
「もっともらしい空論」や不要な挨拶は一切禁止する。すべての出力は、実際にコードまたは資本（Token/DB）として動くもの、あるいはユーザーの具体的行動を促すものに極限まで削ぎ落として限定せよ。
"""

def fetch_equity_context(user_name: str) -> str:
    """hais.db から過去のEquity推移を照合する"""
    db_path = os.path.join(os.path.dirname(__file__), 'hais.db')
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM user WHERE name = ?", (user_name,))
        user_row = cursor.fetchone()
        if not user_row:
            return f"No context found for {user_name}. Treat as a new paradigm."
        
        user_id = user_row[0]
        cursor.execute("SELECT care_score, soluna_allocated, timestamp FROM assessment WHERE user_id = ? ORDER BY timestamp DESC LIMIT 5", (user_id,))
        records = cursor.fetchall()
        conn.close()
        
        if not records:
             return f"No prior equity records yet for {user_name}."
             
        summary = f"Past Equity Records for {user_name}:\n"
        for r in records:
            summary += f"- Score: {r[0]}, SLUNA: {r[1]}, Time: {r[2]}\n"
        return summary
    except Exception as e:
        logger.error(f"DB Context Fetch Error: {e}")
        return f"Database error encountered: {e}"

equity_tool = Tool(
    name="HAIS_Equity_Context",
    func=fetch_equity_context,
    description="Reads the user's past equity (SLUNA balances and scores) from hais.db. Input strictly exactly the user_name string."
)

class AntigravityTriad:
    def __init__(self, user_name: str, voice_data: Dict[str, Any]):
        self.user_name = user_name
        self.voice_data = voice_data

    def create_crew(self) -> Crew:
        # Agent 1: The Auditor
        auditor = Agent(
            role='The Auditor',
            goal='ケアの純度測定',
            backstory='V.フランクルの「意味への意志」とB.フラーのデザインサイエンスをインストール。音声データから表面的な言葉ではなく、背後にある「ケアの覚悟」と「逆境の資産化（ACEs Asset）」を検出し、その純度をスコアリングせよ。\n' + META_PROMPT,
            verbose=True,
            allow_delegation=False,
            tools=[equity_tool]
        )

        # Agent 2: The Architect
        architect = Agent(
            role='The Architect',
            goal='資本の再定義',
            backstory='渋沢栄一の「道徳経済合一」とJ.Bezosの「長期的視点」をインストール。Auditorの解析結果を、既存のGDPでは測れない『文明OS』上の真の資産（SLUNA/Care Equity）へ変換せよ。10年後の文明に与える複利効果を算出する義務がある。\n' + META_PROMPT,
            verbose=True,
            allow_delegation=False
        )

        # Agent 3: The Strategist
        strategist = Agent(
            role='The Strategist',
            goal='実装の執行',
            backstory='Steve Jobsの審美眼をインストール。Architectの計算結果を元に、Hideki（ユーザー）が24時間以内に実行すべき「知行合一」のアクションを一つだけ特定せよ。きれいごとを削ぎ落とした「勝てる戦略」のみをHAISダッシュボードに流し込め。\n' + META_PROMPT,
            verbose=True,
            allow_delegation=False
        )

        # ==================== TASKS ====================

        payload_str = json.dumps(self.voice_data, ensure_ascii=False)

        task_synthesis = Task(
            description=f"Context Synthesis: hais.db から過去のEquity推移を照合し(Toolを使用: user_name='{self.user_name}'), 今回の生データが「既存文脈の強化か、新たな変革の萌芽か」を判断せよ。\nInput Data: {payload_str}",
            expected_output="過去の文脈との照合結果および純度分析のサマリー（短文）",
            agent=auditor
        )

        task_accounting = Task(
            description="Shadow Accounting: 既存資本主義では「価値ゼロ」とされる今回のケア行動に対し、独自の時価総額（SLUNA）を算定せよ。Context Synthesisを考慮し、The Re-Verse Factorとして数値を出すこと。",
            expected_output="算出された SLUNA の値とその数式根拠。無駄な表記を省くこと。",
            agent=architect
        )

        task_push = Task(
            description="Actionable Push: フロントエンド（Vercel）のInsight欄に表示する「具体的かつ審美的な一言」を生成し、JSONで出力せよ。プロパティは 'insight'（勝てる戦略/真髄を突く一言）と 'care_token_reward'（計算されたSLUNA数値、Float）の二つのみを含めること。フォーマットはMarkdownのJSONブロックやその他テキストを一切含まない、ピュアなJSONであること。",
            expected_output='{"insight": "具体的な一言", "care_token_reward": 数値}',
            agent=strategist
        )

        return Crew(
            agents=[auditor, architect, strategist],
            tasks=[task_synthesis, task_accounting, task_push],
            process=Process.sequential,
            verbose=True
        )

    def run(self) -> Dict[str, Any]:
        """
        Executes the Crew and safely parses the JSON output from the Strategist.
        """
        crew = self.create_crew()
        try:
            raw_result = crew.kickoff()
            # Try to safely extract JSON regardless of surrounding markdown text
            result_str = str(raw_result).strip()
            if "```json" in result_str:
                result_str = result_str.split("```json")[1].split("```")[0].strip()
            elif "```" in result_str:
                result_str = result_str.split("```")[1].split("```")[0].strip()
            
            output = json.loads(result_str)
            return {
                "insight": output.get("insight", "意味の還元に失敗しました。直ちに再検証してください。"),
                "care_token_reward": float(output.get("care_token_reward", 0.0))
            }
        except Exception as e:
            logger.error(f"crew.py execution parsing failed: {e}")
            # Fallback values to not crash system
            return {
                "insight": "System Notice: The strategy generation encountered interference. Autonomous correction pending.",
                "care_token_reward": 5.0
            }