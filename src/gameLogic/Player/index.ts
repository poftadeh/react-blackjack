import Hand from '../Hand';
import Stack from '../Stack';

export default class Player {
  private hand: Hand;

  private stack: Stack;

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
}
