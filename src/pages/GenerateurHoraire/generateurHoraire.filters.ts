import { Combinaison } from '../../features/generateur/generateur.types';
import { getGroupeId } from '../../utils/Groupes.utils';
import {
  DisponibiliteMap,
  Jour,
  Periode,
} from './generateurHoraire.constants';

const HEURES_COURS: Record<Periode, { min: number; max: number }> = {
  [Periode.MATIN]: {
    min: 800,
    max: 1250,
  },
  [Periode.APRES_MIDI]: {
    min: 1300,
    max: 1750,
  },
  [Periode.SOIR]: {
    min: 1800,
    max: 2400,
  },
};

const noOperationFilter = (combinaisons: Combinaison[]) => combinaisons;

export const filterDisponibilites = (disponibilites: DisponibiliteMap) => {
  // Check if all are true (no filtering needed) - Logic: Check if every day has all 3 periods
  const allFull = Object.values(disponibilites).every((periodes) => periodes.length === 3);

  if (!disponibilites || allFull) {
    return noOperationFilter;
  }

  const PERIOD_KEYS = Object.values(Periode);

  return (combinaisons: Combinaison[]) => combinaisons.filter((comb) => comb.groupes.every((groupe) => groupe.activites.every((activite) => {
    // Normalize day string to match Enum
    // Assuming API returns uppercase days like 'LUNDI', 'MARDI' which matches our Enum keys
    const jourStr = activite.horaire.jour.toUpperCase();
    const jour = jourStr as Jour;

    if (!Object.values(Jour).includes(jour)) return true; // Ignore unknown days

    // Check each period overlap
    for (const periodKey of PERIOD_KEYS) {
      const range = HEURES_COURS[periodKey];
      const isOverlapping = Math.max(activite.horaire.heureDepart, range.min)
                <= Math.min(activite.horaire.heureFin, range.max);

      if (isOverlapping) {
        // If overlapping, check if this period is allowed in disponibilites
        const allowedPeriodes = disponibilites[jour] || [];
        if (!allowedPeriodes.includes(periodKey)) {
          return false; // Intersection with disallowed slot
        }
      }
    }
    return true;
  })));
};

export const filterGroupes = (groupes: string[]) => {
  if (groupes.length === 0) {
    return noOperationFilter;
  }

  return (combinaisons: Combinaison[]) => combinaisons.filter((comb) => comb?.groupes.every((groupe) => {
    const sigle = groupe?.cours?.sigle;
    const numeroGroupe = groupe?.numeroGroupe;
    const id = getGroupeId(sigle, String(numeroGroupe));

    return !!groupes.includes(id);
  }));
};
