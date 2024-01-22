import { Favorite } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import React from 'react';
import { arrayRemove, arrayUnion, setDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import withAuth from '../../../components/Auth/AuthenticatedComponent';
import useFirebaseUserDocument from '../../../hooks/useFirebaseUserDocument';
import { getSessionFromCombinaisonUniqueId } from '../../../utils/Sessions.utils';
import useHoraireFavoris from '../../../hooks/useHoraireFavoris';

function FavoriteButton({ combinaison }) {
  const { t } = useTranslation('common');

  const { isFavorited, favorite } = useHoraireFavoris(combinaison);
  return (
    <Badge badgeContent={t('badgeNew')} color="badgeNew">
      {' '}
      <IconButton
        color={isFavorited ? 'primary' : undefined}
        onClick={favorite}
      >
        <Favorite />
      </IconButton>
    </Badge>

  );
}

export default withAuth(FavoriteButton);
