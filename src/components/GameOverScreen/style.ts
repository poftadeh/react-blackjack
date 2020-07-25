import styled from 'styled-components';
import GameOverImage from '../../images/gameover.jpg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(
      to bottom,
      rgba(33, 33, 33, 0.15),
      rgba(33, 33, 33, 0.15)
    ),
    url(${GameOverImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100%;
`;

export const Message = styled.h1`
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 2px;
  font-size: 3rem;
  text-shadow: 0 1px 0 #000;
`;
