import React from 'react';
import { Avatar as MUIAvatar, Skeleton } from '@mui/material';
import { useTheme } from 'styled-components';
import useCurrentUser from '../../hooks/user/useCurrentUser';

const stringAvatar = (name) => {
  const splitted = name?.split(' ');

  let initials;
  if (splitted?.length === 1) initials = splitted[0][0];
  else if (splitted?.length > 1) initials = splitted[0][0] + splitted[1][0];
  else initials = '';
  return initials.toUpperCase();
};

const DEFAULT_SIZE = 24;

function Avatar({ size }) {
  const { user, loading } = useCurrentUser();

  const theme = useTheme();
  return loading ? (
    <Skeleton height="2rem" width="2rem" />
  ) : (
    <MUIAvatar
      sx={{
        width: size || DEFAULT_SIZE,
        height: size || DEFAULT_SIZE,
        fontSize: (size || DEFAULT_SIZE) / 2,
        border: `${theme.sizes.size_4} solid ${theme.palette.grey[800]}`,
      }}
    >
      {stringAvatar(user?.displayName)}
    </MUIAvatar>
  );
}

export default Avatar;
