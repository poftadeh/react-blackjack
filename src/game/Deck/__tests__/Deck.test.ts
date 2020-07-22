import Deck from '..';
import { SUITS, RANKS, NUMBER_OF_DECKS } from '../../../constants';
import Card from '../../Card';

const STANDARD_DECK_SIZE = 52;

describe('Deck', () => {
  it('should generates cards correctly', () => {
    const deck = new Deck();
    const cards = deck.getCards();

    expect(cards.length).toBe(STANDARD_DECK_SIZE * NUMBER_OF_DECKS);
    cards.forEach((card) => {
      expect(SUITS).toContain(card.getSuit());
      expect(RANKS).toContain(card.getRank());
    });
  });

  it('should shuffle the cards properly', () => {
    const deck = new Deck();
    const originalCards = [...deck.getCards()];

    deck.shuffle();
    const shuffledCards = deck.getCards();

    expect(originalCards.length).toEqual(shuffledCards.length);

    originalCards.forEach((card) => {
      expect(shuffledCards.includes(card)).toBe(true);
    });
  });

  it('should deal a card', () => {
    const deck = new Deck();
    expect(deck.drawCard()).toBeInstanceOf(Card);
  });
});
