import { AccountCircle, Login } from '@mui/icons-material';
import {
  Button, Skeleton,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import useFirebaseAuth from '../../Auth/useFirebaseAuth';
import AccountMenu from '../../Auth/AccountMenu/AccountMenu';

function LoginButton() {
  const { t } = useTranslation('common');

  // Auth
  const auth = useFirebaseAuth();
  const [user, loading] = useAuthState(auth);

  // Menu
  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const handleLogin = (e) => {
    if (user) {
      setAnchor(e?.currentTarget);
      setOpen(true);
    } else {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    }
  };

  return (
    loading
      ? <Skeleton variant="rounded" width="12rem" height="2rem" />
      : (
        <>
          <Button ref={anchor} startIcon={user ? <AccountCircle /> : <Login />} variant="contained" onClick={handleLogin}>
            {user ? user?.displayName : t('seConnecter')}
          </Button>
          <AccountMenu anchor={anchor} open={open} onClose={() => setOpen(false)} />
        </>
      )
  );
}

export default LoginButton;
