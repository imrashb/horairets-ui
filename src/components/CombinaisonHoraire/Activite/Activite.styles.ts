import { Theme } from '@mui/material/styles';
import styled from 'styled-components';

interface ActiviteWrapperProps {
  flex: number;
  borderColor: string;
  color: string;
}

const ActiviteWrapper = styled.div<ActiviteWrapperProps>`
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  flex: ${(props) => `${props.flex}`};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  .wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;

    width: 99%;
    height: 100%;

    border-radius: ${({ theme }) => (theme as Theme).sizes.size_16};
    border: ${({ theme }) => (theme as Theme).sizes.size_2} solid
      ${(props) => `${props.borderColor}`};
    border-bottom: ${({ theme }) => (theme as Theme).sizes.size_8} solid
      ${(props) => `${props.borderColor}`};

    ${({ theme }) => (theme as Theme).breakpoints.down('sm')} {
      border-radius: ${({ theme }) => (theme as Theme).sizes.size_8};
      border: ${({ theme }) => (theme as Theme).sizes.size_1} solid
        ${(props) => `${props.borderColor}`};
      border-bottom: ${({ theme }) => (theme as Theme).sizes.size_4} solid
        ${(props) => `${props.borderColor}`};
    }

    border-top: none;

    padding: 3%;
    background: ${(props) => `${props.color}`};
    margin: ${({ theme }) => (theme as Theme).sizes.size_0}
      ${({ theme }) => (theme as Theme).sizes.size_2}
      ${({ theme }) => (theme as Theme).sizes.size_2}
      ${({ theme }) => (theme as Theme).sizes.size_4};
    margin-top: 0;

    text-shadow: #000 0px 2px 2px;
    -webkit-font-smoothing: antialiased;
  }
`;

export default ActiviteWrapper;
