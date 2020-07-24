import React from 'react';
import { CardContainer, CardBase } from './style';

interface Props {
  rank: string;
  suit: string;
}

const Card: React.FC<Props> = ({ rank, suit }) => {
  const rankCharacter = rank.charAt(0);
  const suitCharacter = suit.charAt(0);

  // need to add this special character as a filename called 'AD' will become hidden by ad blockers.
  const specialChar = `${rankCharacter}${suitCharacter}` === 'AD' ? '_' : '';

  return (
    <CardContainer>
      <CardBase
        src={`assets/images/${
          rankCharacter === '1' ? 'T' : rankCharacter
        }${suitCharacter}${specialChar}.svg`}
      />
    </CardContainer>
  );
};

export default Card;
