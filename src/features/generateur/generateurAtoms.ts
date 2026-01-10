import { atom } from "jotai";
import { reduceCombinaisonsInfoToGroupesOnly } from "../../utils/Groupes.utils";
import {
  FILTRES_PLANIFICATION,
  JOURS,
} from "../../pages/GenerateurHoraire/generateurHoraire.constants";
import { COMBINAISONS_SORTS } from "../../pages/GenerateurHoraire/generateurHoraire.sorting";
import { GENERATEUR_LIST_VIEW } from "./generateur.constants";
import {
  Combinaison,
  Filters,
  GenerateurConfig,
} from "./generateur.types";

export const sessionAtom = atom<string>("");
export const programmesAtom = atom<string[]>([]);

export const INITIAL_CONFIG: GenerateurConfig = {
  cours: [],
  nombreCours: null,
  conges: [],
  coursObligatoires: [],
  session: null,
  programmes: [],
};

export const formGenerateurConfigAtom = atom<GenerateurConfig>({
  ...INITIAL_CONFIG,
});

export const activeGenerateurConfigAtom = atom<GenerateurConfig>({
  ...INITIAL_CONFIG,
});

// Selectors
export const selectedCoursAtom = atom(
  (get) => get(activeGenerateurConfigAtom).cours,
  (get, set, value: string[]) => {
    set(activeGenerateurConfigAtom, (prev) => ({ ...prev, cours: value }));
  }
);

export const nombreCoursAtom = atom(
  (get) => get(activeGenerateurConfigAtom).nombreCours,
  (get, set, value: number) => {
    set(activeGenerateurConfigAtom, (prev) => ({ ...prev, nombreCours: value }));
  }
);

export const congesAtom = atom(
  (get) => get(activeGenerateurConfigAtom).conges,
  (get, set, value: string[]) => {
    set(activeGenerateurConfigAtom, (prev) => ({ ...prev, conges: value }));
  }
);

export const coursObligatoiresAtom = atom(
  (get) => get(activeGenerateurConfigAtom).coursObligatoires,
  (get, set, value: string[]) => {
    set(activeGenerateurConfigAtom, (prev) => ({
      ...prev,
      coursObligatoires: value,
    }));
  }
);

export const viewAtom = atom(GENERATEUR_LIST_VIEW);
export const sortingAtom = atom(Object.keys(COMBINAISONS_SORTS)[0]);

// TODO: Define proper type for Groupes filters, likely { sigle: string, groupes: (string|number)[] }[]
export const filtersAtom = atom<Filters>({
  planification: FILTRES_PLANIFICATION,
  groupes: [],
});

export const selectFilterPlanificationAtom = atom(
  (get) => get(filtersAtom).planification
);
export const selectFilterGroupesAtom = atom((get) => get(filtersAtom).groupes);

export const rawCombinaisonsAtom = atom<Combinaison[] | null>(null);

// Type for CombinaisonInfo is essentially what getCombinaisonsInfo returns
interface CombinaisonInfoItem {
  sigle: string;
  groupes: (string | number)[];
}

export const combinaisonsInfoAtom = atom<CombinaisonInfoItem[]>([]);

const getCombinaisonsInfo = (
  combinaisons: Combinaison[]
): CombinaisonInfoItem[] => {
  const combinaisonsInfo = combinaisons?.reduce<CombinaisonInfoItem[]>(
    (prev, comb) => {
      comb?.groupes?.forEach((groupe) => {
        const sigle = groupe?.cours?.sigle;
        const numeroGroupe = groupe?.numeroGroupe;

        const coursIndex = prev.findIndex((v) => v?.sigle === sigle);

        if (coursIndex !== -1) {
          const cours = prev[coursIndex];
          if (!cours.groupes.includes(numeroGroupe)) {
            prev[coursIndex] = {
              sigle: cours.sigle,
              groupes: [...cours.groupes, numeroGroupe],
            };
          }
        } else {
          prev.push({ sigle, groupes: [numeroGroupe] });
        }
      });
      return prev;
    },
    []
  );
  return combinaisonsInfo;
};

// Actions
export const setRawCombinaisonsAtom = atom(
  null,
  (get, set, combinations: Combinaison[]) => {
    set(rawCombinaisonsAtom, combinations);

    const combinaisonInfo = getCombinaisonsInfo(combinations || []);
    set(combinaisonsInfoAtom, combinaisonInfo);
    // Clear filters when new combinations are generated
    set(filtersAtom, {
      ...get(filtersAtom),
      groupes: reduceCombinaisonsInfoToGroupesOnly(get(combinaisonsInfoAtom)), // Ensure reduceCombinaisonsInfoToGroupesOnly matches expected types
    });
  }
);

export const updateCombinaisonsInfoAtom = atom(
  null,
  (get, set, combinations: Combinaison[]) => {
    const info = combinations?.reduce<CombinaisonInfoItem[]>((prev, curr) => {
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
  }
);

export const setSortingAtom = atom(null, (get, set, sorting: string) => {
  set(sortingAtom, sorting);
});

export const setFiltersAtom = atom(null, (get, set, filters: Filters) => {
  set(filtersAtom, filters);
});
