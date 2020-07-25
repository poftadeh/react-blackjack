import React from 'react';
import { connect } from 'react-redux';
import { MenuWrapper, MenuButton } from './style';
import {
  startGame,
  saveGame,
  loadGame,
  setGameMenuVisibility,
} from '../../actions';
import { CreatedPlayer } from '../../game';
import { GameAction } from '../../types/GameAction';
import SerializedPlayer from '../../types/SerializedPlayer';
import CombinedRootState from '../../types/CombinedRootState';

interface Props {
  startGame: (players: CreatedPlayer[]) => void;
  saveGame: () => void;
  loadGame: () => void;
  isMenuVisible: boolean;
  setGameMenuVisibility: (isGameMenuVisible: boolean) => GameAction;
  activePlayer: SerializedPlayer | null;
}

const GameMenu: React.FC<Props> = ({
  startGame,
  saveGame,
  loadGame,
  setGameMenuVisibility,
  isMenuVisible,
  activePlayer,
}) => {
  return (
    <MenuWrapper>
      <MenuButton
        onClick={() => startGame([{ name: 'foo', startingChips: 1000 }])}
      >
        New Game
      </MenuButton>
      <MenuButton
        disabled={!activePlayer}
        onClick={() => {
          saveGame();
          setGameMenuVisibility(!isMenuVisible);
        }}
      >
        Save Game
      </MenuButton>
      <MenuButton
        disabled={!localStorage.getItem('game')}
        onClick={() => {
          loadGame();
          setGameMenuVisibility(!isMenuVisible);
        }}
      >
        Load Game
      </MenuButton>
    </MenuWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  isMenuVisible: state.game.isGameMenuVisible,
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps, {
  startGame,
  saveGame,
  loadGame,
  setGameMenuVisibility,
})(GameMenu);
