import styled from 'styled-components';

export const HandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HandContainer = styled.div`
  display: flex;
  justify-content: center;

  & > *:not(:first-child) {
    margin-left: -3rem;
  }
`;

export const HandScore = styled.span`
  display: inline-block;
  color: white;
  background-color: #2c3e50;
  font-size: 2rem;
  width: 3rem;
  text-align: center;
  border-radius: 6px;
`;
