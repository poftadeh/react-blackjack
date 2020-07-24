import React from 'react';
import { connect } from 'react-redux';
import PlayerHand from '../PlayerHand';
import PlayerHandControls from '../PlayerHandControls';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/SerializedPlayer';
import { PlayerArea } from './style';
import DealerHand from '../DealerHand';

interface Props {
  activePlayer?: SerializedPlayer;
}

const Table: React.FC<Props> = ({ activePlayer }) => {
  return (
    <>
      <DealerHand />
      <PlayerArea>
        <PlayerHand />
        <PlayerHandControls />
      </PlayerArea>
    </>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, null)(Table);
