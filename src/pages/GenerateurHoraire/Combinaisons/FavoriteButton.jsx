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

function FavoriteButton({ combinaison }) {
  const { t } = useTranslation('common');
  const id = combinaison?.uniqueId;
  const document = useFirebaseUserDocument();

  const session = getSessionFromCombinaisonUniqueId(combinaison?.uniqueId);
  const [data] = useDocumentData(document);

  const isFavorited = data?.favorites
  && Object.values(data?.favorites).find((s) => s.includes(id));
  const handleFavorite = async () => {
    const newFavorites = {
      favorites: {
        [session]: isFavorited ? arrayRemove(id) : arrayUnion(id),
      },
    };
    const options = { autoClose: 5000 };
    try {
      await setDoc(document, newFavorites, { merge: true });
      if (isFavorited) {
        toast.success(t('retraitFavoris'), options);
      } else {
        toast.success(t('ajoutFavoris'), options);
      }
    } catch (error) {
      toast.error(t('erreurFavoris'), options);
    }
  };

  return (
    <Badge badgeContent={t('badgeNew')} color="badgeNew">
      {' '}
      <IconButton
        color={isFavorited ? 'primary' : undefined}
        onClick={handleFavorite}
      >
        <Favorite />
      </IconButton>
    </Badge>

  );
}

export default withAuth(FavoriteButton);
