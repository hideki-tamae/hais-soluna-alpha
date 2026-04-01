import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

load_dotenv()

# 思考エンジン
llm = ChatOpenAI(model="gpt-4o", temperature=0.3)

# 1. 解析者
architect = Agent(
    role='Neural State Architect',
    goal='ユーザーの生体スコア（omega: {omega_score}, state: {neural_state}）から神経系の状態を特定する',
    backstory='あなたは神経科学者です。ポリヴェーガル理論に基づき分析します。',
    llm=llm,
    verbose=True
)

# 2. 守護者
guardian = Agent(
    role='The Guardian of Meaning',
    goal='回復のための「小さな一歩」を提案する',
    backstory='あなたはV.フランクルの思想を体現する哲学者です。',
    llm=llm,
    verbose=True
)

def run_civilization_insight(omega_score, neural_state):
    analysis_task = Task(
        description=f'スコア {omega_score}, 状態 {neural_state} を分析せよ。',
        expected_output='神経状態のレポート',
        agent=architect
    )
    guidance_task = Task(
        description='分析を元に、フランクルの精神に則った回復アクションを提案せよ。',
        expected_output='具体的なケアの提案',
        agent=guardian
    )
    crew = Crew(agents=[architect, guardian], tasks=[analysis_task, guidance_task], process=Process.sequential)
    return crew.kickoff()

if __name__ == "__main__":
    print("🧠 Civilization OS: Brain Booting...")
    result = run_civilization_insight(omega_score=0.45, neural_state="dorsal")
    print("\n\n########################\n## CIVILIZATION OS INSIGHT\n########################\n")
    print(result)