import React from 'react';
import { connect } from 'react-redux';
import { HandControlButton, HandControlWrapper } from './style';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/StoredPlayer';

interface Props {
  activePlayer?: SerializedPlayer;
}

const HandControls: React.FC<Props> = ({ activePlayer }) => {
  if (!activePlayer?.hand.length) return null;

  return (
    <HandControlWrapper>
      <HandControlButton>Hit</HandControlButton>
      <HandControlButton>Stand</HandControlButton>
      <HandControlButton>Double</HandControlButton>
    </HandControlWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, null)(HandControls);
