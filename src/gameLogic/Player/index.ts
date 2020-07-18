import Hand from '../Hand';
import Stack from '../Stack';

export default class Player {
  private hand: Hand;

  private stack: Stack;

  private betSize: number | null = 0;

  constructor(startingChips: number) {
    this.stack = new Stack(startingChips);
    this.hand = new Hand();
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
   * @param multiplier the amount to multiply the bet amount by.
   */
  public applyWinMultiplier(multiplier: number): void {
    if (this.betSize === null) {
      throw new Error('Bet size is null');
    }

    this.stack.addChips(this.betSize * multiplier);
    this.betSize = null;
  }

  /**
   * Returns the player's bet size.
   */
  public getBetSize(): number {
    return this.betSize ?? 0;
  }
}
