import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Combinaisons from './Combinaisons/Combinaisons';
import GenerateurHoraireWrapper from './GenerateurHoraire.styles';
import GenerateurHoraireFilters from './GenerateurHoraireFilters/GenerateurHoraireFilters';
import SelectionCours from './SelectionCours/SelectionCours';
import SelectionSessionProgramme from './SelectionSessionProgramme/SelectionSessionProgramme';

function GenerateurHoraire() {
  const { t } = useTranslation('common');

  return (
    <GenerateurHoraireWrapper>
      <Typography className="title" color="primary" fontWeight={600} variant="h2">{t('generateurHoraire').toUpperCase()}</Typography>
      <GenerateurHoraireFilters />
      <div className="main-content-wrapper">
        <div className="left">

          <SelectionSessionProgramme />
          <SelectionCours />

        </div>
        <div className="right">

          <Combinaisons />

        </div>
      </div>
    </GenerateurHoraireWrapper>
  );
}

export default GenerateurHoraire;
