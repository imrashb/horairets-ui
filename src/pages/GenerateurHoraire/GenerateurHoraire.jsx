import { ChevronLeft, ChevronRight, OpenInFull } from '@mui/icons-material';
import { IconButton, Paper, Typography } from '@mui/material';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Combinaisons from './Combinaisons/Combinaisons';
import GenerateurHoraireWrapper from './GenerateurHoraire.styles';
import GenerateurHoraireFilters from './GenerateurHoraireFilters/GenerateurHoraireFilters';
import SelectionCours from './SelectionCours/SelectionCours';
import SelectionSessionProgramme from './SelectionSessionProgramme/SelectionSessionProgramme';
import useSelectionScroll from './useSelectionScroll';

function GenerateurHoraire() {
  const { t } = useTranslation('common');

  const ref = useRef(null);
  const leftRef = useRef(null);

  useSelectionScroll(ref, leftRef);

  const [expanded, setExpanded] = useState(true);

  return (
    <GenerateurHoraireWrapper>
      <Typography className="title" color="primary" fontWeight={600} variant="h2">{t('generateurHoraire').toUpperCase()}</Typography>
      <GenerateurHoraireFilters />
      <div className="main-content-wrapper" ref={ref}>
        <div className={classNames('left', expanded ? 'open' : 'closed')} ref={leftRef}>
          <SelectionSessionProgramme />
          <SelectionCours />
          <Paper component="span" className="expand-btn">
            <IconButton
              color="primary"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Paper>
        </div>
        <div className="right">
          <Combinaisons />
        </div>
      </div>

    </GenerateurHoraireWrapper>
  );
}

export default GenerateurHoraire;
