import React from 'react';
import { connect } from 'react-redux';
import Hand from '../PlayerHand';
import HandControls from '../PlayerHandControls';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/SerializedPlayer';
import { PlayerArea } from './style';

interface Props {
  activePlayer?: SerializedPlayer;
}

const Table: React.FC<Props> = ({ activePlayer }) => {
  return (
    <PlayerArea>
      <Hand />
      <HandControls />
    </PlayerArea>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, null)(Table);
