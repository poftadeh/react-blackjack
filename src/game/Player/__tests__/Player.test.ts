import Player from '..';
import Card from '../../Card';
import {
  STANDARD_WIN_MULTIPLIER,
  BLACKJACK_WIN_MULTIPLIER,
} from '../../../constants';

describe('Player', () => {
  it('should construct a new player with a 2000 chip stack', () => {
    const player = new Player('foo', 2000);
    expect(player.getName()).toBe('foo');
    expect(player.getStack().getChips()).toBe(2000);
  });

  it('should get player busted status', () => {
    const player = new Player('foo', 1000);
    const playerHand = player.getHand();
    playerHand.addCard(new Card('9', 'Clubs'));
    playerHand.addCard(new Card('9', 'Clubs'));
    playerHand.addCard(new Card('9', 'Clubs'));

    expect(player.isBust()).toBe(true);
  });

  it('should detect player Blackjack', () => {
    const player = new Player('foo', 1000);
    const playerHand = player.getHand();
    playerHand.addCard(new Card('10', 'Clubs'));
    playerHand.addCard(new Card('Ace', 'Spades'));

    expect(player.isHoldingBlackjack()).toBe(true);
  });

  it('should apply a bet for the player', () => {
    const player = new Player('foo', 3000);
    player.bet(1000);
    expect(player.getStack().getChips()).toBe(2000);
    expect(player.getBetSize()).toBe(1000);
  });

  it('should apply a standard win multiplier', () => {
    const player = new Player('foo', 50);
    const betAmount = 50;
    player.bet(betAmount);
    player.applyWinMultiplier();
    expect(player.getStack().getChips()).toBe(
      betAmount * STANDARD_WIN_MULTIPLIER,
    );
  });

  it('should apply a blackjack win multiplier', () => {
    const player = new Player('foo', 100);
    const betAmount = 100;
    player.bet(100);

    player.addCard(new Card('Ace', 'Clubs'));
    player.addCard(new Card('Jack', 'Spades'));

    player.applyWinMultiplier();
    expect(player.getStack().getChips()).toBe(
      betAmount * BLACKJACK_WIN_MULTIPLIER,
    );
  });

  it('should double down correctly', () => {
    const player = new Player('foo', 1000);
    const betAmount = 500;
    player.bet(betAmount);

    player.addCard(new Card('10', 'Clubs'));
    player.doubleDown(new Card('9', 'Hearts'));

    player.applyWinMultiplier();
    expect(player.getStack().getChips()).toBe(
      betAmount * 2 * STANDARD_WIN_MULTIPLIER,
    );
  });

  it('should reset the hand and bet size', () => {
    const player = new Player('foo', 555);
    player.bet(10);
    player.addCard(new Card('Ace', 'Clubs'));
    player.addCard(new Card('King', 'Spades'));
    player.addCard(new Card('King', 'Spades'));

    player.drawNewHand();
    player.resetBetSize();
    expect(player.getHand().getCards().length).toBe(0);
    expect(player.getBetSize()).toBe(0);
  });

  it('should handle push events', () => {
    const player = new Player('foo', 1000);
    player.bet(1000);
    player.handlePush();

    expect(player.getChipValue()).toBe(1000);
  });
});
