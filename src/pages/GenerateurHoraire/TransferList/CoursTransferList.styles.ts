import { Theme } from '@mui/material/styles';
import styled from 'styled-components';

const CoursTransferListWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  .selection-list {
    padding: ${({ theme }) => (theme as Theme).sizes.size_8};

    width: 50%;

    & > * {
      width: 100%;
    }

    .MuiList-root {
      height: ${({ theme }) => (theme as Theme).sizes.size_160};
      overflow-y: auto;
    }
  }

  .swap-icon {
    align-self: center;
    margin: ${({ theme }) => (theme as Theme).sizes.size_8};
  }
`;

export default CoursTransferListWrapper;
