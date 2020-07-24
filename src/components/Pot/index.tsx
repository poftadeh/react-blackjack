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

interface Props {
  gamePhase: GamePhase;
  activePlayer: SerializedPlayer;
  dealer: { hand: SerializedHand; handValue: number };
}

const Pot: React.FC<Props> = ({ activePlayer, gamePhase, dealer }) => {
  let animation = '';
  const renderLabel = () => {
    if (
      !activePlayer ||
      activePlayer.handOutcome === HandOutcome.Undetermined
    ) {
      return <BetLabel>Bet: ${activePlayer?.betSize}</BetLabel>;
    }

    if (activePlayer.handOutcome === HandOutcome.Loser) {
      animation = 'take-chip';
      return <LoseLabel>Lose: ${activePlayer?.betSize}</LoseLabel>;
    }

    if (activePlayer.handOutcome === HandOutcome.Winner) {
      animation = 'give-chip';
      return <WinLabel>Win: ${activePlayer?.betSize}</WinLabel>;
    }
    animation = 'take-chip';
    return <PushLabel>Push</PushLabel>;
  };

  return (
    <Wrapper hide={!activePlayer?.betSize}>
      {renderLabel()}
      <ChipWrapper className={animation}>
        <img src="assets/images/chip-red.svg" alt="Betting Chip" />
      </ChipWrapper>
    </Wrapper>
  );
};

export default Pot;
