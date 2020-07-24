import Deck from './Deck';
import Player from './Player';
import Dealer from './Dealer';
import { PlayerStatus } from '../types/PlayerStatus';
import { GamePhase } from '../types/GamePhase';
import SerializedPlayer from '../types/SerializedPlayer';

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

  private gamePhase: GamePhase;

  constructor(players: CreatedPlayer[]) {
    this.deck = new Deck();
    this.dealer = new Dealer();
    this.players = players.map(
      ({ name, startingChips }) => new Player(name, startingChips),
    );
    const [firstPlayer] = this.players;
    this.activePlayer = firstPlayer;
    this.gamePhase = GamePhase.Betting;
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
    this.gamePhase = GamePhase.PlayerHand;
  }

  /**
   * Deals a card to an active player.
   * @param playerName string representing the player's name
   */
  public hit(): SerializedPlayer {
    const player = this.activePlayer;

    if (player.getStatus() !== PlayerStatus.Active) {
      throw new Error('Cannot deal card to an inactive player.');
    }

    const card = this.deck.drawCard();
    player.addCard(card);

    if (player.isBust() || player.isHoldingBlackjack()) {
      this.nextActivePlayer();
    }
    return player.serialize();
  }

  /**
   * Sets a player's hand status to stand.
   * @param playerName the player's name
   */
  public stand(): SerializedPlayer {
    const player = this.activePlayer;

    if (player.getStatus() !== PlayerStatus.Active) {
      throw new Error('Player cannot stand when not in an active state');
    }

    player.stand();
    this.nextActivePlayer();
    return player.serialize();
  }

  /**
   * Sets a player's hand status to stand.
   * @param playerName the player's name
   */
  public double(): SerializedPlayer {
    const player = this.activePlayer;

    if (player.getStatus() !== PlayerStatus.Active) {
      throw new Error('Player cannot double when not in an active state');
    }

    if (player.getHand().getCards().length !== 2) {
      throw new Error('Player can only double with two cards in hand.');
    }

    const card = this.deck.drawCard();
    player.doubleDown(card);
    this.nextActivePlayer();
    return player.serialize();
  }

  /**
   * Gives a turn to the next active player.
   */
  public nextActivePlayer(): void {
    const activePlayerIndex = this.players.findIndex(
      (player) => player.getName() === this.activePlayer.getName(),
    );

    if (!Number.isInteger(activePlayerIndex)) {
      throw new Error('Failed to find the index of the active player');
    }

    this.activePlayer = this.players[
      (activePlayerIndex + 1) % this.players.length
    ];

    if (activePlayerIndex === this.players.length - 1) {
      if (this.gamePhase === GamePhase.Betting) {
        this.dealStartingHands();
      } else {
        this.playDealerHand();
      }
    }
  }

  /**
   * Places a bet for the active player
   * @param playerName
   * @param amount
   */

  public bet(amount: number): SerializedPlayer {
    const player = this.activePlayer;
    player.bet(amount);
    this.nextActivePlayer();
    return player.serialize();
  }

  /**
   * Plays out the dealer's hand. Stands on soft 17.
   */
  public playDealerHand(): void {
    this.gamePhase = GamePhase.DealerHand;

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

  public getSerializedActivePlayer(): SerializedPlayer {
    const activePlayer = this.players.find(
      (player) => player.getName() === this.activePlayer.getName(),
    );

    if (!activePlayer) {
      throw new Error('Could not retrieve active player');
    }

    return activePlayer.serialize();
  }
}
