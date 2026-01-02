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
import { useAtom } from 'jotai';
import { useGetCoursSession } from '../../../features/generateur/generateurQueries';
import {
  programmesAtom, sessionAtom,
} from '../../../features/generateur/generateurAtoms';
import { areArraysSame } from '../../../utils/Array.utils';
import useGenerateurHoraire from '../GenerateurHoraireContexts/hooks/useGenerateurHoraire';
import SelectionProgramme from './SelectionProgramme';
import SelectionSession from './SelectionSession';
import SelectionSessionProgrammeWrapper from './SelectionSessionProgramme.styles';

function SelectionSessionProgramme() {
  const { t } = useTranslation('common');

  const [currentSession, setCurrentSession] = useAtom(sessionAtom);
  const [currentProgramme, setCurrentProgramme] = useAtom(programmesAtom);

  const { session, programmes } = useGenerateurHoraire();

  const coursSessionQuery = useGetCoursSession(session, programmes);

  useEffect(() => {
    if (session && programmes && programmes.length > 0) {
      const areProgrammesSame = areArraysSame(programmes, currentProgramme);
      const isSessionSame = currentSession === session;

      if (!isSessionSame) { setCurrentSession(session); }
      if (!areProgrammesSame) { setCurrentProgramme(programmes); }
    }
  }, [session, programmes, currentProgramme, currentSession]);

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
