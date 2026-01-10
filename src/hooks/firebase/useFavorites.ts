import { arrayRemove, arrayUnion } from "firebase/firestore";
import { useCallback, useMemo } from "react";
import { FavoritesMap, UseFavoritesResult, UserDocument } from "./types";
import useUserDocument from "./useUserDocument";

function useFavorites(): UseFavoritesResult {
  const { data, isLoading, error, updateDocument } =
    useUserDocument<UserDocument>();

  const favorites: FavoritesMap | undefined = data?.favorites;

  const sessions: string[] = useMemo(() => {
    if (!favorites) return [];
    return Object.keys(favorites);
  }, [favorites]);

  const isFavorited = useCallback(
    (combinaisonId: string): boolean => {
      if (!favorites || !combinaisonId) return false;
      return Object.values(favorites).some((sessionFavorites) =>
        sessionFavorites.includes(combinaisonId)
      );
    },
    [favorites]
  );

  const getFavoritesBySession = useCallback(
    (session: string): string[] => {
      if (!favorites || !session) return [];
      return favorites[session] ?? [];
    },
    [favorites]
  );

  const addFavorite = useCallback(
    async (session: string, combinaisonId: string): Promise<void> => {
      if (!session || !combinaisonId) {
        throw new Error("Session and combinaisonId are required");
      }

      await updateDocument({
        favorites: {
          [session]: arrayUnion(combinaisonId),
        },
      });
    },
    [updateDocument]
  );

  const removeFavorite = useCallback(
    async (session: string, combinaisonId: string): Promise<void> => {
      if (!session || !combinaisonId) {
        throw new Error("Session and combinaisonId are required");
      }

      await updateDocument({
        favorites: {
          [session]: arrayRemove(combinaisonId),
        },
      });
    },
    [updateDocument]
  );

  const toggleFavorite = useCallback(
    async (
      session: string,
      combinaisonId: string
    ): Promise<{ isFavorited: boolean }> => {
      if (!session || !combinaisonId) {
        throw new Error("Session and combinaisonId are required");
      }

      const currentlyFavorited = favorites?.[session]?.includes(combinaisonId) ?? false;

      if (currentlyFavorited) {
        await removeFavorite(session, combinaisonId);
        return { isFavorited: false };
      } else {
        await addFavorite(session, combinaisonId);
        return { isFavorited: true };
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  return {
    favorites,
    sessions,
    isLoading,
    error,
    isFavorited,
    getFavoritesBySession,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}

export default useFavorites;
