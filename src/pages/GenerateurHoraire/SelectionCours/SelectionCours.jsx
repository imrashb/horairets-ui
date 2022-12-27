import { Sync } from '@mui/icons-material';
import {
  Button,
  Card, CardActions, CardContent, CardHeader, Divider,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SelectionCoursWrapper from './SelectionCours.styles';

function SelectionCours() {
  const { t } = useTranslation('common');

  return (
    <SelectionCoursWrapper>
      <Card>
        <CardHeader title={t('cours')} />
        <Divider />
        <CardContent />
        <Divider />
        <CardActions>
          <Button variant="text">
            {t('genererHoraires')}
            <Sync />
          </Button>
        </CardActions>
      </Card>
    </SelectionCoursWrapper>
  );
}

export default SelectionCours;
