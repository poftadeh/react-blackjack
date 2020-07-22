import Deck from './Deck';
import Player from './Player';
import Dealer from './Dealer';
import { PlayerStatus } from '../types/PlayerStatus';

interface CreatedPlayer {
  name: string;
  startingChips: number;
}

const STARTING_HAND_SIZE = 2;

export default class Game {
  private deck: Deck;

  private players: Player[];

  private dealer: Dealer;

  constructor(players: CreatedPlayer[]) {
    this.deck = new Deck();
    this.dealer = new Dealer();
    this.players = players.map(
      ({ name, startingChips }) => new Player(name, startingChips),
    );
  }

  /**
   * Returns a player searched for by name.
   * @param playerName string representing the player's name to find.
   */
  public findPlayerByName(playerName: string): Player | undefined {
    return this.players.find((player) => player.getName() === playerName);
  }

  /**
   * Returns the dealer object.
   */
  public getDealer(): Dealer {
    return this.dealer;
  }

  /**
   * Returns the player Array.
   */
  public getPlayers(): Player[] {
    return this.players;
  }

  /**
   * Deals the starting hands for the dealer and all players.
   */
  public dealStartingHands(): void {
    this.dealer.drawNewHand();
    this.players.forEach((player) => player.reset());

    for (let i = 0; i < STARTING_HAND_SIZE; i += 1) {
      this.players.forEach((player) => player.addCard(this.deck.drawCard()));
      this.dealer.addCard(this.deck.drawCard());
    }
  }

  /**
   * Deals a card to an active player.
   * @param playerName string representing the player's name
   */
  public playerHit(playerName: string): void {
    const player = this.players.find(
      (player) => player.getName() === playerName,
    );

    if (!player) {
      throw new Error(`Could not find player ${playerName}`);
    }

    if (player.getStatus() !== PlayerStatus.Active) {
      throw new Error('Cannot deal card to an inactive player.');
    }

    const card = this.deck.drawCard();
    player.addCard(card);
  }

  /**
   * Plays out the dealer's hand. Stands on soft 17.
   */
  public playDealerHand(): void {
    while (this.dealer.getHandValue() < 17) {
      this.dealer.addCard(this.deck.drawCard());
    }

    if (!this.dealer.isBust()) {
      this.dealer.stand();
    }
  }
}
