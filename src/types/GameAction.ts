import { GamePhase } from './GamePhase';
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

export interface SetDealerHandAction {
  type: string;
  dealerHand: SerializedHand;
}

export type GameAction =
  | SetMenuAction
  | SetPhaseAction
  | PlayerBetAction
  | SetDealerHandAction;
