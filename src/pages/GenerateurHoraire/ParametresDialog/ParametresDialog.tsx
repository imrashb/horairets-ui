import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CongesSelector from '../../../components/Selectors/CongesSelector';
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
    nombreCours, conges, setNombreCours, setConges,
  } = useGenerateurHoraire();

  const [controlledNombreCours, setControlledNombreCours] = useState<number | null>(
    nombreCours ?? null,
  );
  const [controlledConges, setControlledConges] = useState<string[]>(conges || []);

  useEffect(() => {
    if (open) {
      setControlledNombreCours(nombreCours ?? null);
      setControlledConges(conges || []);
    }
  }, [open, nombreCours, conges]);

  const applyParameters = () => {
    setNombreCours(controlledNombreCours);
    setConges(controlledConges);
    if (onClose) onClose();
  };

  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>{t('parametresHoraire')}</DialogTitle>
      <DialogContent>
        <ParametresDialogWrapper>
          <NombreCoursSelector value={controlledNombreCours} onChange={setControlledNombreCours} />
          <CongesSelector value={controlledConges} onChange={setControlledConges} />
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
