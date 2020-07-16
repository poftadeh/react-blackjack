import { Suit } from '../../types/Suit';
import { Rank } from '../../types/Rank';

export default class Card {
  private suit: Suit;

  private rank: Rank;

  constructor(rank: Rank, suit: Suit) {
    this.suit = suit;
    this.rank = rank;
  }

  /**
   * Returns the suit of the card.
   * @returns {Suit}
   */
  public getSuit(): Suit {
    return this.suit;
  }

  /**
   * Returns the rank of the card.
   * @returns {Rank}
   */
  public getRank(): Rank {
    return this.rank;
  }

  /**
   * Returns the name of the card indicating the rank and suit.
   * @returns {string}
   */
  public getName(): string {
    return `${this.rank} of ${this.suit}`;
  }
}
