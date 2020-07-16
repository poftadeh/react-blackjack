import Card from '../Card/Card';
import { SUITS, RANKS } from '../../constants';

export default class Deck {
  private cards: Card[] = [];

  constructor() {
    this.generateCards();
  }

  generateCards() {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  getCards() {
    return this.cards;
  }
}
