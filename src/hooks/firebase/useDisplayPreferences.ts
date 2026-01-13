import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import {
  DEFAULT_DISPLAY_PREFERENCES,
  DisplayPreferences,
  UseDisplayPreferencesResult,
  UserDocument,
} from "./types";
import useUserDocument from "./useUserDocument";
import { displayPreferencesAtom } from "../../features/user/displayPreferencesAtom";

function useDisplayPreferences(): UseDisplayPreferencesResult {
  const { data, isLoading, error, updateDocument } =
    useUserDocument<UserDocument>();

  const [localPreferences, setLocalPreferences] = useAtom(displayPreferencesAtom);

  useEffect(() => {
    if (data?.displayPreferences) {
      setLocalPreferences(data.displayPreferences);
    } 
  }, [data?.displayPreferences, setLocalPreferences]);

  const preferences: DisplayPreferences = data?.displayPreferences ?? localPreferences;

  const updatePreferences = useCallback(
    async (updates: Partial<DisplayPreferences>): Promise<void> => {
      const newPreferences = {
        ...localPreferences,
        ...updates,
      };
      
      setLocalPreferences(newPreferences);
      
      if (data) {
        await updateDocument({
          displayPreferences: newPreferences,
        });
      }
    },
    [updateDocument, localPreferences, data, setLocalPreferences]
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
    setLocalPreferences(DEFAULT_DISPLAY_PREFERENCES);
    
    if (data) {
      await updateDocument({
        displayPreferences: DEFAULT_DISPLAY_PREFERENCES,
      });
    }
  }, [updateDocument, data, setLocalPreferences]);

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
