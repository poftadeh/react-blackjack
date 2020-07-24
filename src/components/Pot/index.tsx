import React from 'react';
import { connect } from 'react-redux';
import { Wrapper, LoseLabel, BetLabel, WinLabel, PushLabel } from './style';
import SerializedPlayer from '../../types/SerializedPlayer';
import CombinedRootState from '../../types/CombinedRootState';
import GamePhase from '../../types/GamePhase';
import { SerializedHand } from '../../types/SerializedHand';
import { PlayerStatus } from '../../types/PlayerStatus';
import HandOutcome from '../../types/HandOutcome';

interface Props {
  gamePhase: GamePhase;
  activePlayer: SerializedPlayer | null;
  dealer: { hand: SerializedHand; handValue: number };
}

const Pot = ({ activePlayer, gamePhase, dealer }: Props) => {
  const renderLabel = () => {
    if (
      !activePlayer ||
      activePlayer.handOutcome === HandOutcome.Undetermined
    ) {
      return <BetLabel>Bet: ${activePlayer?.betSize}</BetLabel>;
    }

    if (activePlayer.handOutcome === HandOutcome.Loser) {
      return <LoseLabel>Lose: ${activePlayer?.betSize}</LoseLabel>;
    }

    if (activePlayer.handOutcome === HandOutcome.Winner) {
      return <WinLabel>Win: ${activePlayer?.betSize}</WinLabel>;
    }

    return <PushLabel>Push</PushLabel>;
  };

  return (
    <Wrapper hide={!activePlayer?.betSize}>
      {renderLabel()}
      <img src="assets/images/chip-red.svg" alt="Betting Chip" />
    </Wrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
  gamePhase: state.game.phase,
  dealer: state.game.dealer,
});

export default connect(mapStateToProps, null)(Pot);
