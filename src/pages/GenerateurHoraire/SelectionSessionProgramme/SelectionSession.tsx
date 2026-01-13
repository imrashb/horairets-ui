import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
} from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetSessions } from '../../../features/generateur/generateurQueries';
import { getSessionTranslation } from '../../../utils/Sessions.utils';
import useGenerateurHoraire from '../GenerateurHoraireContexts/hooks/useGenerateurHoraire';

function SelectionSession(): JSX.Element {
  const { t } = useTranslation('common');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { session, setSession } = useGenerateurHoraire() as any;
  const sessionsQuery = useGetSessions();

  useEffect(() => {
    if (sessionsQuery?.data && !session) {
      setSession(sessionsQuery?.data?.at(-1));
    }
  }, [sessionsQuery?.data, session, setSession]);

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    setSession(e.target.value as string);
  };

  return sessionsQuery.isLoading ? (
    <Skeleton variant="rectangular" width="100%" height="3rem" />
  ) : (
    <FormControl required variant="standard">
      <InputLabel shrink={!!session}>{t('session')}</InputLabel>
      <Select value={session || ''} onChange={handleChange} label={t('session')}>
        {sessionsQuery?.data?.map((s: string) => (
          <MenuItem key={s} value={s}>
            {getSessionTranslation(s, t)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectionSession;
