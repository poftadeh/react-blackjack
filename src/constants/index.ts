import { Suit } from '../types/Suit';
import { Rank } from '../types/Rank';

export const SUITS: Suit[] = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];

export const RANKS: Rank[] = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King',
  'Ace',
];

export const NUMBER_OF_DECKS = 8;

export const NUMBER_OF_CARDS_PER_DECK = 52;

export const STANDARD_WIN_MULTIPLIER = 2;

export const BLACKJACK_WIN_MULTIPLIER = 2.5;
