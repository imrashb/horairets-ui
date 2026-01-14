import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import withAuth from '../../components/Auth/AuthenticatedComponent';
import useUserDocument from '../../hooks/firebase/useUserDocument';
import { UserDocument } from '../../hooks/firebase/types';
import PlannedCoursesEditor from './PlannedCourses/PlannedCoursesEditor';
import {
  ContentContainer, GridContainer, ProfileCard, ProfileWrapper,
} from './Profile.styles';
import ProfileHeader from './Components/ProfileHeader';

import ProfileTabs from './Components/ProfileTabs';

import { ProfileTab } from './Profile.constants';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 64px);
`;

function Profile(): JSX.Element {
  const { data: userDoc, isLoading } = useUserDocument<UserDocument>();
  const [selectedTab, setSelectedTab] = useState(ProfileTab.CHEMINEMENT);

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            minWidth: 0,
          }}
        >
          <ProfileTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
          <GridContainer>
            <ProfileCard>
              {selectedTab === ProfileTab.CHEMINEMENT && <PlannedCoursesEditor />}
            </ProfileCard>
          </GridContainer>
        </div>
      </ContentContainer>
    </ProfileWrapper>
  );
}

export default withAuth(Profile, '/');
