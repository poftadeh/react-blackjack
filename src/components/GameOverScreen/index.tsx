import React from 'react';
import { connect } from 'react-redux';
import { Wrapper, Message } from './style';
import { setGameMenuVisibility } from '../../actions';
import { GameAction } from '../../types/GameAction';

interface Props {
  setGameMenuVisibility: (isGameMenuVisible: boolean) => GameAction;
}

const GameOverMenu: React.FC<Props> = ({ setGameMenuVisibility }) => {
  return (
    <Wrapper onClick={() => setGameMenuVisibility(true)}>
      <Message>Game Over</Message>
    </Wrapper>
  );
};

export default connect(null, {
  setGameMenuVisibility,
})(GameOverMenu);
