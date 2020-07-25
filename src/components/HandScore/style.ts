import styled from 'styled-components';

interface Props {
  color: string;
}

export default styled.div`
  color: #fff;
  background-color: ${(props: Props) => props.color};
  font-size: 1.2rem;
  text-align: center;
  border-radius: 6px;
  margin: 1rem 1rem;
  padding: 0.5rem 1.25rem;
  flex: 0;
`;
