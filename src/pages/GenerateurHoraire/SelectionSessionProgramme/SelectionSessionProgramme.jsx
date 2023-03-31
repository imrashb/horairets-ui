import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLazyGetCoursSessionQuery,
} from '../../../features/generateur/generateur.api';
import {
  selectProgramme, selectSession, setProgramme, setSession,
} from '../../../features/generateur/generateur.slice';
import { areArraysSame } from '../../../utils/Array.utils';
import useGenerateurHoraire from '../GenerateurHoraireContexts/hooks/useGenerateurHoraire';
import SelectionProgramme from './SelectionProgramme';
import SelectionSession from './SelectionSession';
import SelectionSessionProgrammeWrapper from './SelectionSessionProgramme.styles';

function SelectionSessionProgramme() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const currentSession = useSelector(selectSession);
  const currentProgramme = useSelector(selectProgramme);

  const { session, programmes } = useGenerateurHoraire();

  const [coursSessionTrigger, coursSessionQuery] = useLazyGetCoursSessionQuery();

  // Resubscribe component to RTK Query Cache
  useEffect(() => {
    if (session && programmes && programmes.length > 0) {
      const areProgrammesSame = areArraysSame(programmes, currentProgramme);
      const isSessionSame = currentSession === session;

      if (!isSessionSame) { dispatch(setSession(session)); }
      if (!areProgrammesSame) { dispatch(setProgramme(programmes)); }

      coursSessionTrigger({ session, programme: programmes });
    }
  }, [session, programmes, currentProgramme, currentSession, coursSessionTrigger, dispatch]);

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
          <SelectionSession />
          <SelectionProgramme />
        </AccordionDetails>
      </Accordion>
    </SelectionSessionProgrammeWrapper>
  );
}

export default SelectionSessionProgramme;
