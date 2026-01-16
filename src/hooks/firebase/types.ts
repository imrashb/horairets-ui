import { PartialWithFieldValue } from 'firebase/firestore';
import { DisponibiliteMap } from '../../pages/GenerateurHoraire/generateurHoraire.constants';

export type FavoritesMap = Record<string, string[]>;
export type SelectedSchedulesMap = Record<string, string>;

export interface DisplayPreferences {
  showNomCoursGroupe: boolean;
  showLocaux: boolean;
  showNomActivite: boolean;
  showUniqueCoursColors: boolean;
  showModeEnseignement: boolean;
  showEnseignant: boolean;
}

export const DEFAULT_DISPLAY_PREFERENCES: DisplayPreferences = {
  showNomCoursGroupe: true,
  showLocaux: true,
  showNomActivite: true,
  showUniqueCoursColors: true,
  showModeEnseignement: false,
  showEnseignant: false,
};

export interface SessionConfig {
  cours: string[];
  coursObligatoires: string[];
  nombreCours: number | null;
  disponibilites: DisponibiliteMap;
  selectedCombinaisonId?: string | null;
}

export type SessionsMap = Record<string, SessionConfig>;

export interface UserProfile {
  programme: string;
  admissionSession: string;
  sessions: SessionsMap;
}

export interface UserDocument {
  favorites?: FavoritesMap;
  selectedSchedules?: SelectedSchedulesMap;
  displayPreferences?: DisplayPreferences;
  profile?: UserProfile;
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

  toggleFavorite: (session: string, combinaisonId: string) => Promise<{ isFavorited: boolean }>;
}

export interface UseDisplayPreferencesResult {
  preferences: DisplayPreferences;

  isLoading: boolean;

  error: Error | undefined;

  updatePreferences: (updates: Partial<DisplayPreferences>) => Promise<void>;

  setPreference: <K extends keyof DisplayPreferences>(
    key: K,
    value: DisplayPreferences[K],
  ) => Promise<void>;

  resetToDefaults: () => Promise<void>;
}

export interface UpdateOptions {
  showToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export interface UseUserDocumentResult<T> {
  data: T | undefined;

  isLoading: boolean;

  error: Error | undefined;

  updateDocument: (updates: PartialWithFieldValue<T>, options?: UpdateOptions) => Promise<void>;
}
