import Deck from './Deck';
import Player from './Player';
import Dealer from './Dealer';
import { PlayerStatus } from '../types/PlayerStatus';
import { GamePhase } from '../types/GamePhase';

export interface CreatedPlayer {
  name: string;
  startingChips: number;
}

const STARTING_HAND_SIZE = 2;

export default class Game {
  private deck: Deck;

  private players: Player[];

  private dealer: Dealer;

  private activePlayer: Player;

  private gamePhase = GamePhase;

  constructor(players: CreatedPlayer[]) {
    this.deck = new Deck();
    this.dealer = new Dealer();
    this.players = players.map(
      ({ name, startingChips }) => new Player(name, startingChips),
    );
    const [firstPlayer] = this.players;
    this.activePlayer = firstPlayer;
  }

  /**
   * Returns a player searched for by name.
   * @param playerName string representing the player's name to find.
   * @returns {Player}
   */
  public findPlayerByName(playerName: string): Player {
    const player = this.players.find(
      (player) => player.getName() === playerName,
    );

    if (!player) {
      throw new Error(`Could not find player ${playerName}`);
    }

    return player;
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
   * Returns the current active player.
   */
  public getActivePlayerName(): string {
    return this.activePlayer.getName();
  }

  /**
   * Deals the starting hands for the dealer and all players.
   */
  public dealStartingHands(): void {
    this.dealer.drawNewHand();
    this.players.forEach((player) => player.drawNewHand());

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
    const player = this.findPlayerByName(playerName);

    if (player.getStatus() !== PlayerStatus.Active) {
      throw new Error('Cannot deal card to an inactive player.');
    }

    const card = this.deck.drawCard();
    player.addCard(card);
  }

  /**
   * Sets a player's hand status to stand.
   * @param playerName the player's name
   */
  public playerStand(playerName: string): void {
    const player = this.findPlayerByName(playerName);

    if (player.getStatus() !== PlayerStatus.Active) {
      throw new Error('Player cannot stand when not in an active state');
    }

    player.stand();
  }

  /**
   * Gives a turn to the next active player.
   */
  public nextActivePlayer(): void {
    const activePlayerIndex = this.players.findIndex(
      (player) => player.getName() === this.activePlayer.getName(),
    );

    if (!activePlayerIndex) {
      throw new Error('Failed to find the index of the active player');
    }

    this.activePlayer = this.players[
      (activePlayerIndex + 1) % this.players.length
    ];
  }

  /**
   * Places a bet for the active player
   * @param playerName
   * @param amount
   */

  public bet(amount: number): void {
    this.activePlayer.bet(amount);
    this.nextActivePlayer();
  }

  /**
   * Places a bet for a player selected by name.
   * @param playerName
   * @param amount
   */
  public placeBetByPlayerName(playerName: string, amount: number): void {
    this.findPlayerByName(playerName).bet(amount);
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

  /**
   * Handles the outcome at the end of the hand.
   */
  public endRound(): void {
    this.playDealerHand();
    const dealerHandValue = this.dealer.getHandValue();

    this.players.forEach((player) => {
      const playerHandValue = player.getHandValue();

      if (playerHandValue === dealerHandValue) {
        player.handlePush();
      }

      if (
        player.getStatus() !== PlayerStatus.Bust &&
        playerHandValue > dealerHandValue
      ) {
        player.applyWinMultiplier();
      }
    });
  }
}
