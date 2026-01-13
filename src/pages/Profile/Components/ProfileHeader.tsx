import { Avatar } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useFirebaseAuth from "../../../components/Auth/useFirebaseAuth";
import { UserProfile } from "../../../hooks/firebase/types";
import EditProfileDialog from "../Dialogs/EditProfileDialog";
import ProfileBanner from "../ProfileBanner";
import {
  AvatarContainer,
  BannerOverlay,
  ProfileActions,
  ProfileBannerContainer,
  ProfileHeaderContainer,
} from "../Profile.styles";
import UserInfo from "./UserInfo";

interface ProfileHeaderProps {
  profile: UserProfile | undefined;
}

function ProfileHeader({ profile }: ProfileHeaderProps): JSX.Element {
  const auth = useFirebaseAuth();
  const [user] = useAuthState(auth);

  return (
    <>
      <ProfileBannerContainer>
        <ProfileBanner />
        <BannerOverlay />
      </ProfileBannerContainer>

      <ProfileHeaderContainer>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
          <AvatarContainer>
            <Avatar
              src={user?.photoURL || undefined}
              alt={user?.displayName || "User"}
              sx={{
                width: 130,
                height: 130,
                border: (theme) => `4px solid ${theme.palette.background.default}`,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                "@media (max-width: 600px)": {
                  width: 90,
                  height: 90,
                  borderWidth: 3,
                },
              }}
            />
          </AvatarContainer>
          <div style={{ marginBottom: '8px' }}>
            <UserInfo profile={profile} />
          </div>
        </div>
        <ProfileActions>
          <EditProfileDialog currentProfile={profile} />
        </ProfileActions>
      </ProfileHeaderContainer>
    </>
  );
}

export default ProfileHeader;
