import React from 'react';
import { connect } from 'react-redux';
import { Wrapper, BetLabel } from './style';
import SerializedPlayer from '../../types/SerializedPlayer';
import CombinedRootState from '../../types/CombinedRootState';

interface Props {
  activePlayer?: SerializedPlayer | null;
}

const Pot: React.FC<Props> = ({ activePlayer }) => {
  return (
    <Wrapper>
      <BetLabel>Bet: ${activePlayer?.betSize}</BetLabel>
      <img src="assets/images/chip-red.svg" alt="Betting Chip" />
    </Wrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, null)(Pot);
