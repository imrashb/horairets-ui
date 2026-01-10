import { CircularProgress } from "@mui/material";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import withAuth from "../../components/Auth/AuthenticatedComponent";
import useFirebaseAuth from "../../components/Auth/useFirebaseAuth";
import useUserDocument from "../../hooks/firebase/useUserDocument";
import { UpdateOptions, UserDocument, UserProfile } from "../../hooks/firebase/types";
import PlannedCoursesEditor from "./Dialogs/PlannedCoursesEditor";
import {
  ContentContainer,
  GridContainer,
  ProfileCard,
  ProfileWrapper,
} from "./Profile.styles";
import ProfileHeader from "./Components/ProfileHeader";
import UserInfo from "./Components/UserInfo";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
`;

function Profile(): JSX.Element {
  const auth = useFirebaseAuth();
  const [firebaseUser] = useAuthState(auth);

  const { data: userDoc, updateDocument, isLoading } = useUserDocument<UserDocument>();

  const handleUpdateProfile = async (updates: UserProfile, options?: UpdateOptions) => {
    await updateDocument({ profile: updates }, options);
  };

  const profile = userDoc?.profile;

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <ProfileWrapper>
      <ProfileHeader 
        user={firebaseUser} 
        profile={profile} 
        onUpdateProfile={handleUpdateProfile} 
      />

      <ContentContainer>
        <UserInfo user={firebaseUser} profile={profile} />

        <GridContainer>
          <ProfileCard>
            <PlannedCoursesEditor />
          </ProfileCard>
        </GridContainer>
      </ContentContainer>
    </ProfileWrapper>
  );
}

export default withAuth(Profile, "/");
