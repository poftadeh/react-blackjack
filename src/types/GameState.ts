import { GamePhase } from './GamePhase';

export default interface GameState {
  phase: GamePhase;
  isGameMenuVisible: boolean;
}
