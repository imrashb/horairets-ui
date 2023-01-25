/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { JOURS, NOMBRE_MAX_COURS_PAR_HORAIRE } from '../generateurHoraire.constants';
import ParametresDialogWrapper from './ParametresDialog.styles';

function ParametresDialog({ open, onClose }) {
  const { t } = useTranslation('common');

  const [nombreCours, setNombreCours] = useState(5);
  const [conges, setConges] = useState([]);

  const applyParameters = () => {
    onClose({ nombreCours, conges });
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>{t('parametresHoraire')}</DialogTitle>
      <DialogContent>
        <ParametresDialogWrapper>
          <FormControl fullWidth variant="standard">
            <InputLabel>{t('nombreCoursParHoraire')}</InputLabel>
            <Select
              value={nombreCours}
              onChange={(event) => setNombreCours(event?.target?.value)}
              label={t('nombreCoursParHoraire')}
            >
              {[...Array(NOMBRE_MAX_COURS_PAR_HORAIRE).keys()].map(
                (value) => (
                  <MenuItem value={value + 1}>
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
              value={conges}
              onChange={(event) => {
                setConges(event?.target?.value);
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
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>{t('annuler')}</Button>
        <Button variant="contained" onClick={applyParameters}>{t('appliquerParametres')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParametresDialog;
