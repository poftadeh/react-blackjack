import Game from '..';
import Player from '../Player';
import Dealer from '../Dealer';
import Card from '../Card';
import Deck from '../Deck';
import { PlayerStatus } from '../../types/PlayerStatus';

describe('Game', () => {
  it('should create a game', () => {
    const players = [{ name: 'foo', startingChips: 2000 }];
    const game = new Game(players);
    expect(game.getDealer()).toBeInstanceOf(Dealer);
    expect(game.getPlayers()[0]).toBeInstanceOf(Player);
  });

  it('should deal the starting hands and handle active players correctly', () => {
    const players = [
      { name: 'foo', startingChips: 2000 },
      { name: 'bar', startingChips: 3000 },
      { name: 'baz', startingChips: 3000 },
    ];
    const game = new Game(players);
    expect(game.getActivePlayerName()).toBe('foo');

    game.bet(1000);
    expect(game.getActivePlayerName()).toBe('bar');

    game.bet(2000);
    expect(game.getActivePlayerName()).toBe('baz');

    game.bet(3000);
    expect(game.getActivePlayerName()).toBe('foo');

    expect(game.getDealer().getHand().getCards().length).toBe(2);
    game
      .getPlayers()
      .forEach((player) => expect(player.getHand().getCards().length).toBe(2));
  });

  it('dealer stands on 17', () => {
    const game = new Game([{ name: 'foo', startingChips: 2000 }]);

    const testCards = [
      new Card('2', 'Spades'),
      new Card('10', 'Hearts'),
      new Card('King', 'Hearts'),
      new Card('2', 'Clubs'),
      new Card('5', 'Diamonds'),
    ];

    jest
      .spyOn(Deck.prototype, 'drawCard')
      .mockImplementation(() => testCards.shift() as Card);

    game.bet(200);
    game.stand();

    const dealer = game.getDealer();

    expect(dealer.getHandValue()).toBe(17);
    expect(dealer.getStatus()).toBe(PlayerStatus.Stand);
    expect(dealer.isBust()).toBe(false);
  });

  it('handles busted dealer hands properly', () => {
    const game = new Game([{ name: 'foo', startingChips: 2000 }]);

    const testCards = [
      new Card('2', 'Spades'),
      new Card('10', 'Hearts'),
      new Card('King', 'Hearts'),
      new Card('2', 'Clubs'),
      new Card('Queen', 'Diamonds'),
    ];

    jest
      .spyOn(Deck.prototype, 'drawCard')
      .mockImplementation(() => testCards.shift() as Card);

    game.bet(1);
    game.stand();

    const dealer = game.getDealer();

    expect(dealer.getHandValue()).toBe(22);
    expect(dealer.getStatus()).toBe(PlayerStatus.Bust);
    expect(dealer.isBust()).toBe(true);
  });

  it('handles player hit', () => {
    const game = new Game([{ name: 'foo', startingChips: 2000 }]);

    const testCards = [
      new Card('10', 'Spades'),
      new Card('10', 'Hearts'),
      new Card('9', 'Hearts'),
      new Card('2', 'Clubs'),
      new Card('3', 'Diamonds'),
    ];

    jest
      .spyOn(Deck.prototype, 'drawCard')
      .mockImplementation(() => testCards.shift() as Card);

    game.bet(200);
    game.hit();

    const player = game.findPlayerByName('foo') as Player;

    expect(player.getHandValue()).toBe(22);
    expect(player.getStatus()).toBe(PlayerStatus.Bust);
    expect(player.isBust()).toBe(true);
  });

  it('handles a round outcome', () => {
    const game = new Game([
      { name: 'blackjack', startingChips: 1000 },
      { name: 'bust', startingChips: 1000 },
      { name: 'push', startingChips: 1000 },
    ]);

    const testCards = [
      new Card('10', 'Spades'),
      new Card('10', 'Hearts'),
      new Card('King', 'Hearts'),
      new Card('Queen', 'Hearts'),

      new Card('Ace', 'Clubs'),
      new Card('3', 'Diamonds'),
      new Card('King', 'Diamonds'),
      new Card('Queen', 'Diamonds'),
      new Card('Jack', 'Spades'),
    ];

    jest
      .spyOn(Deck.prototype, 'drawCard')
      .mockImplementation(() => testCards.shift() as Card);

    game.bet(1000);
    game.bet(1000);
    game.bet(1000);

    game.hit();
    game.stand();
    game.endRound();

    expect(game.findPlayerByName('blackjack').getChipValue()).toBe(2500);
    expect(game.findPlayerByName('bust').getChipValue()).toBe(0);
    expect(game.findPlayerByName('push').getChipValue()).toBe(1000);
  });
});
