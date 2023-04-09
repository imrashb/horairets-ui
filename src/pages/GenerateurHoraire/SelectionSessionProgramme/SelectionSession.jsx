import {
  FormControl, InputLabel, MenuItem, Select, Skeleton,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetSessionsQuery } from '../../../features/generateur/generateur.api';
import useGenerateurHoraire from '../GenerateurHoraireContexts/hooks/useGenerateurHoraire';
import { getSessionTranslation } from '../../../utils/Sessions.utils';

function SelectionSession() {
  const { t } = useTranslation('common');
  const { session, setSession } = useGenerateurHoraire();
  const sessionsQuery = useGetSessionsQuery();

  useEffect(() => {
    if (sessionsQuery?.data) {
      setSession(sessionsQuery?.data?.at(-1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionsQuery?.data]);

  return (
    sessionsQuery.isLoading
      ? <Skeleton variant="rectangular" width="100%" height="3rem" />
      : (
        <FormControl required variant="standard">
          <InputLabel>{t('session')}</InputLabel>
          <Select
            value={session}
            onChange={(e) => setSession(e?.target?.value)}
            label={t('session')}
          >
            {sessionsQuery?.data?.map((s) => (
              <MenuItem key={s} value={s}>
                {getSessionTranslation(s, t)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ));
}

export default SelectionSession;
