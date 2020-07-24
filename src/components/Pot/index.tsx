import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Wrapper,
  LoseLabel,
  BetLabel,
  WinLabel,
  PushLabel,
  ChipWrapper,
} from './style';
import SerializedPlayer from '../../types/SerializedPlayer';
import CombinedRootState from '../../types/CombinedRootState';
import GamePhase from '../../types/GamePhase';
import { SerializedHand } from '../../types/SerializedHand';
import HandOutcome from '../../types/HandOutcome';

interface Props {
  gamePhase: GamePhase;
  activePlayer: SerializedPlayer | null;
  dealer: { hand: SerializedHand; handValue: number };
}

const Pot = ({ activePlayer, gamePhase, dealer }: Props) => {
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

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
  gamePhase: state.game.phase,
  dealer: state.game.dealer,
});

export default connect(mapStateToProps, null)(Pot);
