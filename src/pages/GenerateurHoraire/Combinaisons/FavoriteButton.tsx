import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import withAuth from "../../../components/Auth/AuthenticatedComponent";
import { Combinaison } from "../../../features/generateur/generateur.types";
import { useFavorites } from "../../../hooks/firebase";
import { getSessionFromCombinaisonUniqueId } from "../../../utils/Sessions.utils";

interface FavoriteButtonProps {
  combinaison?: Combinaison;
}

function FavoriteButton({ combinaison }: FavoriteButtonProps): JSX.Element {
  const { t } = useTranslation("common");
  const { isFavorited, toggleFavorite } = useFavorites();

  const combinaisonId = combinaison?.uniqueId;
  const session = getSessionFromCombinaisonUniqueId(combinaisonId ?? "") ?? "";

  const favorited = combinaisonId ? isFavorited(combinaisonId) : false;

  const handleFavorite = async (): Promise<void> => {
    if (!combinaisonId || !session) return;

    const toastOptions = { autoClose: 5000 };
    try {
      const result = await toggleFavorite(session, combinaisonId);
      if (result.isFavorited) {
        toast.success(t("ajoutFavoris"), toastOptions);
      } else {
        toast.success(t("retraitFavoris"), toastOptions);
      }
    } catch {
      toast.error(t("erreurFavoris"), toastOptions);
    }
  };

  return (
    <IconButton
      color={favorited ? "primary" : undefined}
      onClick={handleFavorite}
    >
      {favorited ? <Favorite /> : <FavoriteBorder />}
    </IconButton>
  );
}

export default withAuth(FavoriteButton);
