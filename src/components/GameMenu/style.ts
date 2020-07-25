import styled from 'styled-components';

export const MenuWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  background-image: linear-gradient(
      to bottom,
      rgba(33, 33, 33, 0.3),
      rgba(33, 33, 33, 0.45)
    ),
    url(assets/images/card-bg.jpg);
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
  font-size: 2.5rem;
  font-weight: 500;
  padding: 1.5rem;
  margin-bottom: 8rem;
  transition: all 1s;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    border: ${(props) =>
      props.disabled ? '3px solid transparent' : '3px solid #fff'};
  }
`;

export const NewGameButton = styled(MenuButton)``;
