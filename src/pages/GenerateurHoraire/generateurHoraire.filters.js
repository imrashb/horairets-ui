import {
  APRES_MIDI, FILTRES_PLANIFICATION, MATIN, SOIR,
} from './generateurHoraire.constants';

const HEURES_COURS = {
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

// eslint-disable-next-line import/prefer-default-export
export const filterPlanification = (filtres) => {
  const heures = FILTRES_PLANIFICATION.filter((f) => !filtres.includes(f));

  if (heures.length === 0) {
    return (
      combinaisons,
    ) => combinaisons;
  } // Pas besoin de filter si aucun filtre

  // Trouve un overlap, fait propager dans les "find", si true on le filter out donc retourne false
  return (
    combinaisons,
  ) => combinaisons.filter(
    (combinaison) => !combinaison?.groupes?.find((g) => !!g?.activites?.find((a) => !!heures?.find(
      (h) => Math.max(a?.horaire?.heureDepart, HEURES_COURS[h].min) // Overlap
    <= Math.min(a?.horaire?.heureFin, HEURES_COURS[h].max), // Overlap
    ))),
  );
};
