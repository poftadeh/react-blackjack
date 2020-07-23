import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
`;

export const Tray = styled.div`
  padding: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  background-color: #34495e;

  .chips {
    display: flex;
    justify-content: space-around;
  }
`;

export const Chip = styled.button`
  border: none;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #e74c3c;
  text-align: center;
`;

export const BetDisplay = styled.h3`
  color: white;
  font-size: 3rem;
  align-self: center;
  font-weight: 700;
  min-width: 3ch;
`;

export const DealButton = styled.button`
  font-size: 1.5rem;
`;

export const ClearButton = styled.button`
  font-size: 1.5rem;
`;

export const ControlPanel = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 2rem;
`;
