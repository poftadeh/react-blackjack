import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/SerializedPlayer';
import HandWrapper from './style';
import HandContainer from '../common/HandContainer';
import HandScore from '../HandScore';

interface Props {
  activePlayer?: SerializedPlayer;
}

const PlayerHand: React.FC<Props> = ({ activePlayer }) => {
  return (
    <HandWrapper>
      <HandContainer>
        {activePlayer &&
          activePlayer.hand.map(({ suit, rank }) => (
            <Card suit={suit} rank={rank} key={`${rank}${suit}`} />
          ))}
      </HandContainer>
      {activePlayer?.hand.length > 0 && (
        <HandScore
          value={activePlayer.handValue}
          length={activePlayer.hand.length}
        />
      )}
    </HandWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, null)(PlayerHand);
