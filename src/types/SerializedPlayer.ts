import StoredCard from './StoredCard';
import { PlayerStatus } from './PlayerStatus';

export default interface SerializedPlayer {
  name: string;
  hand: StoredCard[];
  status: PlayerStatus;
  stack: number;
  betSize: number;
  handValue: number;
}
