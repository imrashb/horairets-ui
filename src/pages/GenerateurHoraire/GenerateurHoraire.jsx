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
import SelectionParametres from './SelectionParametres/SelectionParametres';
import CombinaisonHoraire from '../../components/CombinaisonHoraire/CombinaisonHoraire';
import useGenerateurHoraire from './GenerateurHoraireContexts/hooks/useGenerateurHoraire';
import { HEURE_DEBUT_COURS, HEURE_FIN_COURS } from '../../components/CombinaisonHoraire/CombinasonHoraire.constants';

function GenerateurHoraire() {
  const { t } = useTranslation('common');

  const [expanded, setExpanded] = useState(true);

  const theme = useTheme();
  const isLargeViewport = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    setExpanded(true);
  }, [isLargeViewport]);

  const context = useGenerateurHoraire();

  const comb = {
    groupes: context.conges.map((conge) => [
      {
        numeroGroupe: '01',
        activites: [
          {
            nom: 'asd',
            modeEnseignement: 'DISTANCE',
            horaire: {
              heureDepart: HEURE_DEBUT_COURS,
              heureFin: HEURE_FIN_COURS,
              jour: conge,
            },
            charges: [],
            locaux: [],
          },
        ],
        cours: {
          sigle: 'Congé',
          programmes: [],
        },
      },
    ]) || [],
    conges: [],
    uniqueId: 'SDIwMjM6R0lBNDAwLTAyL0dUSTMyMC0wMS9HVEk3ODAtMDEvTE9HNzEwLTAx',
  };

  return (
    <GenerateurHoraireWrapper>
      <Typography className="title" color="primary" fontWeight={600} variant="h2">{t('generateurHoraire').toUpperCase()}</Typography>
      <GenerationModifiers />
      <div className="main-content-wrapper">
        <div className={classNames('left', expanded ? 'open' : 'closed')}>
          <SelectionSessionProgramme />
          <SelectionCours />
          <SelectionParametres />
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
          {true && <CombinaisonHoraire combinaison={comb} enableEdit />}
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
