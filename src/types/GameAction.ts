import GamePhase from './GamePhase';
import { SerializedHand } from './SerializedHand';

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

export interface UpdateDealerAction {
  type: string;
  dealer: { hand: SerializedHand; handValue: number };
}

export interface setTrayAmount {
  type: string;
  trayAmount: number;
}

export type GameAction =
  | SetMenuAction
  | SetPhaseAction
  | PlayerBetAction
  | UpdateDealerAction
  | setTrayAmount;
