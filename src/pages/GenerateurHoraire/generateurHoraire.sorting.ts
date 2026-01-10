import { Combinaison } from "../../features/generateur/generateur.types";

export const LOST_TIME_BETWEEN_CLASSES_SORT = "LOST_TIME_BETWEEN_CLASSES_SORT";
export const CONGES_SORT = "CONGES_SORT";
export const CONGES_LOST_TIME_SORT = "CONGES_LOST_TIME_SORT";

interface TimeData {
  depart: number;
  fin: number;
  total: number;
}

const getLostTime = (combinaison: Combinaison): number => {
  const tmp: Record<string, TimeData> = {};
  combinaison?.groupes?.forEach((g) => {
    g?.activites?.forEach((a) => {
      const { heureDepart, heureFin, jour } = a.horaire;
      const { depart, fin, total } = tmp[jour] ? tmp[jour] : ({} as TimeData);
      tmp[jour] = {
        depart: Math.min(depart || 100000, heureDepart),
        fin: Math.max(fin || -100000, heureFin),
        total: (total || 0) + (heureFin - heureDepart),
      };
    });
  });
  return Object.values(tmp).reduce(
    (prev, v) => prev + (v.fin - v.depart - v.total),
    0
  );
};

const lostTimeSort = (a: Combinaison, b: Combinaison): number => {
  const lostA = getLostTime(a);
  const lostB = getLostTime(b);
  return lostA - lostB;
};

const congesSort = (a: Combinaison, b: Combinaison): number =>
  (b.conges?.length || 0) - (a.conges?.length || 0);

const congesLostTimeSort = (a: Combinaison, b: Combinaison): number => {
  const conges = (b.conges?.length || 0) - (a.conges?.length || 0);
  if (conges !== 0) {
    return conges;
  }

  return lostTimeSort(a, b);
};

export const COMBINAISONS_SORTS: Record<
  string,
  (combinaisons: Combinaison[]) => Combinaison[]
> = {
  [CONGES_LOST_TIME_SORT]: (combinaisons) =>
    [...combinaisons].sort(congesLostTimeSort),
  [LOST_TIME_BETWEEN_CLASSES_SORT]: (combinaisons) =>
    [...combinaisons].sort(lostTimeSort),
  [CONGES_SORT]: (combinaisons) => [...combinaisons].sort(congesSort),
};
