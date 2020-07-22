import { SET_DECK } from './types';
import Deck from '../gameLogic/Deck';
import DeckAction from '../types/DeckAction';

export default (): DeckAction => {
  const deck = new Deck();
  deck.shuffle();

  return {
    type: SET_DECK,
    deck,
  };
};
