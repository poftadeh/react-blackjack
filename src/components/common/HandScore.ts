import styled from 'styled-components';

interface Props {
  isBust: boolean;
}

export default styled.div`
  color: #fff;
  background-color: ${(props: Props) => (props.isBust ? '#c0392b' : '#2c3e50')};
  font-size: 1.2rem;
  text-align: center;
  border-radius: 6px;
  margin: 1rem 1rem;
  padding: 0.5rem 1.25rem;
  flex: 0;
`;
