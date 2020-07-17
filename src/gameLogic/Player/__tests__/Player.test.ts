import Player from '..';
import Card from '../../Card';

describe('Player', () => {
  it('should construct a new player with a 2000 chip stack', () => {
    const player = new Player(2000);
    expect(player.getStack().getChips()).toBe(2000);
  });

  it('should get player busted status', () => {
    const player = new Player(1000);
    const playerHand = player.getHand();
    playerHand.addCard(new Card('9', 'Clubs'));
    playerHand.addCard(new Card('9', 'Clubs'));
    playerHand.addCard(new Card('9', 'Clubs'));

    expect(player.isBust()).toBe(true);
  });

  it('should detect player Blackjack', () => {
    const player = new Player(1000);
    const playerHand = player.getHand();
    playerHand.addCard(new Card('10', 'Clubs'));
    playerHand.addCard(new Card('Ace', 'Spades'));

    expect(player.isHoldingBlackjack()).toBe(true);
  });
});
