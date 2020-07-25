import styled from 'styled-components';

interface Props {
  isBust: boolean;
}

export default styled.span`
  display: inline-block;
  color: #fff;
  background-color: ${(props: Props) => (props.isBust ? '#c0392b' : '#2c3e50')};
  font-size: 1.5rem;
  text-align: center;
  border-radius: 6px;
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
`;
