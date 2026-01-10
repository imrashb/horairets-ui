import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";
import withAuth from "../../components/Auth/AuthenticatedComponent";
import useUserDocument from "../../hooks/firebase/useUserDocument";
import { UserDocument } from "../../hooks/firebase/types";
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
  const { data: userDoc, isLoading } = useUserDocument<UserDocument>();

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
      <ProfileHeader profile={profile} />

      <ContentContainer>
        <UserInfo profile={profile} />

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
