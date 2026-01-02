import { TFunction } from "i18next";

export const getSessionTranslation = (
  value: string | undefined,
  t: TFunction
): string | undefined => {
  if (!value) return undefined;
  const params = { annee: value.substring(1, value.length) };
  switch (value.charAt(0).toLowerCase()) {
    case "a":
      return t("sessionAutomne", params) as string;
    case "e":
      return t("sessionEte", params) as string;
    case "h":
      return t("sessionHiver", params) as string;
    default:
      return undefined;
  }
};

export const getSessionFromCombinaisonUniqueId = (
  id: string
): string | undefined => {
  try {
    return window.atob(id)?.split(":")[0];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    return undefined;
  }
};

const TRIMESTRES: Record<string, number> = {
  H: 1,
  E: 2,
  A: 3,
};

export const sortSession = (session?: string[]): void => {
  if (session) {
    session.sort((s1, s2) => {
      const s1Trimestre = s1.charAt(0);
      const s1Annee = parseInt(s1.substring(1, s1.length), 10);
      const s2Trimestre = s2.charAt(0);
      const s2Annee = parseInt(s2.substring(1, s2.length), 10);

      if (s1Annee === s2Annee) {
        return (TRIMESTRES[s1Trimestre] || 0) - (TRIMESTRES[s2Trimestre] || 0);
      }
      return s1Annee - s2Annee;
    });
  }
};
