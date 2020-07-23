import React from 'react';
import { connect } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import NewGameMenu from './components/NewGameMenu';
import ChipTray from './components/ChipTray';
import CombinedRootState from './types/CombinedRootState';
import Header from './components/Header';
import Table from './components/Table';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 62.5%;
    text-rendering: optimizeLegibility;
  }

  body {
    line-height: 1.7;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 36rem;
  height: 100vh;
  margin: 0 auto;
  background-color: #2369d5;
`;

interface Props {
  isGameMenuVisible: boolean;
}

const App: React.FC<Props> = ({ isGameMenuVisible }) => {
  return (
    <AppWrapper>
      <GlobalStyle />
      <Header />
      {isGameMenuVisible ? (
        <NewGameMenu />
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
});

export default connect(mapStateToProps)(App);
