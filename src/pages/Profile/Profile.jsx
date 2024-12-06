import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Edit } from '@mui/icons-material';
import ProfileWrapper from './Profile.styles';
import HomeBackground from '../Home/HomeBackground';
import withAuth from '../../components/Auth/AuthenticatedComponent';
import { HOME_URL } from '../../routes/Routes.constants';
import Avatar from '../../components/Avatar/Avatar';
import useCurrentUser from '../../hooks/user/useCurrentUser';
import EditProfileDialog from '../../components/EditProfileDialog/EditProfileDialog';

function Profile() {
  const { user } = useCurrentUser();
  const { t } = useTranslation('common');

  return (
    <ProfileWrapper>
      <div className="background">
        <HomeBackground fixed={false} />
      </div>
      <div />
      <div className="profile-content">
        <div className="profile-header">
          <Avatar size={128} />
          <Typography variant="h4">{user?.displayName}</Typography>
          {user?.programmes?.map((programme) => (
            <Typography key={programme} variant="h6">
              {t(programme)}
            </Typography>
          ))}
          <EditProfileDialog />
        </div>
      </div>
    </ProfileWrapper>
  );
}

export default withAuth(Profile, HOME_URL);
