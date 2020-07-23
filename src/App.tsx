import React, { ReactElement } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

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
  border: 2px solid green;
  background-color: orangered;
  max-width: 36rem;
  margin: 0 auto;
  height: 100vh;
`;

function App(): ReactElement {
  return (
    <AppWrapper>
      <GlobalStyle />
    </AppWrapper>
  );
}

export default App;
