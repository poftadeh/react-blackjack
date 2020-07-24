import styled, { keyframes } from 'styled-components';

interface WrapperProps {
  hide: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  visibility: ${(props: WrapperProps) => (props.hide ? 'hidden' : 'visible')};

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
`;

export const BetLabel = styled.p`
  color: #fff;
  border-radius: 4px;
  font-size: 1.2rem;
  padding: 0.75rem 1rem;
  background-color: black;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(2);
  }

  100% {
    transform: scale(1);
  }
`;

export const WinLabel = styled(BetLabel)`
  color: #2ecc71;
  animation: ${scaleAnimation} 1s ease-in-out;
`;

export const LoseLabel = styled(BetLabel)`
  color: #e74c3c;
  animation: ${scaleAnimation} 1s ease-in-out;
`;

export const PushLabel = styled(BetLabel)`
  color: #ecf0f1;
  animation: ${scaleAnimation} 1s ease-in-out;
`;

export const ChipImage = styled.div`
  background-image: url(assets/images/chip-red.svg);
`;
