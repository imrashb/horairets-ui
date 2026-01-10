import { CalendarMonth, School, Warning } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import withAuth from "../../components/Auth/AuthenticatedComponent";
import useFirebaseAuth from "../../components/Auth/useFirebaseAuth";
import { HOME_URL } from "../../routes/Routes.constants";
import ProfileBanner from "./ProfileBanner";
import ProfileWrapper from "./Profile.styles";

function Profile(): JSX.Element {
  const { t } = useTranslation("common");
  const auth = useFirebaseAuth();
  const [user] = useAuthState(auth);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "";
  const email = user?.email || "";
  const photoURL = user?.photoURL || undefined;

  return (
    <ProfileWrapper>
      <div className="profile-banner">
        <ProfileBanner />
        <div className="banner-overlay" />
      </div>

      <div className="profile-header">
        <div className="avatar-container">
          <Avatar
            className="profile-avatar"
            src={photoURL}
            alt={displayName}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>
        </div>

        <div className="user-info">
          <Typography variant="h5" className="display-name">
            {displayName}
          </Typography>
          <Typography variant="body2" className="email">
            {email}
          </Typography>
        </div>
      </div>

      <div className="mobile-edit-notice">
        <Warning sx={{ mr: 1, verticalAlign: "middle" }} />
        {t("editionDesktopUniquement")}
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <Typography variant="h6" className="section-title">
            <School />
            {t("programmeEtudes")}
          </Typography>
          <div className="section-content">
            <Typography color="textSecondary">
              {t("aucunProgrammeSelectionne")}
            </Typography>
          </div>
        </div>

        <div className="profile-section">
          <Typography variant="h6" className="section-title">
            <CalendarMonth />
            {t("coursPlanifies")}
          </Typography>
          <div className="section-content">
            <div className="semester-item">
              <Typography className="semester-name">Été 2026</Typography>
              <Typography className="semester-courses">
                LOG100, LOG210, LOG240
              </Typography>
            </div>
            <div className="semester-item">
              <Typography className="semester-name">Automne 2026</Typography>
              <Typography className="semester-courses">
                CHM131, MAT350
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
}

export default withAuth(Profile, HOME_URL);
