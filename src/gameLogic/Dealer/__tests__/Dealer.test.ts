import Dealer from '..';
import Card from '../../Card';

describe('Dealer', () => {
  it('should detected a busted hand', () => {
    const dealer = new Dealer();
    dealer.addCard(new Card('9', 'Clubs'));
    dealer.addCard(new Card('9', 'Clubs'));
    dealer.addCard(new Card('9', 'Clubs'));

    expect(dealer.isBust()).toBe(true);
  });

  it('should detect a hand containing Blackjack', () => {
    const dealer = new Dealer();
    dealer.addCard(new Card('10', 'Clubs'));
    dealer.addCard(new Card('Ace', 'Spades'));

    expect(dealer.isHoldingBlackjack()).toBe(true);
  });
});
