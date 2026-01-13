import { Theme } from '@mui/material/styles';
import styled from 'styled-components';

const CombinaisonHoraireWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;

  ${({ theme }) => (theme as Theme).breakpoints.down('md')} {
    font-size: 2vw;
  }

  padding-bottom: ${({ theme }) => (theme as Theme).sizes.size_16};

  .heures-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    margin-right: ${({ theme }) => (theme as Theme).sizes.size_8};
    margin-top: ${({ theme }) => (theme as Theme).sizes.size_12};
  }
`;

export default CombinaisonHoraireWrapper;
