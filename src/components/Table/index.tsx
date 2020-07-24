import React from 'react';
import { connect } from 'react-redux';
import PlayerHand from '../PlayerHand';
import PlayerHandControls from '../PlayerHandControls';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/SerializedPlayer';
import { PlayerArea } from './style';
import DealerHand from '../DealerHand';
import Pot from '../Pot';
import GamePhase from '../../types/GamePhase';
import { SerializedHand } from '../../types/SerializedHand';

interface Props {
  gamePhase: GamePhase;
  activePlayer: SerializedPlayer | null;
  dealer: { hand: SerializedHand; handValue: number };
}

const Table: React.FC<Props> = ({ activePlayer, gamePhase, dealer }) => {
  return (
    <>
      <DealerHand />
      <Pot activePlayer={activePlayer} gamePhase={gamePhase} dealer={dealer} />
      <PlayerArea>
        <PlayerHand />
        <PlayerHandControls />
      </PlayerArea>
    </>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
  gamePhase: state.game.phase,
  dealer: state.game.dealer,
});

export default connect(mapStateToProps, null)(Table);
