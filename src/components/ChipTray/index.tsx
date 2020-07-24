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
import SerializedPlayer from '../../types/SerializedPlayer';
import CombinedRootState from '../../types/CombinedRootState';

interface Props {
  bet: (amount: number) => void;
  activePlayer?: SerializedPlayer | null;
}

const ChipTray: React.FC<Props> = ({ bet, activePlayer }) => {
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
          <BetDisplay>
            ${betAmount} ({activePlayer?.name})
          </BetDisplay>
          <BetButton disabled={!betAmount} onClick={() => bet(betAmount)}>
            Bet
          </BetButton>
        </ControlPanel>
        <div className="chips">
          <Chip className="chip-red" onClick={() => handleClick(1)}>
            1
          </Chip>
          <Chip className="chip-green" onClick={() => handleClick(5)}>
            5
          </Chip>
          <Chip className="chip-purple" onClick={() => handleClick(25)}>
            25
          </Chip>
          <Chip className="chip-blue" onClick={() => handleClick(50)}>
            50
          </Chip>
          <Chip className="chip-black" onClick={() => handleClick(100)}>
            100
          </Chip>
        </div>
      </Tray>
    </Wrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, { bet })(ChipTray);
