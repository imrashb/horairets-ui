import { useAtomValue } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import {
  selectFilterDisponibilitesAtom,
  selectFilterGroupesAtom,
} from "../../../../../features/generateur/generateurAtoms";
import FiltersContext from "./FiltersContext";

interface FiltersProviderProps {
  children?: React.ReactNode;
}

function FiltersProvider({ children }: FiltersProviderProps): JSX.Element {
  const currentGroupes = useAtomValue(selectFilterGroupesAtom);
  const currentDisponibilites = useAtomValue(selectFilterDisponibilitesAtom);

  const [groupes, setGroupes] = useState<string[]>(currentGroupes);
  const [disponibilites, setDisponibilites] = useState<boolean[][]>(
    currentDisponibilites || Array.from({ length: 7 }, () => [true, true, true])
  );

  const context = useMemo(
    () => ({
      groupes,
      setGroupes,
      disponibilites,
      setDisponibilites,
    }),
    [groupes, disponibilites]
  );

  useEffect(() => {
    if (currentGroupes) {
      setGroupes(currentGroupes);
    }
  }, [currentGroupes]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (currentDisponibilites) {
      setDisponibilites(currentDisponibilites);
    }
  }, [currentDisponibilites]);

  return (
    <FiltersContext.Provider value={context}>
      {children}
    </FiltersContext.Provider>
  );
}

export default FiltersProvider;
