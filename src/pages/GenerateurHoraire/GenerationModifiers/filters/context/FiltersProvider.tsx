import { useAtomValue } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import {
  selectFilterGroupesAtom,
  selectFilterPlanificationAtom,
} from "../../../../../features/generateur/generateurAtoms";
import FiltersContext from "./FiltersContext";

interface FiltersProviderProps {
  children?: React.ReactNode;
}

function FiltersProvider({ children }: FiltersProviderProps): JSX.Element {
  const currentPlanification = useAtomValue(selectFilterPlanificationAtom);
  const currentGroupes = useAtomValue(selectFilterGroupesAtom);

  const [planification, setPlanification] =
    useState<string[]>(currentPlanification);
  const [groupes, setGroupes] = useState<string[]>(currentGroupes);

  const context = useMemo(
    () => ({
      planification,
      setPlanification,
      groupes,
      setGroupes,
    }),
    [groupes, planification]
  );

  useEffect(() => {
    if (currentGroupes) {
      setGroupes(currentGroupes);
    }
  }, [currentGroupes]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FiltersContext.Provider value={context}>
      {children}
    </FiltersContext.Provider>
  );
}

export default FiltersProvider;
