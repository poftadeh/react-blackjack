import Stack from '../Stack';
import {
  STANDARD_WIN_MULTIPLIER,
  BLACKJACK_WIN_MULTIPLIER,
} from '../../constants';
import Dealer from '../Dealer';

export default class Player extends Dealer {
  private stack: Stack;

  private betSize: number | null = 0;

  constructor(startingChips: number) {
    super();
    this.stack = new Stack(startingChips);
  }

  /**
   * Returns the player's chip stack.
   */
  public getStack(): Stack {
    return this.stack;
  }

  /**
   * Places a bet amount for the player.
   * @param amount the number of chips to wager.
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

    const winAmount = this.hand.getIsBlackJack()
      ? this.betSize * BLACKJACK_WIN_MULTIPLIER
      : this.betSize * STANDARD_WIN_MULTIPLIER;

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
