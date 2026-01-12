import { ArrowForward, Close, Login, NewReleases } from "@mui/icons-material";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PROFILE_URL } from "../../routes/Routes.constants";

const CHANGELOG_VERSION = "2026-01-11";
const CHANGELOG_STORAGE_KEY = "horairets_changelog_dismissed";

const ChangelogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ul {
    margin: 0;
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
    }
  }

  .section-title {
    font-weight: 600;
    margin-top: 8px;
  }
`;

function ChangelogDialog(): JSX.Element {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (isDev) {
      setOpen(true);
      return;
    }
    const dismissedVersion = localStorage.getItem(CHANGELOG_STORAGE_KEY);
    if (dismissedVersion !== CHANGELOG_VERSION) {
      setOpen(true);
    }
  }, [isDev]);

  const handleDismiss = () => {
    localStorage.setItem(CHANGELOG_STORAGE_KEY, CHANGELOG_VERSION);
    setOpen(false);
  };

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    handleDismiss();
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <NewReleases color="primary" />
          {t("nouveautes")}
        </span>
        <IconButton onClick={handleDismiss}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ChangelogContent>
          <Typography className="section-title" sx={{ display: "flex", alignItems: "center", gap:1, flexWrap: "wrap" }}>
            🎓 Nouvelle page de profil
            {user && (
              <Button
                size="small"
                color="info"
                variant="outlined"
                endIcon={<ArrowForward />}
                onClick={() => {
                  handleDismiss();
                  navigate(PROFILE_URL);
                }}
              >
                {t("voirMonProfil")}
              </Button>
            )}
          </Typography>
          <ul>
            <li>📅 Planifiez vos cours pour chaque session de votre cheminement</li>
            <li>🚀 Exportez votre planification vers le générateur d'horaires en un clic</li>
            <li>✅ Sélectionnez votre horaire actuel pour le retrouver facilement</li>
          </ul>

          <Typography className="section-title">
            ⭐ Améliorations
          </Typography>
          <ul>
            <li>💾 Vos préférences d'affichage sont maintenant sauvegardées sur votre compte</li>
            <li>💡 Nouveaux tooltips sur tous les boutons d'actions</li>
            <li>🕒 Nouveau filtre de disponibilités pour filtrer les horaires selon vos plages libres</li>
          </ul>

          {!user && (
            <Alert severity="info" sx={{ mt: 1 }}>
              {t("fonctionnalitesNecessitentCompte")}
            </Alert>
          )}
        </ChangelogContent>
      </DialogContent>
      <DialogActions sx={{ gap: 1 }}>
        {user ? (
          <Button variant="contained" onClick={handleDismiss}>
            {t("compris")}
          </Button>
        ) : (
          <>
            <Button variant="outlined" onClick={handleDismiss}>
              {t("continuerSansCompte")}
            </Button>
            <Button variant="contained" startIcon={<Login />} onClick={handleSignIn}>
              {t("seConnecter")}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default ChangelogDialog;

