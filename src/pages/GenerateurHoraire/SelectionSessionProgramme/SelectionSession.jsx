import {
  FormControl, InputLabel, MenuItem, Select, Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useGetSessionsQuery } from '../../../features/generateur/generateur.api';
import { selectSession } from '../../../features/generateur/generateur.slice';

const getSessionTranslation = (value, t) => {
  const params = { annee: value?.substring(1, value?.length) };
  switch (value?.charAt(0).toLowerCase()) {
    case 'a':
      return t('sessionAutomne', params);
    case 'e':
      return t('sessionEte', params);
    case 'h':
      return t('sessionHiver', params);
    default:
      return undefined;
  }
};

function SelectionSession({ onChange }) {
  const { t } = useTranslation('common');
  const session = useSelector(selectSession);
  const [controlledSession, setControlledSession] = useState(session);
  const sessionsQuery = useGetSessionsQuery();

  useEffect(() => {
    if (sessionsQuery?.data) {
      setControlledSession(sessionsQuery?.data?.at(-1));
    }
  }, [sessionsQuery?.data]);

  const onSessionChange = (event) => {
    const s = event?.target?.value;
    setControlledSession(s);
  };

  useEffect(() => {
    if (onChange) onChange(controlledSession);
  }, [controlledSession]);

  return (
    sessionsQuery.isLoading
      ? <Skeleton variant="rectangular" width="100%" height="3rem" />
      : (
        <FormControl required variant="standard">
          <InputLabel>{t('session')}</InputLabel>
          <Select
            value={controlledSession}
            onChange={onSessionChange}
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
