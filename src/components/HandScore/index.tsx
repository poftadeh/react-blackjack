import React from 'react';
import Indicator from './style';

interface Props {
  value: number;
  length: number;
}

const HandScore: React.FC<Props> = ({ value, length }) => {
  const getHandLabelAndColor = () => {
    if (value === 21 && length === 2) {
      return ['BJ', '#2ed573'];
    }

    if (value > 21) {
      return ['BUST', '#c0392b'];
    }

    return [value, '#2c3e50'];
  };

  const [label, color] = getHandLabelAndColor();

  return <Indicator color={String(color)}>{label}</Indicator>;
};

export default HandScore;
