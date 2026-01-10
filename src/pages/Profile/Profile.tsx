import { Avatar, Typography } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";
import useFirebaseAuth from "../../components/Auth/useFirebaseAuth";
import useUserDocument from "../../hooks/firebase/useUserDocument";
import { UpdateOptions, UserDocument, UserProfile } from "../../hooks/firebase/types";
import EditProfileDialog from "./Dialogs/EditProfileDialog";
import PlannedCoursesEditor from "./Dialogs/PlannedCoursesEditor";
import ProfileWrapper from "./Profile.styles";
import ProfileBanner from "./ProfileBanner";

function Profile(): JSX.Element {
  const { t } = useTranslation("common");
  const auth = useFirebaseAuth();
  const [firebaseUser] = useAuthState(auth);

  const { data: userDoc, updateDocument } = useUserDocument<UserDocument>();

  const handleUpdateProfile = async (updates: UserProfile, options?: UpdateOptions) => {
    await updateDocument({ profile: updates }, options);
  };

  const profile = userDoc?.profile;

  return (
    <ProfileWrapper>
      <div className="profile-banner">
        <ProfileBanner />
        <div className="banner-overlay" />
      </div>

      <div className="profile-header">
        <div className="avatar-container">
          <Avatar
            src={firebaseUser?.photoURL || undefined}
            alt={firebaseUser?.displayName || "User"}
            className="profile-avatar"
          />
        </div>
        <div className="profile-actions">
          <EditProfileDialog
            currentProfile={profile}
            onSave={handleUpdateProfile}
          />
        </div>
      </div>

      <div className="profile-content">
        <div className="user-info">
          <Typography variant="h5" fontWeight="bold">
            {firebaseUser?.displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {profile?.admissionSession || t("sessionAdmission")} • {profile?.programme ? t(profile.programme) : t("aucunProgrammeSelectionne")}
          </Typography>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <PlannedCoursesEditor />
          </div>
        </div>
      </div>
    </ProfileWrapper>
  );
}

export default Profile;
