import React from 'react';
import { CardContainer, CardBase } from './style';
import CardImages from '../../utils/CardImages';

interface Props {
  rank: string;
  suit: string;
}

const Card: React.FC<Props> = ({ rank, suit }) => {
  return (
    <CardContainer>
      <CardBase src={CardImages[`${rank}${suit}`]} />
    </CardContainer>
  );
};

export default Card;
