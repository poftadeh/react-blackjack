import Deck from '../game/Deck';

export default interface DeckAction {
  type: string;
  deck: Deck;
}
