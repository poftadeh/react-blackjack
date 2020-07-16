import Card from '../Card/Card';
import { SUITS, RANKS } from '../../constants';

export default class Deck {
  private cards: Card[] = [];

  constructor() {
    this.generateCards();
  }

  /**
   * Sets up the deck by generating the standard set of cards.
   */
  private generateCards(): void {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  /**
   * Returns the card array from the deck.
   * @returns {Card[]}
   */
  public getCards(): Card[] {
    return this.cards;
  }
}
