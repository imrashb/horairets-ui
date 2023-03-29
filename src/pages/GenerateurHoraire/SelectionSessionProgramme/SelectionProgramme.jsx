import {
  FormControl, InputLabel, MenuItem, Select, Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useGetProgrammesQuery } from '../../../features/generateur/generateur.api';
import { selectProgramme } from '../../../features/generateur/generateur.slice';

function SelectionProgramme({ onChange }) {
  const { t } = useTranslation('common');
  const programme = useSelector(selectProgramme);
  const [controlledProgramme, setControlledProgramme] = useState(programme);
  const programmesQuery = useGetProgrammesQuery();

  const onProgrammeChange = (event) => {
    const p = event?.target?.value;
    setControlledProgramme(p);
  };

  useEffect(() => {
    if (onChange) onChange(controlledProgramme);
  }, [controlledProgramme]);

  return (
    programmesQuery.isLoading
      ? <Skeleton variant="rectangular" width="100%" height="3rem" />
      : (
        <FormControl error={controlledProgramme === ''} required variant="standard">
          <InputLabel>{t('programme')}</InputLabel>
          <Select
            value={controlledProgramme}
            onChange={onProgrammeChange}
            label={t('programme')}
            multiple
          >
            {programmesQuery?.data?.map(
              (p) => (
                <MenuItem key={p} value={p}>
                  {t(p)}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
      )
  );
}

export default SelectionProgramme;
