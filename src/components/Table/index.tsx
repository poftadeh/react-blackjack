import React from 'react';
import { connect } from 'react-redux';
import PlayerHand from '../PlayerHand';
import PlayerHandControls from '../PlayerHandControls';
import CombinedRootState from '../../types/CombinedRootState';
import SerializedPlayer from '../../types/SerializedPlayer';
import { PlayerArea, Wrapper, PotContainer } from './style';
import DealerHand from '../DealerHand';
import Pot from '../Pot';
import GamePhase from '../../types/GamePhase';
import { SerializedHand } from '../../types/SerializedHand';

interface Props {
  gamePhase: GamePhase;
  activePlayer: SerializedPlayer | null;
  dealer: { hand: SerializedHand; handValue: number };
  trayAmount: number;
}

const Table: React.FC<Props> = ({
  activePlayer,
  gamePhase,
  dealer,
  trayAmount,
}) => {
  return (
    <Wrapper>
      <DealerHand />
      <PotContainer>
        {(!!trayAmount || !!activePlayer?.betSize) && (
          <Pot
            activePlayer={activePlayer}
            gamePhase={gamePhase}
            dealer={dealer}
            trayAmount={trayAmount}
          />
        )}
      </PotContainer>
      <PlayerArea>
        <PlayerHand />
        <PlayerHandControls />
      </PlayerArea>
    </Wrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  activePlayer: state.player.activePlayer,
  gamePhase: state.game.phase,
  dealer: state.game.dealer,
  trayAmount: state.game.trayAmount,
});

export default connect(mapStateToProps, null)(Table);
