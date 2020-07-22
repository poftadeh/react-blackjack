import Deck from '../gameLogic/Deck';
import { SET_DECK } from '../actions/types';
import DeckAction from '../types/DeckAction';

interface DeckState {
  deck: Deck;
}

const initialState: DeckState = {
  deck: new Deck(),
};

export default (state = initialState, action: DeckAction): DeckState => {
  switch (action.type) {
    case SET_DECK:
      return { ...state, deck: action.deck };
    default:
      return state;
  }
};
