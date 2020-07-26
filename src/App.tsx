import React from 'react';
import { connect } from 'react-redux';
import 'fontsource-lato';
import styled, { createGlobalStyle } from 'styled-components';
import GameMenu from './components/GameMenu';
import ChipTray from './components/ChipTray';
import CombinedRootState from './types/CombinedRootState';
import Header from './components/Header';
import Table from './components/Table';
import GameOverScreen from './components/GameOverScreen';
import SerializedPlayer from './types/SerializedPlayer';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 62.5%;
    font-family: "Lato";
    text-rendering: optimizeLegibility;
  }

  body {
    line-height: 1.7;
    background-color: #000;
  }

  
  @media only screen and (min-width: 405px) {
    html {
      font-size: 80%;
    }
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  margin: 0 auto;
  background-color: #186737;

  @media only screen and (min-width: 405px) {
    max-width: 40rem;
    margin: 0 auto;
  }
`;

interface Props {
  isGameMenuVisible: boolean;
  activePlayer: SerializedPlayer | null;
}

const App: React.FC<Props> = ({ isGameMenuVisible, activePlayer }) => {
  const isPlayerBankrupt =
    activePlayer?.stack < 1 && activePlayer.betSize === 0;

  if (isPlayerBankrupt && !isGameMenuVisible) {
    return (
      <AppWrapper>
        <GlobalStyle />
        <GameOverScreen />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <GlobalStyle />
      <Header />
      {isGameMenuVisible ? (
        <GameMenu />
      ) : (
        <>
          <Table />
          <ChipTray />
        </>
      )}
    </AppWrapper>
  );
};

const mapStateToProps = (state: CombinedRootState) => ({
  isGameMenuVisible: state.game.isGameMenuVisible,
  activePlayer: state.player.activePlayer,
});

export default connect(mapStateToProps)(App);
