import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import withAuth from "../../../components/Auth/AuthenticatedComponent";
import { Combinaison } from "../../../features/generateur/generateur.types";
import { useFavorites } from "../../../hooks/firebase";
import { getSessionFromCombinaisonUniqueId } from "../../../utils/Sessions.utils";

interface FavoriteButtonProps {
  combinaison?: Combinaison;
}

function FavoriteButton({ combinaison }: FavoriteButtonProps): JSX.Element {
  const { isFavorited, toggleFavorite } = useFavorites();

  const combinaisonId = combinaison?.uniqueId;
  const session = getSessionFromCombinaisonUniqueId(combinaisonId ?? "") ?? "";

  const favorited = combinaisonId ? isFavorited(combinaisonId) : false;

  const handleFavorite = async (): Promise<void> => {
    if (!combinaisonId || !session) return;
    await toggleFavorite(session, combinaisonId);
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
