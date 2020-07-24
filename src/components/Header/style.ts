import styled from 'styled-components';

export const StyledHeader = styled.header`
  padding: 0.5rem 1rem;
  background-color: #2c3e50;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h1`
  color: #fff;
  letter-spacing: 1.5px;
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
  cursor: pointer;
  background-color: inherit;
  background-size: cover;
  background-image: url(assets/images/menu.svg);
  background-repeat: no-repeat;
`;
