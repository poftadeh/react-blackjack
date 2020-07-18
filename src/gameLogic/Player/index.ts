import Hand from '../Hand';
import Stack from '../Stack';
import { PlayerStatus } from '../../types/PlayerStatus';
import Card from '../Card';
import { WIN_MULTIPLIER, BLACKJACK_MULTIPLIER } from '../../constants';

export default class Player {
  private hand: Hand;

  private stack: Stack;

  private betSize: number | null = 0;

  private status: PlayerStatus;

  constructor(startingChips: number) {
    this.stack = new Stack(startingChips);
    this.hand = new Hand();
    this.status = PlayerStatus.Active;
  }

  /**
   * Adds a card to the player's hand.
   * @param card
   */
  public addCard(card: Card): void {
    this.hand.addCard(card);
    if (this.hand.getIsBust()) {
      this.status = PlayerStatus.Bust;
    }
  }

  /**
   * Puts the player in a 'stand' state.
   */
  public stand(): void {
    this.status = PlayerStatus.Stand;
  }

  /**
   * Returns the player's hand.
   */
  public getHand(): Hand {
    return this.hand;
  }

  /**
   * Returns the player's chip stack.
   */
  public getStack(): Stack {
    return this.stack;
  }

  /**
   * Returns a boolean indicating if the player's hand is busted.
   */
  public isBust(): boolean {
    return this.hand.getIsBust();
  }

  /**
   * Returns whether or not the player has BlackJack.
   */
  public isHoldingBlackjack(): boolean {
    return this.hand.getIsBlackJack();
  }

  /**
   * Places a bet amount for the player.
   * @param amount the amount of chips to wager.
   */
  public bet(amount: number): void {
    const chipStackAmount = this.stack.getChips();
    if (amount > chipStackAmount) {
      throw new Error(
        `Wager of ${amount} exceeds the $${chipStackAmount} chip stack.`,
      );
    }

    this.stack.removeChips(amount);
    this.betSize = amount;
  }

  /**
   * Applies the win multiplier to the player's wager amount and adds it to the chip stack.
   */
  public applyWinMultiplier(): void {
    if (this.betSize === null) {
      throw new Error('Bet size is null');
    }

    const winAmount =
      this.betSize +
      (this.hand.getIsBlackJack()
        ? this.betSize * WIN_MULTIPLIER
        : this.betSize * BLACKJACK_MULTIPLIER);

    this.stack.addChips(winAmount);
    this.betSize = null;
  }

  /**
   * Returns the player's bet size.
   */
  public getBetSize(): number {
    return this.betSize ?? 0;
  }
}
