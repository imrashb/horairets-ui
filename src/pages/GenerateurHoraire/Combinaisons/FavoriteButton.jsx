import { Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import withAuth from '../../../components/Auth/AuthenticatedComponent';
import useHoraireFavoris from '../../../hooks/useHoraireFavoris';

function FavoriteButton({ combinaison }) {
  const { isFavorited, favorite } = useHoraireFavoris(combinaison);
  return (
    <IconButton color={isFavorited ? 'primary' : undefined} onClick={favorite}>
      <Favorite />
    </IconButton>
  );
}

export default withAuth(FavoriteButton);
