import { Check, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Divider,
  FormControl, InputLabel, MenuItem, Select, Skeleton, Typography,
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

  const [controlledSession, setControlledSession] = useState(session);
  const sessionsQuery = useGetSessionsQuery();

  useEffect(() => {
    if (sessionsQuery?.data) {
      setControlledSession(sessionsQuery?.data?.at(-1));
    }
  }, [sessionsQuery?.data]);

  const [controlledProgramme, setControlledProgramme] = useState(programme);
  const programmesQuery = useGetProgrammesQuery();

  const [coursSessionTrigger, coursSessionQuery] = useLazyGetCoursSessionQuery();

  const handleSelection = () => {
    dispatch(setSession(controlledSession));
    dispatch(setProgramme(controlledProgramme));
    coursSessionTrigger({ session: controlledSession, programme: controlledProgramme });
  };

  const isSelectionSame = (programme === controlledProgramme && session === controlledSession);

  const [expanded, setExpanded] = useState(true);

  return (
    <SelectionSessionProgrammeWrapper>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} className="choix-session">
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography variant="h5">{t('sessionProgramme')}</Typography>
          {coursSessionQuery?.isFetching && <CircularProgress size="2rem" thickness="8" />}
        </AccordionSummary>
        <Divider />
        <AccordionDetails className="selection-wrapper">
          {sessionsQuery.isLoading
            ? <Skeleton variant="rectangular" width="100%" height="3rem" />
            : (
              <FormControl required variant="standard">
                <InputLabel>{t('session')}</InputLabel>
                <Select
                  value={controlledSession}
                  onChange={(e) => setControlledSession(e?.target?.value)}
                  label={t('session')}
                >
                  {sessionsQuery?.data?.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                      {' '}
                      {s === session && <Check />}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          {programmesQuery.isLoading
            ? <Skeleton variant="rectangular" width="100%" height="3rem" />
            : (
              <FormControl error={controlledProgramme === ''} required variant="standard">
                <InputLabel>{t('programme')}</InputLabel>
                <Select
                  value={controlledProgramme}
                  onChange={(e) => setControlledProgramme(e?.target?.value)}
                  label={t('programme')}
                >
                  {programmesQuery?.data?.map(
                    (p) => (
                      <MenuItem key={p} value={p}>
                        {t(p)}
                        {' '}
                        {p === programme && <Check />}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>
            )}
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button
            variant="contained"
            onClick={handleSelection}
            disabled={!controlledProgramme || !controlledSession
            || isSelectionSame}
          >
            {t('synchroniserCours')}
          </Button>
        </AccordionActions>
      </Accordion>
    </SelectionSessionProgrammeWrapper>
  );
}

export default SelectionSessionProgramme;
