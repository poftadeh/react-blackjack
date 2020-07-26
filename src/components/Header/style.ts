import styled from 'styled-components';
import MenuIcon from '../../images/menu.svg';

export const StyledHeader = styled.header`
  background-color: #2c3e50;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
`;

export const Title = styled.h1`
  color: #fff;
  letter-spacing: 1.5px;
  margin-left: 1rem;
  font-size: 1.5rem;
`;

export const MenuButton = styled.div`
  width: 3rem;
  height: 100%;
  cursor: pointer;
  background-color: inherit;
  background-size: cover;
  background-image: url(${MenuIcon});
  background-repeat: no-repeat;
  background-position: center;
`;
