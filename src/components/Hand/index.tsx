import React from 'react';
import { connect } from 'react-redux';
import { HandWrapper, HandContainer, HandScore } from './style';
import Card from '../Card';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/StoredPlayer';

interface Props {
  activePlayer?: SerializedPlayer;
}

const Hand: React.FC<Props> = ({ activePlayer }) => {
  if (!activePlayer?.hand.length) return null;

  return (
    <HandWrapper>
      <HandContainer>
        {activePlayer &&
          activePlayer.hand.map(({ suit, rank }) => (
            <Card suit={suit} rank={rank} key={`${rank}${suit}`} />
          ))}
      </HandContainer>
      <HandScore>{activePlayer?.handValue}</HandScore>
    </HandWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, null)(Hand);
