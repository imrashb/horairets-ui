import { PartialWithFieldValue } from "firebase/firestore";

export type FavoritesMap = Record<string, string[]>;

export interface UserDocument {
  favorites?: FavoritesMap;
}

export interface UseFavoritesResult {
  favorites: FavoritesMap | undefined;

  sessions: string[];

  isLoading: boolean;

  error: Error | undefined;

  isFavorited: (combinaisonId: string) => boolean;

  getFavoritesBySession: (session: string) => string[];

  addFavorite: (session: string, combinaisonId: string) => Promise<void>;

  removeFavorite: (session: string, combinaisonId: string) => Promise<void>;

  toggleFavorite: (
    session: string,
    combinaisonId: string
  ) => Promise<{ isFavorited: boolean }>;
}

export interface UseUserDocumentResult<T> {
  data: T | undefined;

  isLoading: boolean;

  error: Error | undefined;

  updateDocument: (updates: PartialWithFieldValue<T>) => Promise<void>;
}

