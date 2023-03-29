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
import SelectionProgramme from './SelectionProgramme';
import SelectionSession from './SelectionSession';
import SelectionSessionProgrammeWrapper from './SelectionSessionProgramme.styles';

function SelectionSessionProgramme() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  const programme = useSelector(selectProgramme);

  const [controlledSession, setControlledSession] = useState(session);
  const [controlledProgramme, setControlledProgramme] = useState(programme);

  const [coursSessionTrigger, coursSessionQuery] = useLazyGetCoursSessionQuery();

  // Resubscribe component to RTK Query Cache
  useEffect(() => {
    if (controlledSession && controlledProgramme && controlledProgramme.length > 0) {
      const areProgrammesSame = areArraysSame(controlledProgramme, programme);
      const isSessionSame = session === controlledSession;

      if (!isSessionSame) { dispatch(setSession(controlledSession)); }
      if (!areProgrammesSame) { dispatch(setProgramme(controlledProgramme)); }

      coursSessionTrigger({ session: controlledSession, programme: controlledProgramme });
    }
  }, [controlledSession, controlledProgramme, programme, session, coursSessionTrigger, dispatch]);

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
          <SelectionSession onChange={(s) => setControlledSession(s)} />
          <SelectionProgramme onChange={(p) => setControlledProgramme(p)} />
        </AccordionDetails>
      </Accordion>
    </SelectionSessionProgrammeWrapper>
  );
}

export default SelectionSessionProgramme;
