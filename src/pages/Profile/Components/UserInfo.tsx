import { Typography } from "@mui/material";
import React from "react";
import { UserProfile } from "../../../hooks/firebase/types";
import { UserInfoContainer } from "../Profile.styles";
import { useTranslation } from "react-i18next";
import { User } from "firebase/auth";

interface UserInfoProps {
  user: User | null | undefined;
  profile: UserProfile | undefined;
}

function UserInfo({ user, profile }: UserInfoProps): JSX.Element {
  const { t } = useTranslation("common");

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
