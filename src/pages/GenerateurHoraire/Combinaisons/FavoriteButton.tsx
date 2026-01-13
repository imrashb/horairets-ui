import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
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
    await toggleFavorite(session, combinaisonId);
  };

  const tooltipText = favorited ? t("retirerDesFavoris") : t("ajouterAuxFavoris");

  return (
    <Tooltip title={tooltipText}>
      <IconButton color={favorited ? "primary" : undefined} onClick={handleFavorite}>
        {favorited ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
}

export default withAuth(FavoriteButton);

