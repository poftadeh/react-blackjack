import React from 'react';
import { connect } from 'react-redux';
import { MenuWrapper, NewGameButton } from './style';
import { startGame } from '../../actions';
import { CreatedPlayer } from '../../game';

interface Props {
  startGame: (players: CreatedPlayer[]) => void;
}

const NewGameMenu: React.FC<Props> = ({ startGame }) => {
  return (
    <MenuWrapper>
      <NewGameButton
        onClick={() => startGame([{ name: 'foo', startingChips: 1000 }])}
      >
        New Game
      </NewGameButton>
    </MenuWrapper>
  );
};

export default connect(null, { startGame })(NewGameMenu);
