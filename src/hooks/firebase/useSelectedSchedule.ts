import { deleteField } from "firebase/firestore";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SelectedSchedulesMap, UserDocument } from "./types";
import useUserDocument from "./useUserDocument";

export interface UseSelectedScheduleResult {
  selectedSchedules: SelectedSchedulesMap | undefined;
  isLoading: boolean;
  error: Error | undefined;
  isSelected: (session: string, combinaisonId: string) => boolean;
  getSelectedSchedule: (session: string) => string | undefined;
  setSelectedSchedule: (session: string, combinaisonId: string) => Promise<void>;
  clearSelectedSchedule: (session: string) => Promise<void>;
  toggleSelectedSchedule: (session: string, combinaisonId: string) => Promise<{ isSelected: boolean }>;
}

function useSelectedSchedule(): UseSelectedScheduleResult {
  const { t } = useTranslation("common");
  const { data, isLoading, error, updateDocument } = useUserDocument<UserDocument>();

  const selectedSchedules = data?.selectedSchedules;

  const isSelected = useCallback(
    (session: string, combinaisonId: string): boolean => {
      if (!selectedSchedules || !session || !combinaisonId) return false;
      return selectedSchedules[session] === combinaisonId;
    },
    [selectedSchedules]
  );

  const getSelectedSchedule = useCallback(
    (session: string): string | undefined => {
      if (!selectedSchedules || !session) return undefined;
      return selectedSchedules[session];
    },
    [selectedSchedules]
  );

  const setSelectedSchedule = useCallback(
    async (session: string, combinaisonId: string): Promise<void> => {
      if (!session || !combinaisonId) {
        throw new Error("Session and combinaisonId are required");
      }

      await updateDocument(
        {
          selectedSchedules: {
            [session]: combinaisonId,
          },
        },
        {
          showToast: true,
          successMessage: t("horaireSelectionne") as string,
          errorMessage: t("erreurSelectionHoraire") as string,
        }
      );
    },
    [updateDocument, t]
  );

  const clearSelectedSchedule = useCallback(
    async (session: string): Promise<void> => {
      if (!session) {
        throw new Error("Session is required");
      }

      await updateDocument(
        {
          selectedSchedules: {
            [session]: deleteField(),
          },
        } as any,
        {
          showToast: true,
          successMessage: t("horaireDeselectionne") as string,
          errorMessage: t("erreurSelectionHoraire") as string,
        }
      );
    },
    [updateDocument, t]
  );

  const toggleSelectedSchedule = useCallback(
    async (session: string, combinaisonId: string): Promise<{ isSelected: boolean }> => {
      if (!session || !combinaisonId) {
        throw new Error("Session and combinaisonId are required");
      }

      const currentlySelected = selectedSchedules?.[session] === combinaisonId;

      if (currentlySelected) {
        await clearSelectedSchedule(session);
        return { isSelected: false };
      } else {
        await setSelectedSchedule(session, combinaisonId);
        return { isSelected: true };
      }
    },
    [selectedSchedules, setSelectedSchedule, clearSelectedSchedule]
  );

  return {
    selectedSchedules,
    isLoading,
    error,
    isSelected,
    getSelectedSchedule,
    setSelectedSchedule,
    clearSelectedSchedule,
    toggleSelectedSchedule,
  };
}

export default useSelectedSchedule;
