import Stack from '../Stack';
import {
  STANDARD_WIN_MULTIPLIER,
  BLACKJACK_WIN_MULTIPLIER,
} from '../../constants';
import Dealer from '../Dealer';
import { PlayerStatus } from '../../types/PlayerStatus';
import Card from '../Card';
import SerializedPlayer from '../../types/SerializedPlayer';
import HandOutcome from '../../types/HandOutcome';

export default class Player extends Dealer {
  private name: string;

  private stack: Stack;

  private betSize = 0;

  private handOutcome = HandOutcome.Undetermined;

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
   * Handles draw situations by returning bet chips to stack.
   */
  public handlePush(): void {
    this.stack.addChips(this.betSize);
  }

  /**
   * Returns the chip stack value for the player.
   */
  public getChipValue(): number {
    return this.stack.getChips();
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

    if (!this.isBust()) {
      this.status = PlayerStatus.Stand;
    }
  }

  /**
   * Resets bet size for a new round.
   */
  public resetBetSize(): void {
    this.betSize = 0;
  }

  /**
   * Resets the player's hand, chips, and hand outcome.
   */
  public resetPlayer(): void {
    super.drawNewHand();
    this.resetBetSize();
    this.handOutcome = HandOutcome.Undetermined;
    this.status = PlayerStatus.Active;
  }

  /**
   * Sets the outcome of the hand.
   * @param outcome
   */
  public setHandOutcome(outcome: HandOutcome): void {
    this.handOutcome = outcome;
  }

  /**
   * Sets the outcome of the hand.
   * @param outcome
   */
  public getHandOutcome(): HandOutcome {
    return this.handOutcome;
  }

  /**
   * Returns the serialized form of the player for storage.
   */
  public serialize(): SerializedPlayer {
    return {
      name: this.name,
      hand: this.hand
        .getCards()
        .map((card) => ({ suit: card.getSuit(), rank: card.getRank() })),
      status: this.status,
      stack: this.getChipValue(),
      betSize: this.betSize,
      handValue: this.getHandValue(),
      handOutcome: this.getHandOutcome(),
    };
  }
}
