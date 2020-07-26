import styled from 'styled-components';
import RedChip from '../../images/chip-red.svg';
import BlueChip from '../../images/chip-blue.svg';
import GreenChip from '../../images/chip-green.svg';
import PurpleChip from '../../images/chip-purple.svg';
import BlackChip from '../../images/chip-black.svg';
import Stack from '../../images/stack.svg';

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
    background-image: url(${RedChip});
  }
  .chip-blue {
    background-image: url(${BlueChip});
  }
  .chip-green {
    background-image: url(${GreenChip});
  }
  .chip-purple {
    background-image: url(${PurpleChip});
  }
  .chip-black {
    background-image: url(${BlackChip});
  }
`;

export const Chip = styled.button`
  border: none;
  color: #fff;
  width: 6.2rem;
  height: 6.2rem;
  border-radius: 50%;
  background-color: transparent;
  font-weight: 500;
  font-size: 1.6rem;
  text-align: center;
  cursor: pointer;
  background-size: cover;
  transition: all 0.5s;
  backface-visibility: hidden;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const StackImage = styled.div`
  background-image: url(${Stack});
  background-repeat: no-repeat;
  background-size: cover;
  width: 2rem;
  height: 2rem;
`;

export const StackContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.1rem;
`;

export const StackDisplay = styled.h3`
  color: #fff;
  margin-left: 0.4rem;
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

  @media only screen and (min-width: 405px) {
    margin: 1rem;
  }
`;
