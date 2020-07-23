import Hand from '..';
import Card from '../../Card';

describe('Hand', () => {
  it('should calculate a hand of 21 value', () => {
    const hand = new Hand();
    hand.addCard(new Card('9', 'Hearts'));
    hand.addCard(new Card('2', 'Spades'));
    hand.addCard(new Card('Queen', 'Diamonds'));

    expect(hand.getValue()).toBe(21);
    expect(hand.getIsBlackJack()).toBe(false);
    expect(hand.getIsBust()).toBe(false);
  });

  it('should calculate and detect a busted hand', () => {
    const hand = new Hand();
    hand.addCard(new Card('9', 'Clubs'));
    hand.addCard(new Card('9', 'Clubs'));
    hand.addCard(new Card('9', 'Clubs'));

    expect(hand.getValue()).toBe(27);
    expect(hand.getIsBust()).toBe(true);
  });

  it('should calculate and detect a blackjack hand', () => {
    const hand = new Hand();
    hand.addCard(new Card('King', 'Clubs'));
    hand.addCard(new Card('Ace', 'Hearts'));

    expect(hand.getValue()).toBe(21);
    expect(hand.getIsBust()).toBe(false);
    expect(hand.getIsBlackJack()).toBe(true);
  });

  it('should calculate Aces properly', () => {
    const hand = new Hand();
    hand.addCard(new Card('Ace', 'Clubs'));
    hand.addCard(new Card('Ace', 'Hearts'));
    hand.addCard(new Card('Ace', 'Hearts'));
    hand.addCard(new Card('Ace', 'Diamonds'));

    expect(hand.getValue()).toBe(14);
    expect(hand.getIsBust()).toBe(false);
    expect(hand.getIsBlackJack()).toBe(false);
  });
});
