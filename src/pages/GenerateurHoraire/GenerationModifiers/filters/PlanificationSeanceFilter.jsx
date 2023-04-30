import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FILTRES_PLANIFICATION } from '../../generateurHoraire.constants';
import { selectFilterPlanification } from '../../../../features/generateur/generateur.slice';

function PlanificationSeanceFilter({ onChange }) {
  const { t } = useTranslation('common');
  const planification = useSelector(selectFilterPlanification);
  const [controlledPlanification, setControlledPlanification] = useState(planification);
  return (
    <FormControl fullWidth variant="standard">
      <InputLabel>{t('planificationSeances')}</InputLabel>
      <Select
        multiple
        value={controlledPlanification}
        onChange={(e) => {
          setControlledPlanification(e?.target?.value);
          if (onChange) onChange(e?.target?.value);
        }}
        label={t('trierPar')}
      >
        {FILTRES_PLANIFICATION.map(
          (value) => (<MenuItem key={value} value={value}>{t(value)}</MenuItem>),
        )}
      </Select>
    </FormControl>
  );
}

export default PlanificationSeanceFilter;
