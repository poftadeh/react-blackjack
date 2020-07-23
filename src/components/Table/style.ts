import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: space-around;
`;

export const PlayerArea = styled.div`
  border: 2px solid red;

  & > :first-child {
    margin-bottom: 3rem;
  }
`;
