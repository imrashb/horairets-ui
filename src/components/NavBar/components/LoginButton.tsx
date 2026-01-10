import { AccountCircle, Login } from "@mui/icons-material";
import { Button, IconButton, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import AccountMenu from "../../Auth/AccountMenu/AccountMenu";
import useFirebaseAuth from "../../Auth/useFirebaseAuth";

function LoginButton(): JSX.Element {
  const { t } = useTranslation("common");

  const auth = useFirebaseAuth();
  const [user, loading] = useAuthState(auth);

  const [open, setOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleLogin = async (e: React.MouseEvent<HTMLElement>) => {
    if (user) {
      setAnchor(e.currentTarget);
      setOpen(true);
    } else {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result) {
        toast.success(t("loginSuccess"));
      }
    }
  };

  const theme = useTheme();
  const isMediumViewport = useMediaQuery(theme.breakpoints.up("md"));

  return loading ? (
    <Skeleton variant="rounded" width="12rem" height="2rem" />
  ) : (
    <>
      {isMediumViewport ? (
        <Button
          ref={anchor as any}
          startIcon={user ? <AccountCircle /> : <Login />}
          variant="contained"
          onClick={handleLogin}
        >
          {user ? user?.displayName : t("seConnecter")}
        </Button>
      ) : (
        <IconButton ref={anchor as any} onClick={handleLogin}>
          {user ? <AccountCircle /> : <Login />}
        </IconButton>
      )}
      <AccountMenu
        anchor={anchor}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default LoginButton;
