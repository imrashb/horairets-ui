import { Combinaison } from '../../features/generateur/generateur.types';
import { getGroupeId } from '../../utils/Groupes.utils';
import {
  APRES_MIDI,
  JOURS,
  MATIN,
  SOIR,
} from './generateurHoraire.constants';

const HEURES_COURS: Record<string, { min: number; max: number }> = {
  [MATIN]: {
    min: 800,
    max: 1250,
  },
  [APRES_MIDI]: {
    min: 1300,
    max: 1750,
  },
  [SOIR]: {
    min: 1800,
    max: 2400,
  },
};

const noOperationFilter = (combinaisons: Combinaison[]) => combinaisons;

export const filterDisponibilites = (disponibilites: boolean[][]) => {
  // Check if all are true (no filtering needed)
  if (!disponibilites || disponibilites.every((day) => day.every((period) => period))) {
    return noOperationFilter;
  }

  const PERIOD_KEYS = [MATIN, APRES_MIDI, SOIR];

  return (combinaisons: Combinaison[]) => combinaisons.filter((comb) => comb.groupes.every((groupe) => groupe.activites.every((activite) => {
    // Normalize day string
    const jourStr = activite.horaire.jour.toUpperCase();
    const jourIndex = JOURS.indexOf(jourStr);

    if (jourIndex === -1) return true;

    for (let i = 0; i < 3; i++) {
      const periodKey = PERIOD_KEYS[i];
      const range = HEURES_COURS[periodKey];

      const isOverlapping = Math.max(activite.horaire.heureDepart, range.min)
              <= Math.min(activite.horaire.heureFin, range.max);

      if (isOverlapping) {
        if (!disponibilites[jourIndex][i]) {
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
