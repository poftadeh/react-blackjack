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
import GamePhase from '../../types/GamePhase';

interface Props {
  bet: (amount: number) => void;
  setTrayAmount: (trayAmount: number) => GameAction;
  activePlayer?: SerializedPlayer | null;
  gamePhase: GamePhase;
}

const ChipTray: React.FC<Props> = ({
  bet,
  activePlayer,
  setTrayAmount,
  gamePhase,
}) => {
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

  const isBettingPhase = gamePhase === GamePhase.Betting;

  return (
    <Wrapper>
      <Tray>
        <ControlPanel>
          <ClearButton
            onClick={clearBet}
            disabled={!betAmount || !isBettingPhase}
          >
            Clear
          </ClearButton>
          <StackContainer>
            <StackImage />
            <StackDisplay>${activePlayer?.stack - betAmount}</StackDisplay>
          </StackContainer>
          <BetButton
            disabled={!betAmount || !isBettingPhase}
            onClick={() => {
              bet(betAmount);
              setBetAmount(0);
            }}
          >
            Deal
          </BetButton>
        </ControlPanel>
        <div className="chips">
          <Chip
            className="chip-red"
            onClick={() => handleClick(1)}
            disabled={!isBettingPhase}
          >
            1
          </Chip>
          <Chip
            className="chip-green"
            onClick={() => handleClick(5)}
            disabled={!isBettingPhase}
          >
            5
          </Chip>
          <Chip
            className="chip-purple"
            onClick={() => handleClick(25)}
            disabled={!isBettingPhase}
          >
            25
          </Chip>
          <Chip
            className="chip-blue"
            onClick={() => handleClick(50)}
            disabled={!isBettingPhase}
          >
            50
          </Chip>
          <Chip
            className="chip-black"
            onClick={() => handleClick(100)}
            disabled={!isBettingPhase}
          >
            100
          </Chip>
        </div>
      </Tray>
    </Wrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
  gamePhase: state.game.phase,
});

export default connect(mapStateToProps, {
  bet,
  setTrayAmount,
})(ChipTray);
