import React from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import ProfileWrapper from './Profile.styles';
import HomeBackground from '../Home/HomeBackground';
import withAuth from '../../components/Auth/AuthenticatedComponent';
import { HOME_URL } from '../../routes/Routes.constants';
import Avatar from '../../components/Avatar/Avatar';
import useCurrentUser from '../../hooks/user/useCurrentUser';

function Profile() {
  const theme = useTheme();
  const { user } = useCurrentUser();
  const isMediumViewport = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <ProfileWrapper>
      <div className="background">
        <HomeBackground fixed={false} />

      </div>
      <div />
      <div className="profile-content">
        <div className="profile-header">
          <Avatar size={128} />
          <Typography className="display-name" variant="h4">{user?.displayName}</Typography>
        </div>
        below
      </div>
    </ProfileWrapper>
  );
}

export default withAuth(Profile, HOME_URL);
