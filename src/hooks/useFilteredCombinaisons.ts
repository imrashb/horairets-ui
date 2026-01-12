import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import {
  filtersAtom,
  rawCombinaisonsAtom,
  sortingAtom,
  updateCombinaisonsInfoAtom,
} from "../features/generateur/generateurAtoms";
import {
  filterDisponibilites,
  filterGroupes,
} from "../pages/GenerateurHoraire/generateurHoraire.filters";
import { COMBINAISONS_SORTS } from "../pages/GenerateurHoraire/generateurHoraire.sorting";

// Define generic types for now as dependencies are not migrated
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Combinaison = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FilterFunction = (arr: Combinaison[]) => Combinaison[];

const pipe =
  (...fns: FilterFunction[]) =>
  (x: Combinaison[]) =>
    fns.reduce((v, f) => f(v), x);

const pipeAndFilterCombinaisons = (
  combinaisons: Combinaison[],
  sorting: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters: any
) =>
  combinaisons
    ? pipe(
        COMBINAISONS_SORTS[sorting as keyof typeof COMBINAISONS_SORTS],
        filterDisponibilites(filters.disponibilites),
        filterGroupes(filters.groupes)
      )(combinaisons)
    : combinaisons;

const useFilteredCombinaisons = (
  combinaisons?: Combinaison[]
): Combinaison[] => {
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
    () =>
      pipeAndFilterCombinaisons(
        combinaisonsToFilter || [],
        sorting as keyof typeof COMBINAISONS_SORTS,
        filters
      ),
    [combinaisonsToFilter, filters, sorting]
  );

  return filteredCombinaisons;
};

export default useFilteredCombinaisons;
