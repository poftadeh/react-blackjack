import Player from '../game/Player';
import PlayerAction from '../types/PlayerAction';
import { ADD_PLAYER, UPDATE_PLAYER } from '../actions/types';
import StoredPlayer from '../types/StoredPlayer';

interface PlayerState {
  players: StoredPlayer[];
}

const initialState: PlayerState = {
  players: [],
};

export default (state = initialState, action: PlayerAction): PlayerState => {
  switch (action.type) {
    case ADD_PLAYER:
      return { players: [...state.players, action.player] };
    case UPDATE_PLAYER:
      return {
        players: [
          ...state.players.filter(
            (player) => player.name !== action.player.name,
          ),
          action.player,
        ],
      };
    default:
      return state;
  }
};
