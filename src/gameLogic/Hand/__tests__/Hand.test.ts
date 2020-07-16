import Hand from '..';
import Card from '../../Card';

describe('Hand', () => {
  it('should construct a new hand', () => {
    const firstCard = new Card('2', 'Spades');
    const secondCard = new Card('King', 'Diamonds');
    const hand = new Hand(firstCard, secondCard);
    expect(hand.getCards()).toEqual([firstCard, secondCard]);
  });
});
