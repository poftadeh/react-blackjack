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

const Header: React.FC<Props> = ({
  setGameMenuVisibility,
  isMenuVisible,
  activePlayer,
}) => {
  return (
    <StyledHeader>
      <Title>React Blackjack</Title>
      <MenuButton
        hide={!activePlayer}
        onClick={() => setGameMenuVisibility(!isMenuVisible)}
      />
    </StyledHeader>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  isMenuVisible: state.game.isGameMenuVisible,
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, { setGameMenuVisibility })(Header);
