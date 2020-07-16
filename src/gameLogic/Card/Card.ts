import { Suit } from '../../types/Suit';
import { Rank } from '../../types/Rank';

export default class Card {
  private suit: Suit;
  private rank: Rank;

  constructor(suit: Suit, rank: Rank) {
    this.suit = suit;
    this.rank = rank;
  }
}
