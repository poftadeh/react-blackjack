import React from 'react';
import { connect } from 'react-redux';
import { HandControlButton, HandControlWrapper } from './style';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/StoredPlayer';
import { hit, stand, double } from '../../actions';

interface Props {
  activePlayer?: SerializedPlayer | null;
  hit: () => void;
  stand: () => void;
  double: () => void;
}

const HandControls: React.FC<Props> = ({
  activePlayer,
  hit,
  stand,
  double,
}) => {
  if (!activePlayer?.hand.length) return null;

  return (
    <HandControlWrapper>
      <HandControlButton onClick={hit}>Hit</HandControlButton>
      <HandControlButton onClick={stand}>Stand</HandControlButton>
      <HandControlButton onClick={double}>Double</HandControlButton>
    </HandControlWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, { hit, stand, double })(HandControls);
