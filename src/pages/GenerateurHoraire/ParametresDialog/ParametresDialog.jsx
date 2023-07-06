/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Settings } from '@mui/icons-material';
import { selectConges, selectNombreCours } from '../../../features/generateur/generateur.slice';
import { JOURS, NOMBRE_MAX_COURS_PAR_HORAIRE } from '../generateurHoraire.constants';
import useGenerateurHoraire from '../GenerateurHoraireContexts/hooks/useGenerateurHoraire';
import ParametresDialogWrapper from './ParametresDialog.styles';
import ButtonDialog from '../../../components/ButtonDialog/ButtonDialog';
import { areArraysSame } from '../../../utils/Array.utils';

function ParametresDialog() {
  const { t } = useTranslation('common');

  const nombreCours = useSelector(selectNombreCours);
  const conges = useSelector(selectConges);

  const [controlledNombreCours, setControlledNombreCours] = useState(nombreCours || 5);
  const [controlledConges, setControlledConges] = useState(conges || []);

  const { setNombreCours, setConges, ...context } = useGenerateurHoraire();

  useEffect(() => {
    if (context.nombreCours !== controlledNombreCours) {
      setControlledNombreCours(context.nombreCour);
    }

    if (!areArraysSame(context.conges, controlledConges)) {
      console.log('setting controlled', context.conges);
      setControlledConges(context.conges);
    }
  }, [context.nombreCours, context.conges]);

  const applyParameters = () => {
    setNombreCours(controlledNombreCours);
    setConges(controlledConges);
  };

  return (
    <ButtonDialog icon={<Settings />} title={t('parametres')} onClose={applyParameters} variant="outlined">
      <ParametresDialogWrapper>
        <FormControl fullWidth variant="standard">
          <InputLabel>{t('nombreCoursParHoraire')}</InputLabel>
          <Select
            value={controlledNombreCours}
            onChange={(event) => setControlledNombreCours(event?.target?.value)}
            label={t('nombreCoursParHoraire')}
          >
            {[...Array(NOMBRE_MAX_COURS_PAR_HORAIRE).keys()].map(
              (value) => (
                <MenuItem key={value + 1} value={value + 1}>
                  {`${value + 1} ${t('cours').toLowerCase()}`}
                </MenuItem>
              ),
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth variant="standard">
          <InputLabel>{t('joursConges')}</InputLabel>
          <Select
            multiple
            value={controlledConges}
            onChange={(event) => {
              setControlledConges(event?.target?.value);
            }}
          >
            {JOURS.map((conge) => (
              <MenuItem
                key={conge}
                value={conge}
              >
                {t(conge)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ParametresDialogWrapper>
    </ButtonDialog>
  );
}

export default ParametresDialog;
