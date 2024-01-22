import React from 'react';
import useDocumentValue from './firebase/useDocumentValue';
import { useTranslation } from 'react-i18next';
import { getSessionFromCombinaisonUniqueId } from '../utils/Sessions.utils';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { toast } from 'react-toastify';

const useHoraireFavoris = (combinaison) => {
  const { t } = useTranslation('common')

  const id = combinaison?.uniqueId
  const session = getSessionFromCombinaisonUniqueId(id);
  const {data, update} = useDocumentValue({ selector: 'favorites' });

  const isFavorited = data
  && Object.values(data).find((s) => s.includes(id));
  const favorite = () => {
    const newFavorites = {
      favorites: {
        [session]: isFavorited ? arrayRemove(id) : arrayUnion(id),
      },
    };
    const options = { autoClose: 5000 };
    try {
      update(newFavorites)
      if (isFavorited) {
        toast.success(t('retraitFavoris'), options);
      } else {
        toast.success(t('ajoutFavoris'), options);
      }
    } catch (error) {
      toast.error(t('erreurFavoris'), options);
    }
  };
  return { isFavorited, favorite };
};

export default useHoraireFavoris;
