import React from 'react';
import { CardBase, CardFace } from './style';
import { Rank } from '../../../types/Rank';
import { Suit } from '../../../types/Suit';

interface Props {
  rank: Rank;
  suit: Suit;
}

const suitToSymbol = {
  Hearts: '♥️',
  Diamonds: '♦️',
  Spades: '♠️',
  Clubs: '♣️',
};

const Card: React.FC<Props> = ({ rank, suit }) => {
  return (
    <CardBase>
      <CardFace>
        {/* <div className="top">{rank}</div>
        <div className="mid">{suitToSymbol[suit]}</div>
        <div className="bottom">{rank}</div> */}
      </CardFace>
    </CardBase>
  );
};

export default Card;
