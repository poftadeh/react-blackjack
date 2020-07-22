import Deck from '../gameLogic/Deck';

export default interface DeckAction {
  type: string;
  deck: Deck;
}
