import React, { useState } from 'react';
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
  const [isNewGameSelected, setIsNewGameSelected] = useState(false);

  const newGame = (startingChips) => {
    startGame([{ name: 'PlayerOne', startingChips }]);
  };

  return (
    <MenuWrapper>
      {!isNewGameSelected ? (
        <>
          <MenuButton
            hidden={!activePlayer}
            onClick={() => {
              setGameMenuVisibility(false);
            }}
          >
            Resume
          </MenuButton>
          <MenuButton onClick={() => setIsNewGameSelected(true)}>
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
        </>
      ) : (
        <>
          <MenuButton onClick={() => newGame(10000)}>
            Novice ($10000)
          </MenuButton>
          <MenuButton onClick={() => newGame(5000)}>Normal ($5000)</MenuButton>
          <MenuButton onClick={() => newGame(1000)}>Expert ($1000)</MenuButton>
        </>
      )}
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
