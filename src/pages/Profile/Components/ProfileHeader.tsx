import { Avatar } from "@mui/material";
import { User } from "firebase/auth";
import React from "react";
import { UpdateOptions, UserProfile } from "../../../hooks/firebase/types";
import EditProfileDialog from "../Dialogs/EditProfileDialog";
import ProfileBanner from "../ProfileBanner";
import {
  AvatarContainer,
  BannerOverlay,
  ProfileActions,
  ProfileBannerContainer,
  ProfileHeaderContainer,
} from "../Profile.styles";

interface ProfileHeaderProps {
  user: User | null | undefined;
  profile: UserProfile | undefined;
  onUpdateProfile: (updates: UserProfile, options?: UpdateOptions) => Promise<void>;
}

function ProfileHeader({ user, profile, onUpdateProfile }: ProfileHeaderProps): JSX.Element {
  return (
    <>
      <ProfileBannerContainer>
        <ProfileBanner />
        <BannerOverlay />
      </ProfileBannerContainer>

      <ProfileHeaderContainer>
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
        <ProfileActions>
          <EditProfileDialog currentProfile={profile} onSave={onUpdateProfile} />
        </ProfileActions>
      </ProfileHeaderContainer>
    </>
  );
}

export default ProfileHeader;
