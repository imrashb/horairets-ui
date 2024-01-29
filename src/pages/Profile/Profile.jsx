import React, { useMemo } from 'react';
import { Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { Edit } from '@mui/icons-material';
import { GraphCanvas } from 'reagraph';
import ProfileWrapper from './Profile.styles';
import HomeBackground from '../Home/HomeBackground';
import withAuth from '../../components/Auth/AuthenticatedComponent';
import { HOME_URL } from '../../routes/Routes.constants';
import Avatar from '../../components/Avatar/Avatar';
import useCurrentUser from '../../hooks/user/useCurrentUser';

function Profile() {
  const theme = useTheme();
  const { user } = useCurrentUser();
  const { t } = useTranslation('common');

  const programmes = useMemo(() => (user?.programmes?.length > 0
    ? user?.programmes.map((p) => t(p))
    : undefined), [t, user?.programmes]);

  const cours = useMemo(() => [
    { sigle: 'LOG100', prealable: [] },
    { sigle: 'LOG121', prealable: ['LOG100'] },
    { sigle: 'MAT350', prealable: [] },
    { sigle: 'MAT472', prealable: ['MAT350', 'LOG121'] },
  ], []);

  const nodes = useMemo(() => cours.map((c) => ({
    id: c.sigle,
    label: c.sigle,
  })), [cours]);

  const edges = useMemo(() => cours.flatMap((c) => c.prealable.map((p) => ({
    id: `${p}->${c.sigle}`,
    source: p,
    target: c.sigle,
    label: `${p}->${c.sigle}`,
  }))), [cours]);

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
          {programmes ? programmes.map((p) => (
            <Typography key={p} className="programmes">{p}</Typography>
          )) : <Typography className="programmes">{t('aucunProgramme')}</Typography>}
          <Button disabled startIcon={<Edit />} className="edit-profile-btn" variant="contained" color="primary">{t('editProfile')}</Button>
        </div>
        <div style={{ position: 'relative', width: '30rem', height: '30rem' }}>
          <GraphCanvas
            nodes={nodes}
            edges={edges}
            layoutType="treeLr2d"

          />
        </div>

      </div>
    </ProfileWrapper>
  );
}

export default withAuth(Profile, HOME_URL);
