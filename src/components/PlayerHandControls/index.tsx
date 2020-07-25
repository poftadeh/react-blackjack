import React from 'react';
import { connect } from 'react-redux';
import { HandControlButton, HandControlWrapper } from './style';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/SerializedPlayer';
import { hit, stand, double } from '../../actions';
import { PlayerStatus } from '../../types/PlayerStatus';

interface Props {
  activePlayer?: SerializedPlayer | null;
  hit: () => void;
  stand: () => void;
  double: () => void;
}

const PlayerHandControls: React.FC<Props> = ({
  activePlayer,
  hit,
  stand,
  double,
}) => {
  const isPlayerActive = activePlayer.status === PlayerStatus.Active;
  const isPlayerHoldingCards = activePlayer?.hand.length > 0;

  return (
    <HandControlWrapper>
      {isPlayerActive && isPlayerHoldingCards && (
        <>
          <HandControlButton onClick={hit}>Hit</HandControlButton>
          <HandControlButton onClick={stand}>Stand</HandControlButton>
        </>
      )}
      {activePlayer.hand.length === 2 && isPlayerActive && (
        <HandControlButton
          disabled={activePlayer.stack - activePlayer.betSize < 0}
          onClick={double}
        >
          Double
        </HandControlButton>
      )}
    </HandControlWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, { hit, stand, double })(
  PlayerHandControls,
);
