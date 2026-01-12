import { ArrowForward, Login } from "@mui/icons-material";
import { Alert, Button, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PROFILE_URL } from "../../../routes/Routes.constants";
import { ChangelogContentProps } from "../changelog.types";
function Changelog_2026_01_11({ onDismiss }: ChangelogContentProps): JSX.Element {
  const { t } = useTranslation("common");
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <>
      <Typography className="section-title" sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
        🎓 Nouvelle page de profil
        {user && (
          <Button
            size="small"
            color="info"
            variant="outlined"
            endIcon={<ArrowForward />}
            onClick={() => {
              onDismiss();
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
        <li>✅ Sélectionnez votre horaire actuel pour chaque session afin de les retrouver facilement</li>
      </ul>

      <Typography className="section-title">
        ⭐ Améliorations
      </Typography>
      <ul>
        <li>🕒 Nouveau filtre de disponibilités pour filtrer les horaires selon vos plages libres</li>
        <li>💾 Vos préférences d'affichage sont maintenant sauvegardées sur votre compte</li>
        <li>✨ Améliorations diverses de l'interface et de l'expérience utilisateur</li>
      </ul>

      {!user && (
        <>
          <Alert severity="info" sx={{ mt: 1 }}>
            {t("fonctionnalitesNecessitentCompte")}
          </Alert>
          <Button
            variant="contained"
            startIcon={<Login />}
            onClick={handleSignIn}
            sx={{ alignSelf: "flex-start" }}
          >
            {t("seConnecter")}
          </Button>
        </>
      )}
    </>
  );
}

export default Changelog_2026_01_11;
