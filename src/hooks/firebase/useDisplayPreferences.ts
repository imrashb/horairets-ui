import { useCallback } from "react";
import {
  DEFAULT_DISPLAY_PREFERENCES,
  DisplayPreferences,
  UseDisplayPreferencesResult,
  UserDocument,
} from "./types";
import useUserDocument from "./useUserDocument";

function useDisplayPreferences(): UseDisplayPreferencesResult {
  const { data, isLoading, error, updateDocument } =
    useUserDocument<UserDocument>();

  const preferences: DisplayPreferences =
    data?.displayPreferences ?? DEFAULT_DISPLAY_PREFERENCES;

  const updatePreferences = useCallback(
    async (updates: Partial<DisplayPreferences>): Promise<void> => {
      await updateDocument({
        displayPreferences: {
          ...preferences,
          ...updates,
        },
      });
    },
    [updateDocument, preferences]
  );

  const setPreference = useCallback(
    async <K extends keyof DisplayPreferences>(
      key: K,
      value: DisplayPreferences[K]
    ): Promise<void> => {
      await updatePreferences({ [key]: value });
    },
    [updatePreferences]
  );

  const resetToDefaults = useCallback(async (): Promise<void> => {
    await updateDocument({
      displayPreferences: DEFAULT_DISPLAY_PREFERENCES,
    });
  }, [updateDocument]);

  return {
    preferences,
    isLoading,
    error,
    updatePreferences,
    setPreference,
    resetToDefaults,
  };
}

export default useDisplayPreferences;
