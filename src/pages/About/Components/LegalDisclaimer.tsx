import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BaseCard } from '../../../components/Cards/BaseCard';

function LegalDisclaimer(): JSX.Element {
  const { t } = useTranslation('common');

  return (
    <BaseCard>
      <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.85rem', textAlign: 'center' }}>
        {t('footerDisclaimer')}
      </Typography>
    </BaseCard>
  );
}

export default LegalDisclaimer;
