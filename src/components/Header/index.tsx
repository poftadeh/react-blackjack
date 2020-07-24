import React from 'react';
import { connect } from 'react-redux';
import { StyledHeader, Title, MenuButton } from './style';
import CombinedRootState from '../../types/CombinedRootState';
import { setGameMenuVisibility } from '../../actions';
import { GameAction } from '../../types/GameAction';

interface Props {
  isMenuVisible: boolean;
  setGameMenuVisibility: (isGameMenuVisible: boolean) => GameAction;
}

const Header: React.FC<Props> = ({ setGameMenuVisibility, isMenuVisible }) => {
  return (
    <StyledHeader>
      <Title>React Blackjack</Title>
      <MenuButton onClick={() => setGameMenuVisibility(!isMenuVisible)} />
    </StyledHeader>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  isMenuVisible: state.game.isGameMenuVisible,
});

export default connect(mapStateToProps, { setGameMenuVisibility })(Header);
