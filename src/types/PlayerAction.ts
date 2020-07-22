import Player from '../gameLogic/Player';
import StoredPlayer from './StoredPlayer';

export default interface PlayerAction {
  type: string;
  player: StoredPlayer;
}
