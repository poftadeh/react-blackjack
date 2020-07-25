import React from 'react';
import { connect } from 'react-redux';
import Card from '../Card';
import CombinedRootState from '../../types/CombinedRootState';
import HandContainer from '../common/HandContainer';
import HandScore from '../common/HandScore';
import HandWrapper from './style';
import { SerializedHand } from '../../types/SerializedHand';
import SerializedPlayer from '../../types/SerializedPlayer';
import { PlayerStatus } from '../../types/PlayerStatus';
import GamePhase from '../../types/GamePhase';

interface Props {
  dealer?: { hand: SerializedHand; handValue: number };
  players?: SerializedPlayer[];
  gamePhase: GamePhase;
}

const Dealer: React.FC<Props> = ({ dealer, players, gamePhase }) => {
  const isBust = dealer.handValue > 21;

  return (
    <HandWrapper>
      <HandContainer className={dealer.hand.length === 0 ? 'hidden' : ''}>
        {dealer &&
          dealer.hand.map(({ suit, rank }, i) => {
            if (
              i === 0 &&
              gamePhase !== GamePhase.DealerHand &&
              gamePhase !== GamePhase.Results
            ) {
              return <Card suit="B" rank="B" key={`${rank}${suit}`} />;
            }

            return <Card suit={suit} rank={rank} key={`${rank}${suit}`} />;
          })}
      </HandContainer>
      {dealer.hand.length > 0 && (
        <HandScore isBust={isBust}>
          {isBust ? 'BUST' : dealer.handValue}
        </HandScore>
      )}
    </HandWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  dealer: state.game.dealer,
  players: state.player.players,
  gamePhase: state.game.phase,
});

export default connect(mapStateToProps, null)(Dealer);
