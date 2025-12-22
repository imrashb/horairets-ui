import { useEffect, useMemo } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { filterGroupes, filterPlanification } from '../pages/GenerateurHoraire/generateurHoraire.filters';
import { COMBINAISONS_SORTS } from '../pages/GenerateurHoraire/generateurHoraire.sorting';
import {
  filtersAtom,
  rawCombinaisonsAtom,
  sortingAtom,
  updateCombinaisonsInfoAtom,
} from '../features/generateur/generateurAtoms';

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const pipeAndFilterCombinaisons = (combinaisons, sorting, filters) => (combinaisons
  ? pipe(
    COMBINAISONS_SORTS[sorting],
    filterPlanification(filters.planification),
    filterGroupes(filters.groupes),
  )(combinaisons)
  : combinaisons);

const useFilteredCombinaisons = (combinaisons) => {
  const rawCombinaisons = useAtomValue(rawCombinaisonsAtom);
  const combinaisonsToFilter = combinaisons || rawCombinaisons;
  const filters = useAtomValue(filtersAtom);
  const sorting = useAtomValue(sortingAtom);
  const updateCombinaisonsInfo = useSetAtom(updateCombinaisonsInfoAtom);

  useEffect(() => {
    if (combinaisonsToFilter) {
      updateCombinaisonsInfo(combinaisonsToFilter);
    }
  }, [combinaisonsToFilter, updateCombinaisonsInfo, rawCombinaisons]);

  const filteredCombinaisons = useMemo(
    () => pipeAndFilterCombinaisons(combinaisonsToFilter, sorting, filters),
    [combinaisonsToFilter, filters, sorting],
  );

  return filteredCombinaisons;
};

export default useFilteredCombinaisons;
