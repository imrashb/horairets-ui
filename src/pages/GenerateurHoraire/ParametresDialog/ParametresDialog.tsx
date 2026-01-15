import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NombreCoursSelector from '../../../components/Selectors/NombreCoursSelector';
import useGenerateurHoraire from '../GenerateurHoraireContexts/hooks/useGenerateurHoraire';
import ParametresDialogWrapper from './ParametresDialog.styles';

interface ParametresDialogProps {
  open: boolean;
  onClose: () => void;
}

function ParametresDialog({ open, onClose }: ParametresDialogProps): JSX.Element {
  const { t } = useTranslation('common');

  const {
    nombreCours, setNombreCours,
  } = useGenerateurHoraire();

  const [controlledNombreCours, setControlledNombreCours] = useState<number | null>(
    nombreCours ?? null,
  );

  useEffect(() => {
    if (open) {
      setControlledNombreCours(nombreCours ?? null);
    }
  }, [open, nombreCours]);

  const applyParameters = () => {
    setNombreCours(controlledNombreCours);
    if (onClose) onClose();
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>{t('parametresHoraire')}</DialogTitle>
      <DialogContent>
        <ParametresDialogWrapper>
          <NombreCoursSelector value={controlledNombreCours} onChange={setControlledNombreCours} />
        </ParametresDialogWrapper>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          {t('annuler')}
        </Button>
        <Button variant="contained" onClick={applyParameters}>
          {t('appliquerParametres')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ParametresDialog;
