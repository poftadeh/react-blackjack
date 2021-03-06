import styled from 'styled-components';

export const HandControlWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 35rem;
  margin: 0 auto;
`;

interface HandControlButtonProps {
  disabled?: boolean;
}

export const HandControlButton = styled.button`
  cursor: pointer;
  border: none;
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  background-color: #e67e22;
  text-transform: uppercase;
  opacity: ${(props: HandControlButtonProps) => (props.disabled ? 0.5 : 1)};
`;
