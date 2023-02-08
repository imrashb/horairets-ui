import { useTheme } from '@emotion/react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  IconButton, Paper, Typography, useMediaQuery,
} from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Combinaisons from './Combinaisons/Combinaisons';
import GenerateurHoraireWrapper from './GenerateurHoraire.styles';
import GenerateurHoraireFilters from './GenerateurHoraireFilters/GenerateurHoraireFilters';
import SelectionCours from './SelectionCours/SelectionCours';
import SelectionSessionProgramme from './SelectionSessionProgramme/SelectionSessionProgramme';

function GenerateurHoraire() {
  const { t } = useTranslation('common');

  const [expanded, setExpanded] = useState(true);

  const theme = useTheme();
  const isLargeViewport = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    setExpanded(true);
  }, [isLargeViewport]);

  return (
    <GenerateurHoraireWrapper>
      <Typography className="title" color="primary" fontWeight={600} variant="h2">{t('generateurHoraire').toUpperCase()}</Typography>
      <GenerateurHoraireFilters />
      <div className="main-content-wrapper">
        <div className={classNames('left', expanded ? 'open' : 'closed')}>
          <SelectionSessionProgramme />
          <SelectionCours />
          {isLargeViewport && (
          <Paper component="span" className="expand-btn">
            <IconButton
              color="primary"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Paper>
          )}
        </div>
        <div className="right">
          <Combinaisons />
        </div>
      </div>

    </GenerateurHoraireWrapper>
  );
}

export default GenerateurHoraire;
