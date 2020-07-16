import Card from '../Card';

export default class Hand {
  private cards: Card[] = [];

  constructor(firstCard: Card, secondCard: Card) {
    this.cards = [firstCard, secondCard];
  }

  /**
   * Returns the cards contained in the hand.
   * @returns {Card[]}
   */
  getCards() {
    return this.cards;
  }
}
