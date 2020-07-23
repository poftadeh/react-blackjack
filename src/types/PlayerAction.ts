import SerializedPlayer from './StoredPlayer';

export interface SetPlayerAction {
  type: string;
  player: SerializedPlayer;
}

export interface SetActivePlayerAction {
  type: string;
  activePlayer: SerializedPlayer;
}

export type PlayerAction = SetPlayerAction | SetActivePlayerAction;
