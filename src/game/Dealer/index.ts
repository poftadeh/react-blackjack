import Hand from '../Hand';
import { PlayerStatus } from '../../types/PlayerStatus';
import Card from '../Card';

export default class Dealer {
  protected hand: Hand;

  protected status: PlayerStatus;

  constructor() {
    this.hand = new Hand();
    this.status = PlayerStatus.Active;
  }

  /**
   * Adds a card to the hand.
   * @param card
   */
  public addCard(card: Card): void {
    this.hand.addCard(card);
    if (this.hand.getIsBust()) {
      this.status = PlayerStatus.Bust;
    }
  }

  /**
   * Puts the dealer in a 'stand' state.
   */
  public stand(): void {
    this.status = PlayerStatus.Stand;
  }

  /**
   * Returns the dealer's hand.
   */
  public getHand(): Hand {
    return this.hand;
  }

  /**
   * Returns a boolean indicating if the dealer's hand is busted.
   */
  public isBust(): boolean {
    return this.hand.getIsBust();
  }

  /**
   * Returns whether or not the current hand is a BlackJack.
   */
  public isHoldingBlackjack(): boolean {
    return this.hand.getIsBlackJack();
  }

  /**
   * Returns dealer's status
   */
  public getStatus(): PlayerStatus {
    return this.status;
  }

  /**
   * Discards current hand and replaces it with a new hand.
   */
  public drawNewHand(): void {
    this.hand = new Hand();
  }
}
