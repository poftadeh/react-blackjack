import Card from '../Card';
import { SUITS, RANKS, NUMBER_OF_DECKS } from '../../constants';

export default class Deck {
  private cards: Card[] = [];

  constructor() {
    this.generateCards();
    this.shuffle();
  }

  /**
   * Sets up the deck by generating the standard set of cards based on deck count.
   */
  private generateCards(): void {
    const singleDeck: Card[] = [];

    for (const suit of SUITS) {
      for (const rank of RANKS) {
        singleDeck.push(new Card(rank, suit));
      }
    }

    for (let i = 0; i < NUMBER_OF_DECKS; i += 1) {
      this.cards = [...this.cards, ...singleDeck];
    }
  }

  /**
   * Shuffles the deck.
   * @returns {void}
   */
  public shuffle(): void {
    const {
      cards,
      cards: { length },
    } = this;

    for (let i = 0; i < length; i += 1) {
      const randomIndex = Math.floor(Math.random() * length);
      const temp = cards[randomIndex];
      cards[randomIndex] = cards[i];
      cards[i] = temp;
    }
  }

  /**
   * Returns the card array from the deck.
   * @returns {Card[]}
   */
  public getCards(): Card[] {
    return this.cards;
  }

  /**
   * Draws a card from the deck.
   */
  public drawCard(): Card {
    if (this.cards.length === 0) {
      this.generateCards();
    }

    return this.cards.pop() as Card;
  }
}
