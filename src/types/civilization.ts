export interface Resources { energy: number; food: number; materials: number; knowledge: number; }
export interface Population { total: number; growthRate: number; happiness: number; }
export interface CareLog { id: string; timestamp: number; category: 'health' | 'education' | 'social' | 'environment'; value: number; description: string; }
export interface CivilizationState { uid: string; resources: Resources; population: Population; careLogs: CareLog[]; lastUpdate: number; }
