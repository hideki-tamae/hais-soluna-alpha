import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process, LLM

load_dotenv()

# 【修正箇所】CrewAI最新版のネイティブLLMクラスを使用
my_llm = LLM(model="gpt-4o", temperature=0.3)

# 1. 解析者
architect = Agent(
    role='Neural State Architect',
    goal='ユーザーの生体スコア（omega: {omega_score}, state: {neural_state}）から神経系の状態を特定する',
    backstory='あなたは世界最高峰の神経科学者です。ポリヴェーガル理論に基づき分析します。',
    llm=my_llm,
    verbose=True
)

# 2. 守護者
guardian = Agent(
    role='The Guardian of Meaning',
    goal='回復のための「小さな一歩」を提案する',
    backstory='あなたはV.フランクルの思想を体現する哲学者です。苦悩の中に意味を見出します。',
    llm=my_llm,
    verbose=True
)

def run_insight(omega_score, neural_state):
    task1 = Task(
        description=f'スコア {omega_score}, 状態 {neural_state} を分析せよ。',
        expected_output='神経状態のレポート',
        agent=architect
    )
    task2 = Task(
        description='分析を元に、フランクルの精神に則った回復アクションを提案せよ。',
        expected_output='具体的なケアの提案',
        agent=guardian
    )
    crew = Crew(agents=[architect, guardian], tasks=[task1, task2], process=Process.sequential)
    return crew.kickoff()

if __name__ == "__main__":
    print("🧠 Brain Booting...")
    # スコア 0.45, 凍結(dorsal)状態でテスト実行
    print(run_insight(0.45, "dorsal"))