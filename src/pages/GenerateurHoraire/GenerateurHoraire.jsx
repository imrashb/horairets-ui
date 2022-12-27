import {
  Card, CardActions, CardContent, CardHeader, Divider,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GenerateurHoraireWrapper from './GenerateurHoraire.styles';
import GenerateurHoraireFilters from './GenerateurHoraireFilters/GenerateurHoraireFilters';
import SelectionCours from './SelectionCours/SelectionCours';
import SelectionSessionProgramme from './SelectionSessionProgramme/SelectionSessionProgramme';

function GenerateurHoraire() {
  const { t } = useTranslation('common');

  return (
    <GenerateurHoraireWrapper>
      <div className="title-wrapper">
        <span className="text-shadow">{t('generateurHoraire').toUpperCase()}</span>
        <span className="horairets-animated-text">{t('generateurHoraire').toUpperCase()}</span>
      </div>
      <GenerateurHoraireFilters />
      <div className="main-content-wrapper">
        <div className="left">

          <SelectionSessionProgramme />
          <SelectionCours />

        </div>
        <div className="right">right</div>
      </div>
    </GenerateurHoraireWrapper>
  );
}

export default GenerateurHoraire;
