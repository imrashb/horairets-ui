import { AccountCircle, Login } from '@mui/icons-material';
import {
  Button, IconButton, Skeleton, useMediaQuery, useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import AccountMenu from '../../Auth/AccountMenu/AccountMenu';
import useCurrentUser from '../../../hooks/user/useCurrentUser';

function LoginButton() {
  const { t } = useTranslation('common');

  // Auth
  const { user, loading, auth } = useCurrentUser();

  // Menu
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const handleLogin = async (e) => {
    if (user) {
      setAnchor(e?.currentTarget);
      setOpen(true);
    } else {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result) {
        toast.success(t('loginSuccess'));
      }
    }
  };

  const theme = useTheme();
  const isMediumViewport = useMediaQuery(theme.breakpoints.up('md'));

  return (
    loading
      ? <Skeleton variant="rounded" width={isMediumViewport ? '12rem' : '2rem'} height="2rem" />
      : (
        <>
          {isMediumViewport ? (
            <Button ref={anchor} startIcon={user ? <AccountCircle /> : <Login />} variant="contained" onClick={handleLogin}>
              {user ? user?.displayName : t('seConnecter')}
            </Button>
          )
            : (
              <IconButton ref={anchor} onClick={handleLogin}>
                {user ? <AccountCircle /> : <Login />}
              </IconButton>
            )}
          <AccountMenu anchor={anchor} open={open} onClose={() => setOpen(false)} />
        </>
      )
  );
}

export default LoginButton;
