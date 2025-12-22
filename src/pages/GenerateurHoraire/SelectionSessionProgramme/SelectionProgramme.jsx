import {
  FormControl, InputLabel, MenuItem, Select, Skeleton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGetProgrammes } from '../../../features/generateur/generateurQueries';
import useGenerateurHoraire from '../GenerateurHoraireContexts/hooks/useGenerateurHoraire';

function SelectionProgramme() {
  const { t } = useTranslation('common');
  const { programmes, setProgrammes } = useGenerateurHoraire();
  const programmesQuery = useGetProgrammes();

  useEffect(() => {
    if (programmesQuery.data && programmes.length > 0) {
      const invalid = programmes.filter((p) => !programmesQuery.data.includes(p));
      if (invalid.length > 0) {
        setProgrammes(programmes.filter((p) => !invalid.includes(p)));
        toast.info(t('alerteProgrammeInvalideSession'), { autoClose: 10000 });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programmesQuery.data]);

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
