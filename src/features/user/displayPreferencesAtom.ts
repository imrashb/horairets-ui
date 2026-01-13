import { atom } from "jotai";
import { DEFAULT_DISPLAY_PREFERENCES, DisplayPreferences } from "../../hooks/firebase/types";

export const displayPreferencesAtom = atom<DisplayPreferences>(DEFAULT_DISPLAY_PREFERENCES);
