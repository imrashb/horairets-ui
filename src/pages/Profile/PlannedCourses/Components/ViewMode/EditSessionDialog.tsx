import { Edit } from '@mui/icons-material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonDialog from '../../../../../components/ButtonDialog/ButtonDialog';
import SessionCard from '../SessionCard';

import { usePlannedCourses } from '../../PlannedCoursesContext';

interface EditSessionDialogProps {
  session: string;
}

export default function EditSessionDialog({ session }: EditSessionDialogProps): JSX.Element {
  const { t } = useTranslation('common');
  const { onSave, onCancel } = usePlannedCourses();

  return (
    <ButtonDialog
      icon={<Edit sx={{ fontSize: 18 }} />}
      title={t('modifierSession')}
      maxWidth="sm"
      isIconButton
      tooltip={t('modifier') as string}
      onClose={onSave}
      onCancel={onCancel}
    >
      <SessionCard session={session} hideDeleteButton />
    </ButtonDialog>
  );
}
