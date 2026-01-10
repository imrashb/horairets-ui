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

export function compareSession(a: string, b: string): number {
  const parsedA = parseSession(a);
  const parsedB = parseSession(b);

  if (!parsedA || !parsedB) return 0;

  if (parsedA.annee !== parsedB.annee) {
    return parseInt(parsedA.annee) - parseInt(parsedB.annee);
  }

  const orderA = TRIMESTRE_MAP[parsedA.trimestreId]?.order || 0;
  const orderB = TRIMESTRE_MAP[parsedB.trimestreId]?.order || 0;

  return orderA - orderB;
}

export function isSessionBefore(a: string, b: string): boolean {
  return compareSession(a, b) < 0;
}

export function isSessionAfter(a: string, b: string): boolean {
  return compareSession(a, b) > 0;
}

export function isSessionSameOrBefore(a: string, b: string): boolean {
  return compareSession(a, b) <= 0;
}

export function isSessionSameOrAfter(a: string, b: string): boolean {
  return compareSession(a, b) >= 0;
}

export const sortSession = (session?: string[]): void => {
  if (session) {
    session.sort(compareSession);
  }
};

