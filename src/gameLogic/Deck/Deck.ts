import Card from '../Card/Card';
import { SUITS, RANKS, NUMBER_OF_DECKS } from '../../constants';

export default class Deck {
  private cards: Card[] = [];

  constructor() {
    this.generateCards();
  }

  /**
   * Sets up the deck by generating the standard set of cards based on deck count.
   */
  private generateCards(): void {
    const singleDeck: Card[] = [];

    for (const suit of SUITS) {
      for (const rank of RANKS) {
        singleDeck.push(new Card(suit, rank));
      }
    }

    for (let i = 0; i < NUMBER_OF_DECKS; i += 1) {
      this.cards = [...this.cards, ...singleDeck];
    }
  }

  // TODO: implement public shuffle()

  /**
   * Returns the card array from the deck.
   * @returns {Card[]}
   */
  public getCards(): Card[] {
    return this.cards;
  }
}
