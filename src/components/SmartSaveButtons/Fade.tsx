import styled from 'styled-components';

interface FadeProps {
  $visible: boolean;
}

/**
 * A simple CSS-only fade transition wrapper.
 * Keeps the element in the DOM but toggles opacity, visibility, and pointer-events.
 */
export const Fade = styled.div<FadeProps>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.2s ease-out, visibility 0.2s ease-out;
`;
