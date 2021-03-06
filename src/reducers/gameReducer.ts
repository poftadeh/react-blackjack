import GamePhase from '../types/GamePhase';
import {
  GameAction,
  SetPhaseAction,
  SetMenuAction,
  UpdateDealerAction,
  setTrayAmount,
} from '../types/GameAction';
import {
  SET_GAME_PHASE,
  SET_GAME_MENU_VISIBILITY,
  UPDATE_DEALER_HAND,
  SET_TRAY_AMOUNT,
} from '../actions/types';
import GameState from '../types/GameState';

const initialState: GameState = {
  phase: GamePhase.Menu,
  isGameMenuVisible: true,
  trayAmount: 0,
  dealer: { hand: [], handValue: 0 },
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
        dealer: (action as UpdateDealerAction).dealer,
      };
    case SET_TRAY_AMOUNT:
      return {
        ...state,
        trayAmount: (action as setTrayAmount).trayAmount,
      };
    default:
      return state;
  }
};
