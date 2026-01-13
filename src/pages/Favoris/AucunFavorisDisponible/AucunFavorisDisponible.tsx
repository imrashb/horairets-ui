import { CalendarToday, EventBusy } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GENERATEUR_HORAIRE_URL } from '../../../routes/Routes.constants';
import AucunFavorisDisponibleWrapper from './AucunFavorisDisponible.styles';

function AucunFavorisDisponible(): JSX.Element {
  const { t } = useTranslation('common');

  const navigate = useNavigate();

  return (
    <AucunFavorisDisponibleWrapper>
      <Typography className="title" color="primary" fontWeight={600} variant="h2">
        {t('aucunFavoris')}
      </Typography>
      <EventBusy
        sx={{
          width: '50%',
          height: '50%',
          maxHeight: '20rem',
          maxWidth: '20rem',
        }}
        color="disabled"
      />
      <Button
        variant="contained"
        endIcon={<CalendarToday />}
        onClick={() => navigate(GENERATEUR_HORAIRE_URL)}
      >
        {t('retourGenerateurHoraire')}
      </Button>
    </AucunFavorisDisponibleWrapper>
  );
}

export default AucunFavorisDisponible;
