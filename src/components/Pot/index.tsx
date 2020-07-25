import React from 'react';
import {
  Wrapper,
  LoseLabel,
  BetLabel,
  WinLabel,
  PushLabel,
  ChipWrapper,
} from './style';
import SerializedPlayer from '../../types/SerializedPlayer';
import GamePhase from '../../types/GamePhase';
import { SerializedHand } from '../../types/SerializedHand';
import HandOutcome from '../../types/HandOutcome';
import RedChip from '../../images/chip-red.svg';

interface Props {
  activePlayer: SerializedPlayer;
  trayAmount: number;
}

const Pot: React.FC<Props> = ({ activePlayer, trayAmount }) => {
  let animation = '';
  const renderLabel = () => {
    if (
      !activePlayer ||
      activePlayer.handOutcome === HandOutcome.Undetermined
    ) {
      return <BetLabel>Bet: ${activePlayer?.betSize || trayAmount}</BetLabel>;
    }

    if (activePlayer.handOutcome === HandOutcome.Loser) {
      animation = 'take-chip';
      return <LoseLabel>Lose: ${activePlayer?.betSize}</LoseLabel>;
    }

    if (activePlayer.handOutcome === HandOutcome.Winner) {
      animation = 'give-chip';
      return <WinLabel>Win: ${activePlayer?.betSize}</WinLabel>;
    }
    animation = 'give-chip';
    return <PushLabel>Push</PushLabel>;
  };

  return (
    <Wrapper>
      {renderLabel()}
      <ChipWrapper className={animation}>
        <img src={RedChip} alt="Betting Chip" />
      </ChipWrapper>
    </Wrapper>
  );
};

export default Pot;
