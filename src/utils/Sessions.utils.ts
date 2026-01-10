import { TFunction } from "i18next";

export const TRIMESTRE_MAP = {
  A: { translationKey: "trimestreAutomne", sessionTranslationKey: "sessionAutomne", order: 3 },
  E: { translationKey: "trimestreEte", sessionTranslationKey: "sessionEte", order: 2 },
  H: { translationKey: "trimestreHiver", sessionTranslationKey: "sessionHiver", order: 1 },
} as const;

export type TrimestreId = keyof typeof TRIMESTRE_MAP;

export const TRIMESTRE_IDS: TrimestreId[] = ["A", "E", "H"];

export function parseSession(session: string | undefined): { trimestreId: TrimestreId; annee: string } | undefined {
  if (!session || session.length < 2) {
    return undefined
  }
  const trimestreId = session[0].toUpperCase() as TrimestreId;
  const annee = session.slice(1);

  if(annee.length !== 4 || !TRIMESTRE_IDS.includes(trimestreId)) {
    return undefined
  }

  return {
    trimestreId,
    annee,
  };
}

export function formatSession(trimestreId: TrimestreId, annee: string): string {
  return `${trimestreId}${annee}`;
}

export const getSessionTranslation = (
  value: string | undefined,
  t: TFunction
): string | undefined => {
  if (!value) return undefined;
  const sessionParams = parseSession(value);
  if (!sessionParams) return undefined;
  const { trimestreId, annee } = sessionParams;
  const trimestre = TRIMESTRE_MAP[trimestreId];
  if (!trimestre) return undefined;
  return t(trimestre.sessionTranslationKey, { annee }) as string;
};

export const getSessionFromCombinaisonUniqueId = (
  id: string
): string | undefined => {
  try {
    return window.atob(id)?.split(":")[0];
  } catch {
    return undefined;
  }
};

export const compareSession = (s1: string, s2: string): number => {
  const parsed1 = parseSession(s1);
  const parsed2 = parseSession(s2);

  if (!parsed1 || !parsed2) return 0;
  const annee1 = parseInt(parsed1.annee, 10);
  const annee2 = parseInt(parsed2.annee, 10);

  if (annee1 === annee2) {
    return (TRIMESTRE_MAP[parsed1.trimestreId]?.order || 0) - (TRIMESTRE_MAP[parsed2.trimestreId]?.order || 0);
  }
  return annee1 - annee2;
};

export const sortSession = (session?: string[]): void => {
  if (session) {
    session.sort(compareSession);
  }
};
