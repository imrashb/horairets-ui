import { parseSession, TrimestreId } from './Sessions.utils';

const TRIMESTRE_CHRONOLOGICAL_ORDER: TrimestreId[] = ['H', 'E', 'A'];

export function getNextSession(currentSession: string): string {
  const parsed = parseSession(currentSession);
  if (!parsed) return `H${new Date().getFullYear() + 1}`;

  const { trimestreId, annee } = parsed;
  const currentIndex = TRIMESTRE_CHRONOLOGICAL_ORDER.indexOf(trimestreId);
  const nextIndex = (currentIndex + 1) % TRIMESTRE_CHRONOLOGICAL_ORDER.length;
  const nextYear = nextIndex === 0 ? parseInt(annee, 10) + 1 : parseInt(annee, 10);

  return `${TRIMESTRE_CHRONOLOGICAL_ORDER[nextIndex]}${nextYear}`;
}

export function getPreviousSession(currentSession: string): string {
  const parsed = parseSession(currentSession);
  if (!parsed) return `H${new Date().getFullYear() - 1}`;

  const { trimestreId, annee } = parsed;
  const currentIndex = TRIMESTRE_CHRONOLOGICAL_ORDER.indexOf(trimestreId);
  const prevIndex = (currentIndex - 1 + TRIMESTRE_CHRONOLOGICAL_ORDER.length)
    % TRIMESTRE_CHRONOLOGICAL_ORDER.length;
  const prevYear = currentIndex === 0 ? parseInt(annee, 10) - 1 : parseInt(annee, 10);

  return `${TRIMESTRE_CHRONOLOGICAL_ORDER[prevIndex]}${prevYear}`;
}

export function getCurrentSession(): string {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  if (month <= 3) return `H${year}`;
  if (month <= 7) return `E${year}`;
  return `A${year}`;
}
