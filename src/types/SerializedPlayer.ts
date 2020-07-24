import StoredCard from './StoredCard';
import { PlayerStatus } from './PlayerStatus';
import HandOutcome from './HandOutcome';

export default interface SerializedPlayer {
  name: string;
  hand: StoredCard[];
  status: PlayerStatus;
  stack: number;
  betSize: number;
  handValue: number;
  handOutcome: HandOutcome;
}
