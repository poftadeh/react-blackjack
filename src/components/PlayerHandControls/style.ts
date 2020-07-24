import styled from 'styled-components';

interface HandControlWrapperProps {
  hide: boolean;
}

export const HandControlWrapper = styled.div`
  visibility: ${(props: HandControlWrapperProps) =>
    props.hide ? 'hidden' : 'visible'};
  display: flex;
  justify-content: space-evenly;
`;

interface HandControlButtonProps {
  disabled?: boolean;
}

export const HandControlButton = styled.button`
  cursor: pointer;
  border: none;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  background-color: #e67e22;
  text-transform: uppercase;
  opacity: ${(props: HandControlButtonProps) => (props.disabled ? 0.5 : 1)};
`;
