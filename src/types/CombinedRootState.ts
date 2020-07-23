import GameState from './GameState';
import PlayerState from './PlayerState';

export default interface CombinedRootState {
  game: GameState;
  player: PlayerState;
}
