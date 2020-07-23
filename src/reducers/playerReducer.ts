import {
  PlayerAction,
  SetActivePlayerAction,
  SetPlayerAction,
} from '../types/PlayerAction';
import { UPDATE_PLAYER, SET_ACTIVE_PLAYER } from '../actions/types';
import PlayerState from '../types/PlayerState';

const initialState: PlayerState = {
  activePlayer: null,
  players: [],
};

export default (state = initialState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case UPDATE_PLAYER:
      return {
        ...state,
        players: [
          ...state.players.filter(
            (player) => player.name !== (action as SetPlayerAction).player.name,
          ),
          (action as SetPlayerAction).player,
        ],
      };
    case SET_ACTIVE_PLAYER:
      return {
        ...state,
        activePlayer: (action as SetActivePlayerAction).activePlayer,
      };
    default:
      return state;
  }
};
