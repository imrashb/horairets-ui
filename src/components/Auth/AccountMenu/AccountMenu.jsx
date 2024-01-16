import { Logout } from '@mui/icons-material';
import {
  ListItemIcon, Menu, MenuItem,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSignOut } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import useFirebaseAuth from '../useFirebaseAuth';

function AccountMenu({ open, onClose, anchor }) {
  const { t } = useTranslation('common');

  const auth = useFirebaseAuth();
  const [signOut] = useSignOut(auth);

  const logout = async () => {
    if (onClose) onClose();
    const signedOut = await signOut();
    if (signedOut) {
      toast.success(t('deconnexionSucces'));
    } else {
      toast.error(t('deconnexionErreur'));
    }
  };

  return (
    <Menu
      anchorEl={anchor}
      open={open}
      onClose={onClose}
      onClick={onClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem color="red" onClick={logout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        {t('seDeconnecter')}
      </MenuItem>
    </Menu>
  );
}

export default AccountMenu;
