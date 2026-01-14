import styled from 'styled-components';
import { Theme } from '@mui/material';

export const BaseCard = styled.div`
  background: ${({ theme }) => (theme as Theme).palette.grey[100]};
  border: 1px solid ${({ theme }) => (theme as Theme).palette.grey[200]};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
`;
