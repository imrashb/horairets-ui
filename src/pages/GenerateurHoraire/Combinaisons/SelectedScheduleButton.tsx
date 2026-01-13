import { CheckCircle, CheckCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import withAuth from '../../../components/Auth/AuthenticatedComponent';
import { Combinaison } from '../../../features/generateur/generateur.types';
import { useSelectedSchedule } from '../../../hooks/firebase';
import { getSessionFromCombinaisonUniqueId } from '../../../utils/Sessions.utils';

interface SelectedScheduleButtonProps {
  combinaison?: Combinaison;
}

function SelectedScheduleButton({ combinaison }: SelectedScheduleButtonProps): JSX.Element {
  const { t } = useTranslation('common');
  const { isSelected, toggleSelectedSchedule } = useSelectedSchedule();

  const combinaisonId = combinaison?.uniqueId;
  const session = getSessionFromCombinaisonUniqueId(combinaisonId ?? '') ?? '';

  const selected = combinaisonId ? isSelected(session, combinaisonId) : false;

  const handleToggle = async (): Promise<void> => {
    if (!combinaisonId || !session) return;
    await toggleSelectedSchedule(session, combinaisonId);
  };

  const tooltipText = selected ? t('deselectionnerHoraire') : t('selectionnerHoraire');

  return (
    <Tooltip title={tooltipText}>
      <IconButton color={selected ? 'success' : undefined} onClick={handleToggle}>
        {selected ? <CheckCircle /> : <CheckCircleOutline />}
      </IconButton>
    </Tooltip>
  );
}

export default withAuth(SelectedScheduleButton);
