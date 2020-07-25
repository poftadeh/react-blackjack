import styled, { keyframes } from 'styled-components';

export const CardContainer = styled.div`
  width: 6.5rem;
`;

const flipAnimation = keyframes`
  from {
    transform: translateX(3rem);
  }

  to {
    transform: translateX(0);
  }
`;

export const CardBase = styled.img`
  position: relative;
  width: 100%;
  height: auto;
  animation: ${flipAnimation} 0.5s ease-in-out;
`;
