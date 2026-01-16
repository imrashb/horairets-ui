import { Settings } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonDialog from '../../../../components/ButtonDialog/ButtonDialog';
import DisponibilitesFilter from '../../../GenerateurHoraire/GenerationModifiers/filters/DisponibilitesFilter';
import NombreCoursSelector from '../../../../components/Selectors/NombreCoursSelector';
import { SessionConfig } from '../../../../hooks/firebase/types';
import { getDefaultDisponibilites } from '../../../../utils/Disponibilites.utils';
import { DisponibiliteMap } from '../../../GenerateurHoraire/generateurHoraire.constants';

interface EditSessionConfigDialogProps {
  config: SessionConfig;
  onSave: (config: SessionConfig) => void;
}

export default function EditSessionConfigDialog({
  config,
  onSave,
}: EditSessionConfigDialogProps): JSX.Element {
  const { t } = useTranslation('common');
  const [nombreCours, setNombreCours] = useState<number | null>(config.nombreCours);
  const [disponibilites, setDisponibilites] = useState<DisponibiliteMap>(
    config.disponibilites || getDefaultDisponibilites(),
  );

  useEffect(() => {
    setNombreCours(config.nombreCours);
    setDisponibilites(config.disponibilites || getDefaultDisponibilites());
  }, [config]);

  const handleSave = () => {
    onSave({
      ...config,
      nombreCours,
      disponibilites,
    });
  };

  return (
    <ButtonDialog
      title={t('parametresHoraire')}
      icon={<Settings sx={{ fontSize: 18 }} />}
      isIconButton
      onClose={handleSave}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <NombreCoursSelector value={nombreCours} onChange={setNombreCours} />
        <DisponibilitesFilter value={disponibilites} onChange={setDisponibilites} />
      </div>
    </ButtonDialog>
  );
}
