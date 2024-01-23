import React from 'react';
import { Avatar as MUIAvatar, Skeleton } from '@mui/material';
import styled, { useTheme } from 'styled-components';
import useCurrentUser from '../../hooks/user/useCurrentUser';

const stringAvatar = (name) => `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`;
const DEFAULT_SIZE = 24;

function Avatar({ size }) {
  const { user, loading } = useCurrentUser();

  const theme = useTheme();
  return (
    loading ? <Skeleton height="2rem" width="2rem" /> : (
      <MUIAvatar sx={{
        width: size || DEFAULT_SIZE,
        height: size || DEFAULT_SIZE,
        fontSize: (size || DEFAULT_SIZE) / 2,
        border: `${theme.sizes.size_4} solid ${theme.palette.grey[800]}`,
      }}
      >
        {stringAvatar(user?.displayName)}

      </MUIAvatar>

    )
  );
}

export default Avatar;
