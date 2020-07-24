import React from 'react';
import { connect } from 'react-redux';
import { MenuWrapper, MenuButton } from './style';
import { startGame } from '../../actions';
import { CreatedPlayer } from '../../game';

interface Props {
  startGame: (players: CreatedPlayer[]) => void;
}

const GameMenu: React.FC<Props> = ({ startGame }) => {
  return (
    <MenuWrapper>
      <MenuButton
        onClick={() => startGame([{ name: 'foo', startingChips: 1000 }])}
      >
        New Game
      </MenuButton>
      <MenuButton>Save Game</MenuButton>
      <MenuButton>Load Game</MenuButton>
    </MenuWrapper>
  );
};

export default connect(null, { startGame })(GameMenu);
