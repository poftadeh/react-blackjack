import StoredCard from './StoredCard';
import { PlayerStatus } from './PlayerStatus';

export default interface StoredPlayer {
  name: string;
  hand: StoredCard[];
  status: PlayerStatus;
  stack: number;
  betSize: number;
}
