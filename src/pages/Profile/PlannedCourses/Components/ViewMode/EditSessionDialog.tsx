import { Edit } from '@mui/icons-material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonDialog from '../../../../../components/ButtonDialog/ButtonDialog';
import SessionCard from '../SessionCard';

interface EditSessionDialogProps {
  session: string;
}

export default function EditSessionDialog({ session }: EditSessionDialogProps): JSX.Element {
  const { t } = useTranslation('common');

  return (
    <ButtonDialog
      icon={<Edit sx={{ fontSize: 18 }} />}
      title={t('modifierSession')}
      viewOnly
      maxWidth="sm"
      isIconButton
      tooltip={t('modifier') as string}
    >
      <SessionCard session={session} />
    </ButtonDialog>
  );
}
