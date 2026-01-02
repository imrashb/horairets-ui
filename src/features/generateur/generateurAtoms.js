/* eslint-disable no-param-reassign */
import { atom } from 'jotai';
import { GENERATEUR_LIST_VIEW } from './generateur.constants';
import { COMBINAISONS_SORTS } from '../../pages/GenerateurHoraire/generateurHoraire.sorting';
import { FILTRES_PLANIFICATION } from '../../pages/GenerateurHoraire/generateurHoraire.constants';
import { reduceCombinaisonsInfoToGroupesOnly } from '../../utils/Groupes.utils';

export const sessionAtom = atom('');
export const programmesAtom = atom([]);

export const INITIAL_CONFIG = {
  cours: [],
  nombreCours: null,
  conges: [],
  coursObligatoires: [],
  session: null,
  programmes: [],
};

export const formGenerateurConfigAtom = atom({ ...INITIAL_CONFIG });

export const activeGenerateurConfigAtom = atom({ ...INITIAL_CONFIG });

export const selectedCoursAtom = atom(
  (get) => get(activeGenerateurConfigAtom).cours,
  (get, set, value) => {
    set(activeGenerateurConfigAtom, (prev) => ({ ...prev, cours: value }));
  },
);

export const nombreCoursAtom = atom(
  (get) => get(activeGenerateurConfigAtom).nombreCours,
  (get, set, value) => {
    set(activeGenerateurConfigAtom, (prev) => ({ ...prev, nombreCours: value }));
  },
);

export const congesAtom = atom(
  (get) => get(activeGenerateurConfigAtom).conges,
  (get, set, value) => {
    set(activeGenerateurConfigAtom, (prev) => ({ ...prev, conges: value }));
  },
);

export const coursObligatoiresAtom = atom(
  (get) => get(activeGenerateurConfigAtom).coursObligatoires,
  (get, set, value) => {
    set(activeGenerateurConfigAtom, (prev) => ({ ...prev, coursObligatoires: value }));
  },
);

export const viewAtom = atom(GENERATEUR_LIST_VIEW);
export const sortingAtom = atom(Object.keys(COMBINAISONS_SORTS)[0]);
export const filtersAtom = atom({
  planification: FILTRES_PLANIFICATION,
  groupes: [],
});

export const selectFilterPlanificationAtom = atom((get) => get(filtersAtom).planification);
export const selectFilterGroupesAtom = atom((get) => get(filtersAtom).groupes);

export const rawCombinaisonsAtom = atom(null);
export const combinaisonsInfoAtom = atom([]);

const getCombinaisonsInfo = (combinaisons) => {
  const combinaisonsInfo = combinaisons?.reduce((prev, comb) => {
    comb?.groupes?.forEach((groupe) => {
      const sigle = groupe?.cours?.sigle;
      const numeroGroupe = groupe?.numeroGroupe;

      const cours = prev.find((v) => v?.sigle === sigle);

      if (cours) {
        if (!cours.groupes.includes(numeroGroupe)) {
          const addGroupFunction = (c) => (c.sigle === cours.sigle
            ? {
              sigle: c.sigle,
              groupes: [...c.groupes, numeroGroupe],
            }
            : c);
          prev = prev.map(addGroupFunction);
        }
      } else {
        prev = [...prev, { sigle, groupes: [numeroGroupe] }];
      }
    });
    return prev;
  }, []);
  return combinaisonsInfo;
};

// Actions
export const setRawCombinaisonsAtom = atom(null, (get, set, combinations) => {
  set(rawCombinaisonsAtom, combinations);

  const combinaisonInfo = getCombinaisonsInfo(combinations);
  set(combinaisonsInfoAtom, combinaisonInfo);
  // Clear filters when new combinations are generated
  set(filtersAtom, {
    ...get(filtersAtom),
    groupes: reduceCombinaisonsInfoToGroupesOnly(get(combinaisonsInfoAtom)),
  });
});

export const updateCombinaisonsInfoAtom = atom(null, (get, set, combinations) => {
  const info = combinations?.reduce((prev, curr) => {
    curr?.groupes?.forEach((g) => {
      const index = prev.findIndex((i) => i.sigle === g.cours.sigle);
      if (index === -1) {
        prev.push({ sigle: g.cours.sigle, groupes: [g.numeroGroupe] });
      } else if (!prev[index].groupes.includes(g.numeroGroupe)) {
        prev[index].groupes.push(g.numeroGroupe);
      }
    });
    return prev;
  }, []);
  set(combinaisonsInfoAtom, info);
});

export const setSortingAtom = atom(null, (get, set, sorting) => {
  set(sortingAtom, sorting);
});

export const setFiltersAtom = atom(null, (get, set, filters) => {
  set(filtersAtom, filters);
});
