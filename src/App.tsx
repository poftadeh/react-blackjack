import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';
import NewGameMenu from './components/NewGameMenu';
import CombinedRootState from './types/CombinedRootState';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    font-size: 62.5%;
  }

  body {
    line-height: 1.7;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid green;
  max-width: 36rem;
  margin: 0 auto;
  height: 100vh;
`;

function App(): ReactElement {
  return (
    <AppWrapper>
      <GlobalStyle />
      <NewGameMenu />
    </AppWrapper>
  );
}

const mapStateToProps = (state: CombinedRootState) => ({
  isGameMenuVisible: state.game.isGameMenuVisible,
});

export default connect(mapStateToProps)(App);
