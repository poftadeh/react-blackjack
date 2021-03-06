import Card from '../Card';
import { Rank } from '../../types/Rank';
import { Suit } from '../../types/Suit';

interface StoredHand {
  cards: { suit: string; rank: string }[];
  isBlackJack: boolean;
  isBust: boolean;
  value: number;
}
export default class Hand {
  private cards: Card[] = [];

  private value = 0;

  private isBlackJack = false;

  private isBust = false;

  /**
   * Returns the cards contained in the hand.
   * @returns {Card[]}
   */
  public getCards(): Card[] {
    return this.cards;
  }

  public static createHandFromStorageData({
    cards,
    isBlackJack,
    isBust,
    value,
  }: StoredHand): Hand {
    const formattedCards = cards.map(
      (card: { suit: string; rank: string }) =>
        new Card(card.rank as Rank, card.suit as Suit),
    );

    const hand = new Hand();
    hand.cards = formattedCards;
    hand.isBlackJack = isBlackJack;
    hand.isBust = isBust;
    hand.value = value;

    return hand;
  }

  /**
   * Returns the value of the hand
   * @returns {number}
   */
  public getValue(): number {
    return this.value;
  }

  /**
   * Returns whether or not the hand is a blackjack
   * @returns {number}
   */
  public getIsBlackJack(): boolean {
    return this.isBlackJack;
  }

  /**
   * Returns whether or not the hand is bust.
   * @returns {number}
   */
  public getIsBust(): boolean {
    return this.isBust;
  }

  /**
   * Adds a Card object to the hand.
   * @param card
   */
  public addCard(card: Card): void {
    this.cards.push(card);
    this.calculateHandValue();
  }

  /**
   * Calculates the total value of the hand.
   */
  private calculateHandValue(): void {
    // simplify calculations by moving Aces to the back of the hand.
    const sortedHand: Card[] = [...this.cards].sort((a) =>
      a.getRank() === 'Ace' ? 1 : -1,
    );

    const total: number = sortedHand.reduce((acc, card) => {
      const rank = card.getRank();

      if (rank === 'Ace') {
        return acc >= 11 ? acc + 1 : acc + 11;
      }
      if (['Jack', 'Queen', 'King'].includes(rank)) {
        return acc + 10;
      }
      return acc + Number(rank);
    }, 0);

    if (total >= 22) {
      this.isBust = true;
    }

    if (total === 21 && sortedHand.length === 2) {
      this.isBlackJack = true;
    }

    this.value = total;
  }
}
