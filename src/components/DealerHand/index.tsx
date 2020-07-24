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

interface Props {
  dealer?: { hand: SerializedHand; handValue: number };
  players?: SerializedPlayer[];
}

const Dealer: React.FC<Props> = ({ dealer, players }) => {
  const isPlayerGroupActive = (): boolean | undefined => {
    return players?.some((player) => player.status === PlayerStatus.Active);
  };

  if (!dealer?.hand.length) return null;

  return (
    <HandWrapper>
      <HandContainer>
        {dealer &&
          dealer.hand.map(({ suit, rank }, i) => {
            if (i === 0 && isPlayerGroupActive()) {
              return <Card suit="B" rank="B" key={`${rank}${suit}`} />;
            }

            return <Card suit={suit} rank={rank} key={`${rank}${suit}`} />;
          })}
      </HandContainer>
      <HandScore>{dealer?.handValue}</HandScore>
    </HandWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  dealer: state.game.dealer,
  players: state.player.players,
});

export default connect(mapStateToProps, null)(Dealer);
