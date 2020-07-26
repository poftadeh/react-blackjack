import styled from 'styled-components';
import CardBg from '../../images/card-bg.jpg';

export const MenuWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 3rem;
  background-image: linear-gradient(
      to bottom,
      rgba(33, 33, 33, 0.75),
      rgba(33, 33, 33, 0.75)
    ),
    url(${CardBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 1s;
`;

export const MenuButton = styled.button`
  text-shadow: 0 1px 0 #000;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: transparent;
  border: 3px solid transparent;
  outline: none;
  font-size: 2.5rem;
  font-weight: 500;
  padding: 1.5rem;
  transition: all 0.5s;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  @media (hover: hover) {
    &:hover {
      border: ${(props) =>
        props.disabled ? '3px solid transparent' : '3px solid #fff'};
    }
  }
`;

export const NewGameButton = styled(MenuButton)``;
