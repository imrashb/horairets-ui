import { atom } from 'jotai';

export const affichageAtom = atom({
  showNomCoursGroupe: true,
  showLocaux: true,
  showNomActivite: true,
  showUniqueCoursColors: true,
  showModeEnseignement: false,
  showEnseignant: false,
});

// Selectors
export const showNomCoursGroupeAtom = atom((get) => get(affichageAtom).showNomCoursGroupe);
export const showLocauxAtom = atom((get) => get(affichageAtom).showLocaux);
export const showNomActiviteAtom = atom((get) => get(affichageAtom).showNomActivite);
export const showUniqueCoursColorsAtom = atom((get) => get(affichageAtom).showUniqueCoursColors);
export const showModeEnseignementAtom = atom((get) => get(affichageAtom).showModeEnseignement);
export const showEnseignantAtom = atom((get) => get(affichageAtom).showEnseignant);

// Setter action
export const setAffichageCombinaisonsAtom = atom(null, (get, set, newSettings) => {
  set(affichageAtom, { ...get(affichageAtom), ...newSettings });
});
