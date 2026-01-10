// Firebase hooks barrel export
export { default as useDisplayPreferences } from "./useDisplayPreferences";
export { default as useFavorites } from "./useFavorites";
export { default as useUserDocument } from "./useUserDocument";

// Types
export type {
  DisplayPreferences,
  FavoritesMap,
  UseDisplayPreferencesResult,
  UseFavoritesResult,
  UserDocument,
  UseUserDocumentResult,
} from "./types";

export { DEFAULT_DISPLAY_PREFERENCES } from "./types";
