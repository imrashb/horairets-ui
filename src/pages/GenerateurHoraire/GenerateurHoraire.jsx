import { useTheme } from '@emotion/react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  IconButton, Paper, Typography, useMediaQuery,
} from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StyledToastContainer from '../../components/Toasts/StyledToastContainer';
import Combinaisons from './Combinaisons/Combinaisons';
import GenerateurHoraireWrapper from './GenerateurHoraire.styles';
import GenerateurHoraireProvider from './GenerateurHoraireContexts/GenerateurHoraireProvider';
import GenerationModifiers from './GenerationModifiers/GenerationModifiers';
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
      <GenerationModifiers />
      <div className="main-content-wrapper">
        <GenerateurHoraireProvider>
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
        </GenerateurHoraireProvider>
        <div className="right">
          <Combinaisons />
        </div>
      </div>
      <StyledToastContainer
        position="bottom-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </GenerateurHoraireWrapper>
  );
}

export default GenerateurHoraire;
