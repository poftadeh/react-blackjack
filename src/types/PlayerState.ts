import SerializedPlayer from './StoredPlayer';

export default interface PlayerState {
  activePlayer: SerializedPlayer | null;
  players: SerializedPlayer[];
}
