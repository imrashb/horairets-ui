// Firebase hooks barrel export
export { default as useDisplayPreferences } from "./useDisplayPreferences";
export { default as useFavorites } from "./useFavorites";
export { default as useSelectedSchedule } from "./useSelectedSchedule";
export { default as useUserDocument } from "./useUserDocument";

// Types
export type {
  DisplayPreferences,
  FavoritesMap,
  SelectedSchedulesMap,
  UseDisplayPreferencesResult,
  UseFavoritesResult,
  UserDocument,
  UseUserDocumentResult,
} from "./types";

export { DEFAULT_DISPLAY_PREFERENCES } from "./types";

