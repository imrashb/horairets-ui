import React, { useCallback, useState, useEffect } from 'react';
import { Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import ButtonDialog from '../ButtonDialog/ButtonDialog';
import useCurrentUser from '../../hooks/user/useCurrentUser';
import SelectionProgramme from '../../pages/GenerateurHoraire/SelectionSessionProgramme/SelectionProgramme';

function EditProfileDialog() {
  const { t } = useTranslation('common');
  const { user, updateDisplayName, updateProgrammes } = useCurrentUser();

  const [displayName, setDisplayName] = useState(user?.displayName);
  const [programmes, setProgrammes] = useState(user?.programmes);

  useEffect(() => {
    setDisplayName(user?.displayName);
    setProgrammes(user?.programmes);
  }, [user]);

  const onClose = useCallback(() => {
    if (displayName !== user?.displayName) {
      updateDisplayName(displayName);
    }

    if (programmes !== user?.programmes) {
      updateProgrammes(programmes);
    }
  }, [displayName, user, updateDisplayName, updateProgrammes, programmes]);

  return (
    <ButtonDialog icon={<Edit />} title={t('editProfile')} onClose={onClose}>
      <div style={{ paddingTop: '4px' }}>
        <TextField
          label={t('editDisplayNameLabel')}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>
      <SelectionProgramme ignoreSession programmes={programmes} setProgrammes={setProgrammes} />
    </ButtonDialog>
  );
}

export default EditProfileDialog;
