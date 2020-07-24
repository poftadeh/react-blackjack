import styled from 'styled-components';

export const MenuWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background-image: linear-gradient(
      to bottom,
      rgba(55, 55, 55, 0.8),
      rgba(33, 33, 33, 0.8)
    ),
    url(assets/images/card-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background: (33, 33, 33, 0.3);
  transition: all 1s;
`;

export const MenuButton = styled.button`
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  background-color: transparent;
  border: 3px solid transparent;
  font-size: 2.5rem;
  font-weight: 500;
  transition: all 0.5s;
  padding: 0.5rem;
  margin-bottom: 8rem;

  &:hover {
    border: 3px solid #fff;
  }
`;

export const NewGameButton = styled(MenuButton)``;
