import React from 'react';
import { connect } from 'react-redux';
import { StyledHeader, Title, MenuButton } from './style';
import CombinedRootState from '../../types/CombinedRootState';
import { setGameMenuVisibility } from '../../actions';
import { GameAction } from '../../types/GameAction';
import SerializedPlayer from '../../types/SerializedPlayer';

interface Props {
  isMenuVisible: boolean;
  setGameMenuVisibility: (isGameMenuVisible: boolean) => GameAction;
  activePlayer: SerializedPlayer | null;
}

const Header: React.FC<Props> = ({ setGameMenuVisibility }) => {
  return (
    <StyledHeader>
      <Title>React Blackjack</Title>
      <MenuButton onClick={() => setGameMenuVisibility(true)} />
    </StyledHeader>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  isMenuVisible: state.game.isGameMenuVisible,
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, { setGameMenuVisibility })(Header);
