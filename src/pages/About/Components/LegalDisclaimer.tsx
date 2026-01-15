import { Typography, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const DisclaimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  gap: 8px;
  opacity: 0.8;
  margin-top: 16px;

  &:hover {
    opacity: 1;
    border-color: ${({ theme }) => theme.palette.text.secondary};
  }
`;

function LegalDisclaimer(): JSX.Element {
  const { t } = useTranslation('common');
  const theme = useTheme();

  return (
    <DisclaimerWrapper theme={theme}>
      <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem' }}>
        {t('footerDisclaimer')}
      </Typography>
    </DisclaimerWrapper>
  );
}

export default LegalDisclaimer;
