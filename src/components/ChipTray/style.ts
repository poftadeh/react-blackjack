import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Tray = styled.div`
  padding: 0 0 2rem 0;
  display: flex;
  flex-direction: column;
  background-color: #2c3e50;

  .chips {
    display: flex;
    justify-content: space-around;
  }
`;

export const Chip = styled.button`
  border: none;
  color: #fff;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #c0392b;
  text-align: center;
  cursor: pointer;
`;

export const BetDisplay = styled.h3`
  color: white;
  font-size: 2.5rem;
  align-self: center;
  min-width: 3ch;
`;

const ControlButton = styled.button`
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  color: #fff;
  margin-top: 1rem;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  background-color: #e67e22;
  text-transform: uppercase;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

export const BetButton = styled(ControlButton)`
  font-size: 1.5rem;
`;

export const ClearButton = styled(ControlButton)`
  font-size: 1.5rem;
`;

export const ControlPanel = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0 2rem 0;
`;
