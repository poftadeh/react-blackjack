import { GamePhase } from '../types/GamePhase';
import {
  GameAction,
  SetPhaseAction,
  SetMenuAction,
  SetDealerHandAction,
} from '../types/GameAction';
import {
  SET_GAME_PHASE,
  SET_GAME_MENU_VISIBILITY,
  UPDATE_DEALER_HAND,
} from '../actions/types';
import GameState from '../types/GameState';

const initialState: GameState = {
  phase: GamePhase.Menu,
  isGameMenuVisible: true,
  dealerHand: [],
};

export default (state = initialState, action: GameAction): GameState => {
  switch (action.type) {
    case SET_GAME_PHASE:
      return { ...state, phase: (action as SetPhaseAction).phase };
    case SET_GAME_MENU_VISIBILITY:
      return {
        ...state,
        isGameMenuVisible: (action as SetMenuAction).isGameMenuVisible,
      };
    case UPDATE_DEALER_HAND:
      return {
        ...state,
        dealerHand: (action as SetDealerHandAction).dealerHand,
      };
    default:
      return state;
  }
};
