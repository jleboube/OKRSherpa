export enum Sender {
  USER = 'user',
  AI = 'model',
}

export enum ModelType {
  FAST = 'fast',
  DEEP = 'deep',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: number;
  isThinking?: boolean;
}

export interface OKRContext {
  leadershipGoals: string;
  userRole: string;
  organizationType: string;
}

export interface AppSettings {
  modelType: ModelType;
}
