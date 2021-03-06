import Deck from './Deck';
import Player from './Player';
import Dealer from './Dealer';
import { PlayerStatus } from '../types/PlayerStatus';
import GamePhase from '../types/GamePhase';
import SerializedPlayer from '../types/SerializedPlayer';
import HandOutcome from '../types/HandOutcome';
import Hand from './Hand';
import store from '../store';
import {
  UPDATE_DEALER_HAND,
  UPDATE_PLAYER,
  SET_ACTIVE_PLAYER,
  SET_GAME_PHASE,
  SET_TRAY_AMOUNT,
} from '../actions/types';

export interface CreatedPlayer {
  name: string;
  startingChips: number;
}

const STARTING_HAND_SIZE = 2;

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

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

  private dispatchUpdates(): void {
    store.dispatch({
      type: UPDATE_PLAYER,
      player: this.activePlayer,
    });

    store.dispatch({
      type: SET_ACTIVE_PLAYER,
      activePlayer: this.getSerializedActivePlayer(),
    });

    store.dispatch({
      type: SET_GAME_PHASE,
      phase: this.gamePhase,
    });

    const hand = this.getDealer().serializeHand();
    const handValue = this.getDealer().getHandValue();
    store.dispatch({
      type: UPDATE_DEALER_HAND,
      dealer: { hand, handValue },
    });
  }

  /**
   * Plays out the dealer's hand. Stands on soft 17.
   */
  public async playDealerHand(): Promise<void> {
    this.gamePhase = GamePhase.DealerHand;
    await wait(this.dealer.getHand().getCards().length === 2 ? 600 : 1000);

    if (this.dealer.getHandValue() < 17) {
      this.dealer.addCard(this.deck.drawCard());
      this.dispatchUpdates();
      this.playDealerHand();
      return;
    }

    if (!this.dealer.isBust()) {
      this.dealer.stand();
    }

    this.gamePhase = GamePhase.Results;
    this.endRound();

    this.dispatchUpdates();

    await wait(3000);
    this.startNewRound();
    store.dispatch({
      type: SET_TRAY_AMOUNT,
      trayAmount: 0,
    });

    this.dispatchUpdates();
  }

  /**
   * Handles the outcome at the end of the hand.
   */
  public endRound(): void {
    const dealerHandValue = this.dealer.getHandValue();
    const dealerHasBlackjack = this.dealer.isHoldingBlackjack();

    this.players.forEach((player) => {
      const playerHasBlackjack = player.isHoldingBlackjack();
      const playerHandValue = player.getHandValue();

      if (
        player.isBust() ||
        (!this.dealer.isBust() && dealerHandValue > playerHandValue) ||
        (dealerHasBlackjack && !playerHasBlackjack)
      ) {
        player.setHandOutcome(HandOutcome.Loser);
        return;
      }

      if (playerHandValue === dealerHandValue) {
        player.setHandOutcome(HandOutcome.Push);
        player.handlePush();
      }

      if (this.dealer.isBust() || playerHandValue > dealerHandValue) {
        player.setHandOutcome(HandOutcome.Winner);
        player.applyWinMultiplier();
      }
    });
  }

  /**
   * Serializes the current active player.
   */
  public getSerializedActivePlayer(): SerializedPlayer {
    const activePlayer = this.players.find(
      (player) => player.getName() === this.activePlayer.getName(),
    );

    if (!activePlayer) {
      throw new Error('Could not retrieve active player');
    }

    return activePlayer.serialize();
  }

  /**
   * Returns the current game phase.
   */
  public getGamePhase(): GamePhase {
    return this.gamePhase;
  }

  /**
   * Resets card/bet state and starts a new round.
   */
  public startNewRound(): void {
    this.dealer.drawNewHand();
    this.players.forEach((player) => {
      player.resetPlayer();
    });

    this.gamePhase = GamePhase.Betting;
  }

  public saveGame(): void {
    localStorage.setItem('game', JSON.stringify(this));
  }

  public loadGame(): void {
    const storedGame = localStorage.getItem('game');

    if (!storedGame) {
      throw new Error('Could not find game data to load');
    }

    const parsedGame = JSON.parse(storedGame);

    this.players = [];
    this.deck = new Deck();
    parsedGame.players.forEach((player) => {
      const playerHand: Hand = Hand.createHandFromStorageData(player.hand);
      this.players = [
        ...this.players,
        new Player(
          player.name,
          player.stack.chips,
          player.betSize,
          player.handOutcome,
          playerHand,
          player.status,
        ),
      ];
    });
    this.dealer = new Dealer(
      Hand.createHandFromStorageData(parsedGame.dealer.hand),
      parsedGame.dealer.status,
    );

    const activePlayer = this.players.find(
      (player) => player.getName() === parsedGame.activePlayer.name,
    );

    if (!activePlayer)
      throw new Error('Could not find active player in stored data');

    this.activePlayer = activePlayer;
    this.gamePhase = parsedGame.gamePhase;
  }
}
