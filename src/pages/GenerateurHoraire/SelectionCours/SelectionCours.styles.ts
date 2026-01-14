import { Theme } from '@mui/material/styles';
import styled from 'styled-components';

const SelectionCoursWrapper = styled.div`
  flex: 1;
  padding-top: ${({ theme }) => (theme as Theme).sizes.size_16};

  ${({ theme }) => (theme as Theme).breakpoints.down('lg')} {
    margin-top: 0;
  }

  width: 100%;
  height: 100%;

  .MuiAccordionActions-root {
    justify-content: space-between;
  }

  .MuiSnackbar-root {
    max-width: 32rem;
  }
`;

export default SelectionCoursWrapper;
