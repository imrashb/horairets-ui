export const LOST_TIME_BETWEEN_CLASSES_SORT = 'LOST_TIME_BETWEEN_CLASSES_SORT';
export const CONGES_SORT = 'CONGES_SORT';
export const CONGES_LOST_TIME_SORT = 'CONGES_LOST_TIME_SORT';

const getLostTime = (combinaison) => {
  const tmp = {};
  combinaison?.groupes?.forEach((g) => {
    g?.activites?.forEach((a) => {
      const { heureDepart, heureFin, jour } = a.horaire;
      const { depart, fin, total } = tmp[jour] ? tmp[jour] : {};
      tmp[jour] = {
        depart: Math.min(depart || 100000, heureDepart),
        fin: Math.max(fin || -100000, heureFin),
        total: (total || 0) + (heureFin - heureDepart),
      };
    });
  });
  return Object.values(tmp).reduce((prev, v) => prev + (v.fin - v.depart - v.total), 0);
};

const lostTimeSort = (a, b) => {
  const lostA = getLostTime(a);
  const lostB = getLostTime(b);
  return lostA - lostB;
};

const congesSort = (a, b) => b.conges.length - a.conges.length;

const congesLostTimeSort = (a, b) => {
  const conges = b.conges.length - a.conges.length;
  if (conges !== 0) {
    return conges;
  }

  return lostTimeSort(a, b);
};

export const COMBINAISONS_SORTS = {
  [CONGES_LOST_TIME_SORT]: (combinaisons) => [...combinaisons].sort(congesLostTimeSort),
  [LOST_TIME_BETWEEN_CLASSES_SORT]: (combinaisons) => [...combinaisons].sort(lostTimeSort),
  [CONGES_SORT]: (combinaisons) => [...combinaisons].sort(congesSort),

};
