import styled from 'styled-components';

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
`;

export const BetLabel = styled.p`
  color: #fff;
  border-radius: 4px;
  font-size: 1.2rem;
  padding: 0.5rem;
  background-color: black;
`;

export const ChipImage = styled.div`
  background-image: url(assets/images/chip-red.svg);
`;
