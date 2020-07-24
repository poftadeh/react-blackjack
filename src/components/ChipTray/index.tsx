import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bet, setTrayAmount } from '../../actions';
import {
  Tray,
  Chip,
  StackDisplay,
  Wrapper,
  ClearButton,
  BetButton,
  ControlPanel,
  StackImage,
  StackContainer,
} from './style';
import SerializedPlayer from '../../types/SerializedPlayer';
import CombinedRootState from '../../types/CombinedRootState';
import { GameAction } from '../../types/GameAction';

interface Props {
  bet: (amount: number) => void;
  setTrayAmount: (trayAmount: number) => GameAction;
  activePlayer?: SerializedPlayer | null;
}

const ChipTray: React.FC<Props> = ({ bet, activePlayer, setTrayAmount }) => {
  const [betAmount, setBetAmount] = useState<number>(0);

  const handleClick = (amount: number): void => {
    if (activePlayer?.stack - betAmount - amount < 0) return;
    setBetAmount((previousAmount) => previousAmount + amount);
    setTrayAmount(betAmount + amount);
  };

  const clearBet = () => {
    setBetAmount(0);
    setTrayAmount(0);
  };

  return (
    <Wrapper>
      <Tray>
        <ControlPanel>
          <ClearButton onClick={clearBet}>Clear</ClearButton>
          <StackContainer>
            <StackImage />
            <StackDisplay>${activePlayer?.stack - betAmount}</StackDisplay>
          </StackContainer>
          <BetButton
            disabled={!betAmount}
            onClick={() => {
              bet(betAmount);
              setBetAmount(0);
            }}
          >
            Deal
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

export default connect(mapStateToProps, {
  bet,
  setTrayAmount,
})(ChipTray);
