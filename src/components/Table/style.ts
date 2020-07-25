import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;

  .hidden {
    visibility: hidden;
  }
`;

export const PlayerArea = styled.div`
  height: 20rem;
`;

export const PotContainer = styled.div`
  height: 9rem;
`;
