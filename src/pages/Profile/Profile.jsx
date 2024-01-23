import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import ProfileWrapper from './Profile.styles';
import HomeBackground from '../Home/HomeBackground';
import withAuth from '../../components/Auth/AuthenticatedComponent';
import { HOME_URL } from '../../routes/Routes.constants';
import Avatar from '../../components/Avatar/Avatar';

function Profile() {
  const theme = useTheme();
  const isMediumViewport = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <ProfileWrapper>
      <div className="background">
        <HomeBackground fixed={false} />
        <Avatar size={64} />
      </div>
      <div />
      <div className="profile-content">
        below
      </div>
    </ProfileWrapper>
  );
}

export default withAuth(Profile, HOME_URL);
