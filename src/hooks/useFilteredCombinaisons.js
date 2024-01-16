import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterGroupes, filterPlanification } from '../pages/GenerateurHoraire/generateurHoraire.filters';
import { COMBINAISONS_SORTS } from '../pages/GenerateurHoraire/generateurHoraire.sorting';
import {
  selectRawCombinaisons, updateCombinaisonsInfo,
} from '../features/generateur/generateur.slice';

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const pipeAndFilterCombinaisons = (combinaisons, sorting, filters) => (combinaisons
  ? pipe(
    COMBINAISONS_SORTS[sorting],
    filterPlanification(filters.planification),
    filterGroupes(filters.groupes),
  )(combinaisons) : combinaisons);

const useFilteredCombinaisons = (combinaisons) => {
  const rawCombinaisons = useSelector(selectRawCombinaisons);
  const combinaisonsToFilter = combinaisons || rawCombinaisons;
  const filters = useSelector((state) => state.generateur.filters);
  const sorting = useSelector((state) => state.generateur.sorting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (combinaisonsToFilter) {
      dispatch(updateCombinaisonsInfo(combinaisonsToFilter));
    }
  }, [combinaisonsToFilter, dispatch, rawCombinaisons]);

  const filteredCombinaisons = useMemo(
    () => pipeAndFilterCombinaisons(combinaisonsToFilter, sorting, filters),
    [combinaisonsToFilter, filters, sorting],
  );
  return filteredCombinaisons;
};

export default useFilteredCombinaisons;
