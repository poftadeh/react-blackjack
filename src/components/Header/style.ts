import styled from 'styled-components';

export const StyledHeader = styled.header`
  background-color: #2c3e50;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;

  .emoji {
    font-size: 2rem;
  }
`;

export const Title = styled.h1`
  color: #fff;
  letter-spacing: 1.5px;
  margin-left: 1rem;
  font-size: 1.5rem;
`;

interface MenuButtonProps {
  hide: boolean;
}

export const MenuButton = styled.button`
  visibility: ${(props: MenuButtonProps) =>
    props.hide ? 'hidden' : 'visible'};
  border: none;
  width: 3rem;
  height: 3rem;
  margin-right: 0.5rem;
  cursor: pointer;
  background-color: inherit;
  background-size: cover;
  background-image: url(assets/images/menu.svg);
  background-repeat: no-repeat;
`;
