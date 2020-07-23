import StoredPlayer from './StoredPlayer';

export interface SetPlayerAction {
  type: string;
  player: StoredPlayer;
}

export interface SetActivePlayerAction {
  type: string;
  activePlayer: string;
}

export type PlayerAction = SetPlayerAction | SetActivePlayerAction;
