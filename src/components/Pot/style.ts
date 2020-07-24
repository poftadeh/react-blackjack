import styled, { keyframes } from 'styled-components';

interface WrapperProps {
  hide: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 4rem;
    height: 4rem;
  }

  .take-chip {
    position: fixed;
    transform: translateY(-150vh);
  }

  .give-chip {
    position: fixed;
    transform: translateY(150vh);
  }
`;

export const ChipWrapper = styled.div`
  text-align: center;
  transition: all 4s;
  z-index: 999;
`;

const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
`;

export const BetLabel = styled.p`
  color: #fff;
  border-radius: 4px;
  font-size: 1.2rem;
  padding: 0.75rem 1rem;
  background-color: black;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  animation: ${scaleAnimation} 0.75s ease-in-out;
`;

export const WinLabel = styled(BetLabel)`
  color: #2ecc71;
`;

export const LoseLabel = styled(BetLabel)`
  color: #e74c3c;
`;

export const PushLabel = styled(BetLabel)`
  color: #ecf0f1;
`;

export const ChipImage = styled.div`
  background-image: url(assets/images/chip-red.svg);
`;
