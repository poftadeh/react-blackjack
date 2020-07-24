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

export const HandControlButton = styled.button`
  border: none;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  background-color: magenta;
  text-transform: uppercase;
`;
