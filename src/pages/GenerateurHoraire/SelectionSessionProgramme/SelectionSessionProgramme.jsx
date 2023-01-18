import { Sync } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl, FormHelperText, InputLabel, MenuItem, Select, Skeleton,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProgrammesQuery, useGetSessionsQuery, useLazyGetCoursSessionQuery,
} from '../../../features/generateur/generateur.api';
import {
  selectProgramme, selectSession, setProgramme, setSession,
} from '../../../features/generateur/generateur.slice';
import SelectionSessionProgrammeWrapper from './SelectionSessionProgramme.styles';

function SelectionSessionProgramme() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const programme = useSelector(selectProgramme);
  const session = useSelector(selectSession);

  const [controlledSession, setControlledSession] = useState('');
  const sessionsQuery = useGetSessionsQuery();

  useEffect(() => {
    if (sessionsQuery?.data) {
      setControlledSession(sessionsQuery?.data?.at(-1));
    }
  }, [sessionsQuery?.data]);

  const [controlledProgramme, setControlledProgramme] = useState('');
  const programmesQuery = useGetProgrammesQuery();

  const [coursSessionTrigger] = useLazyGetCoursSessionQuery();

  const handleSelection = () => {
    dispatch(setSession(controlledSession));
    dispatch(setProgramme(controlledProgramme));
    coursSessionTrigger({ session: controlledSession, programme: controlledProgramme });
  };

  const isSelectionSame = (programme === controlledProgramme && session === controlledSession);

  return (
    <SelectionSessionProgrammeWrapper>
      <Card variant="elevation" className="choix-session">
        <CardHeader title={t('sessionProgramme')} />
        <Divider />
        <CardContent className="selection-wrapper">

          {sessionsQuery.isLoading
            ? <Skeleton variant="rectangular" width="100%" height="3rem" />
            : (
              <FormControl variant="standard">
                <InputLabel>{t('session')}</InputLabel>
                <Select
                  value={controlledSession}
                  onChange={(e) => setControlledSession(e?.target?.value)}
                  label={t('session')}
                >
                  {sessionsQuery?.data?.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
                {session && (
                <FormHelperText>
                  {t('selectionActuelle')}
                  {session}
                </FormHelperText>
                )}
              </FormControl>
            )}
          {programmesQuery.isLoading
            ? <Skeleton variant="rectangular" width="100%" height="3rem" />
            : (
              <FormControl variant="standard">
                <InputLabel>{t('programme')}</InputLabel>
                <Select
                  value={controlledProgramme}
                  onChange={(e) => setControlledProgramme(e?.target?.value)}
                  label={t('programme')}
                >
                  {programmesQuery?.data?.map((p) => <MenuItem key={p} value={p}>{t(p)}</MenuItem>)}
                </Select>
                {programme && (
                <FormHelperText>
                  {t('selectionActuelle')}
                  {t(programme)}
                </FormHelperText>
                )}
              </FormControl>
            )}
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            variant="text"
            onClick={handleSelection}
            disabled={!controlledProgramme || !controlledSession
            || isSelectionSame}
          >
            {t('synchroniserCours')}
            <Sync />
          </Button>
        </CardActions>
      </Card>
    </SelectionSessionProgrammeWrapper>
  );
}

export default SelectionSessionProgramme;
