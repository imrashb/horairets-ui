import {
  FormControl, InputLabel, MenuItem, Select, Skeleton,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetProgrammesQuery } from '../../../features/generateur/generateur.api';
import useGenerateurHoraire from '../GenerateurHoraireContexts/hooks/useGenerateurHoraire';

function SelectionProgramme() {
  const { t } = useTranslation('common');
  const { programmes, setProgrammes } = useGenerateurHoraire();
  const programmesQuery = useGetProgrammesQuery();

  return (
    programmesQuery.isLoading
      ? <Skeleton variant="rectangular" width="100%" height="3rem" />
      : (
        <FormControl error={programmes === ''} required variant="standard">
          <InputLabel>{t('programme')}</InputLabel>
          <Select
            value={programmes}
            onChange={(e) => setProgrammes(e?.target?.value)}
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
