import { GamePhase } from './GamePhase';
import { SerializedHand } from './SerializedHand';

export default interface GameState {
  phase: GamePhase;
  isGameMenuVisible: boolean;
  dealerHand: SerializedHand;
}
