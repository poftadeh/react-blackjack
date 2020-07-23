import SerializedPlayer from './SerializedPlayer';

export default interface PlayerState {
  activePlayer: SerializedPlayer | null;
  players: SerializedPlayer[];
}
