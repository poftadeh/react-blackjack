import Stack from '../Stack';
import {
  STANDARD_WIN_MULTIPLIER,
  BLACKJACK_WIN_MULTIPLIER,
} from '../../constants';
import Dealer from '../Dealer';
import { PlayerStatus } from '../../types/PlayerStatus';
import Card from '../Card';

export default class Player extends Dealer {
  private name: string;

  private stack: Stack;

  private betSize = 0;

  constructor(name: string, startingChips: number) {
    super();
    this.name = name;
    this.stack = new Stack(startingChips);
  }

  /**
   * Returns the player's name.
   */
  public getName(): string {
    return this.name;
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
    this.betSize += amount;
  }

  /**
   * Applies the win multiplier to the player's wager amount and adds it to the chip stack.
   */
  public applyWinMultiplier(): void {
    if (this.status === PlayerStatus.Bust) {
      throw new Error('Win condition called for busted player.');
    }
    const winAmount = this.hand.getIsBlackJack()
      ? this.betSize * BLACKJACK_WIN_MULTIPLIER
      : this.betSize * STANDARD_WIN_MULTIPLIER;

    this.stack.addChips(winAmount);
  }

  /**
   * Returns the player's bet size.
   */
  public getBetSize(): number {
    return this.betSize;
  }

  /**
   * Performs a double down action for the player.
   * @param card card to be added to hand.
   */
  public doubleDown(card: Card): void {
    this.addCard(card);
    this.bet(this.betSize);
    this.status = PlayerStatus.Stand;
  }

  /**
   * Resets hand and bet for a new round.
   */
  public reset(): void {
    super.drawNewHand();
    this.betSize = 0;
  }
}