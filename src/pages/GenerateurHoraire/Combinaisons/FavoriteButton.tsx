import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { arrayRemove, arrayUnion, setDoc } from "firebase/firestore";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import withAuth from "../../../components/Auth/AuthenticatedComponent";
import { Combinaison } from "../../../features/generateur/generateur.types";
import useFirebaseUserDocument from "../../../hooks/useFirebaseUserDocument";
import { getSessionFromCombinaisonUniqueId } from "../../../utils/Sessions.utils";
import { UserFavoritesData } from "../../Favoris/Favoris";

interface FavoriteButtonProps {
  combinaison?: Combinaison;
}

function FavoriteButton({ combinaison }: FavoriteButtonProps): JSX.Element {
  const { t } = useTranslation("common");
  const id = combinaison?.uniqueId;
  const document = useFirebaseUserDocument(); // Returns DocumentReference<DocumentData> | undefined

  const session = getSessionFromCombinaisonUniqueId(
    combinaison?.uniqueId || ""
  ) || "";
  // useDocumentData returns [data, loading, error, snapshot]
  const [data] = useDocumentData(document);
  const userData = data as UserFavoritesData | undefined;

  const isFavorited =
    id &&
    userData?.favorites &&
    Object.values(userData.favorites).find((s) => s.includes(id));

  const handleFavorite = async () => {
    if (!id || !document) return;

    const newFavorites = {
      favorites: {
        [session]: isFavorited ? arrayRemove(id) : arrayUnion(id),
      },
    };
    const options = { autoClose: 5000 };
    try {
      await setDoc(document, newFavorites, { merge: true });
      if (isFavorited) {
        toast.success(t("retraitFavoris"), options);
      } else {
        toast.success(t("ajoutFavoris"), options);
      }
    } catch (error) {
      toast.error(t("erreurFavoris"), options);
    }
  };

  return (
    <IconButton
      color={isFavorited ? "primary" : undefined}
      onClick={handleFavorite}
    >
      {isFavorited ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}

export default withAuth(FavoriteButton);
