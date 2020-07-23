import { GamePhase } from './GamePhase';

export interface SetMenuAction {
  type: string;
  isGameMenuVisible: boolean;
}

export interface SetPhaseAction {
  type: string;
  phase: GamePhase;
}

export interface PlayerBetAction {
  type: string;
  amount: number;
}

export type GameAction = SetMenuAction | SetPhaseAction | PlayerBetAction;
