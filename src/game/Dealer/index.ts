import Hand from '../Hand';
import { PlayerStatus } from '../../types/PlayerStatus';
import Card from '../Card';
import { SerializedHand } from '../../types/SerializedHand';

export default class Dealer {
  protected hand: Hand;

  protected status: PlayerStatus;

  constructor(hand?: Hand, status?: PlayerStatus) {
    this.hand = hand ?? new Hand();
    this.status = status ?? PlayerStatus.Active;
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
   * Returns the dealer's hand value.
   */
  public getHandValue(): number {
    return this.hand.getValue();
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

  /**
   * Returns the serialized form of the hand for storage.
   */
  public serializeHand(): SerializedHand {
    return this.hand
      .getCards()
      .map((card) => ({ suit: card.getSuit(), rank: card.getRank() }));
  }
}
