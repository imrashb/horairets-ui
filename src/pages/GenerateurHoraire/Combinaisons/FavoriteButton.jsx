import { Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { arrayRemove, arrayUnion, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import withAuth from '../../../components/Auth/AuthenticatedComponent';
import useFirebaseUserDocument from '../../../hooks/useFirebaseUserDocument';
import { selectSession } from '../../../features/generateur/generateur.slice';

function FavoriteButton({ combinaison }) {
  const { t } = useTranslation('common');
  const id = combinaison?.uniqueId;
  const session = useSelector(selectSession);
  const document = useFirebaseUserDocument();

  const [data] = useDocumentData(document);

  const isFavorited = data?.favorites
  && data?.favorites[session]
   && data?.favorites[session].includes(id);

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
    <IconButton
      color={isFavorited ? 'primary' : undefined}
      onClick={handleFavorite}
    >
      <Favorite />
    </IconButton>
  );
}

export default withAuth(FavoriteButton);
