import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-around;
`;

export const PlayerArea = styled.div`
  & > :first-child {
    margin-bottom: 1.5rem;
  }
`;
