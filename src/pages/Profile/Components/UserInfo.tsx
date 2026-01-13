import { Typography } from "@mui/material";
import React from "react";
import { UserProfile } from "../../../hooks/firebase/types";
import { UserInfoContainer } from "../Profile.styles";
import { useTranslation } from "react-i18next";
import { useAuthState } from "react-firebase-hooks/auth";
import useFirebaseAuth from "../../../components/Auth/useFirebaseAuth";

interface UserInfoProps {
  profile: UserProfile | undefined;
}

function UserInfo({ profile }: UserInfoProps): JSX.Element {
  const { t } = useTranslation("common");
  const auth = useFirebaseAuth();
  const [user] = useAuthState(auth);

  return (
    <UserInfoContainer>
      <Typography variant="h5" fontWeight="bold">
        {user?.displayName}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {profile?.admissionSession || t("sessionAdmission")} •{" "}
        {profile?.programme ? t(profile.programme) : t("aucunProgrammeSelectionne")}
      </Typography>
    </UserInfoContainer>
  );
}

export default UserInfo;
