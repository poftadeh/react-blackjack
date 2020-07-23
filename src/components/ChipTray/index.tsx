import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bet } from '../../actions';
import {
  Tray,
  Chip,
  BetDisplay,
  Wrapper,
  ClearButton,
  BetButton,
  ControlPanel,
} from './style';

interface Props {
  bet: (amount: number) => void;
}

const ChipTray: React.FC<Props> = ({ bet }) => {
  const [betAmount, setBetAmount] = useState<number>(0);

  const handleClick = (amount: number): void => {
    setBetAmount((previousAmount) => previousAmount + amount);
  };

  const clearBet = () => setBetAmount(0);

  return (
    <Wrapper>
      <Tray>
        <ControlPanel>
          <ClearButton onClick={clearBet}>Clear</ClearButton>
          <BetDisplay>${betAmount}</BetDisplay>
          <BetButton disabled={!betAmount} onClick={() => bet(betAmount)}>
            Bet
          </BetButton>
        </ControlPanel>
        <div className="chips">
          <Chip onClick={() => handleClick(1)}>$1</Chip>
          <Chip onClick={() => handleClick(5)}>$5</Chip>
          <Chip onClick={() => handleClick(10)}>$10</Chip>
          <Chip onClick={() => handleClick(25)}>$25</Chip>
          <Chip onClick={() => handleClick(50)}>$50</Chip>
          <Chip onClick={() => handleClick(100)}>$100</Chip>
        </div>
      </Tray>
    </Wrapper>
  );
};

export default connect(null, { bet })(ChipTray);
