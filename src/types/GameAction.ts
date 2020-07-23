import { GamePhase } from './GamePhase';

export interface SetMenuAction {
  type: string;
  isGameMenuVisible: boolean;
}

export interface SetPhaseAction {
  type: string;
  phase: GamePhase;
}

export type GameAction = SetMenuAction | SetPhaseAction;
