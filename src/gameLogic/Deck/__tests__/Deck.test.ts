import Deck from '../Deck';
import { SUITS, RANKS } from '../../../constants';

describe('Deck', () => {
  it('should generates cards correctly', () => {
    const deck = new Deck();
    const cards = deck.getCards();

    expect(cards.length).toBe(52);
    cards.forEach((card) => {
      expect(SUITS).toContain(card.getSuit());
      expect(RANKS).toContain(card.getRank());
    });
  });
});
