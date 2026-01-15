import { Cours } from '../features/generateur/generateur.types';
import { SessionConfig } from '../hooks/firebase/types';

export interface CreditsRange {
  min: number;
  max: number;
}

export function calculateCreditsRange(allCours: Cours[], config: SessionConfig): CreditsRange {
  const selectedCourses = allCours.filter((c) => config.cours.includes(c.sigle));

  if (config.nombreCours === null || config.nombreCours >= config.cours.length) {
    const total = selectedCourses.reduce((sum, c) => sum + c.credits, 0);
    return { min: total, max: total };
  }

  const lockedCredits = selectedCourses
    .filter((c) => config.coursObligatoires.includes(c.sigle))
    .reduce((sum, c) => sum + c.credits, 0);

  const optionalCredits = selectedCourses
    .filter((c) => !config.coursObligatoires.includes(c.sigle))
    .map((c) => c.credits)
    .sort((a, b) => a - b);

  const remainingSlots = config.nombreCours - config.coursObligatoires.length;

  if (remainingSlots <= 0 || optionalCredits.length === 0) {
    return { min: lockedCredits, max: lockedCredits };
  }

  const slotsToFill = Math.min(remainingSlots, optionalCredits.length);
  const minOptionalCredits = optionalCredits.slice(0, slotsToFill).reduce((sum, c) => sum + c, 0);
  const maxOptionalCredits = optionalCredits.slice(-slotsToFill).reduce((sum, c) => sum + c, 0);

  return {
    min: lockedCredits + minOptionalCredits,
    max: lockedCredits + maxOptionalCredits,
  };
}

export function sumCreditsRanges(ranges: CreditsRange[]): CreditsRange {
  return ranges.reduce(
    (acc, range) => ({
      min: acc.min + range.min,
      max: acc.max + range.max,
    }),
    { min: 0, max: 0 },
  );
}
