import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const Tray = styled.div`
  padding: 0 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c3e50;

  .chips {
    display: flex;
    justify-content: space-around;
    width: 30rem;
  }

  .chip-red {
    background-image: url(assets/images/chip-red.svg);
  }
  .chip-blue {
    background-image: url(assets/images/chip-blue.svg);
  }
  .chip-green {
    background-image: url(assets/images/chip-green.svg);
  }
  .chip-purple {
    background-image: url(assets/images/chip-purple.svg);
  }
  .chip-black {
    background-image: url(assets/images/chip-black.svg);
  }
`;

export const Chip = styled.button`
  border: none;
  color: #fff;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: transparent;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  background-size: cover;
`;

export const StackImage = styled.div`
  background-image: url(assets/images/stack.svg);
  background-repeat: no-repeat;
  background-size: cover;
  width: 2rem;
  height: 2rem;
`;

export const StackContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px dashed #fff;
  padding: 0.1rem;
`;

export const StackDisplay = styled.h3`
  color: #fff;
  font-size: 1.5rem;
  align-self: center;
  min-width: 3ch;
`;

export const ControlButton = styled.button`
  border: none;
  padding: 0 1.5rem;
  border-radius: 4px;
  color: #fff;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  background-color: #27ae60;
  text-transform: uppercase;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 1.2rem;
  margin: 0 1.5rem;
`;

export const ControlPanel = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0 0.4rem 0;
`;
