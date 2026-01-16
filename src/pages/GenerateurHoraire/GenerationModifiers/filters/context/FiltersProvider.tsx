import { useAtomValue } from 'jotai';
import React, { useEffect, useMemo, useState } from 'react';
import {
  selectFilterDisponibilitesAtom,
  selectFilterGroupesAtom,
} from '../../../../../features/generateur/generateurAtoms';
import { getDefaultDisponibilites } from '../../../../../utils/Disponibilites.utils';
import FiltersContext from './FiltersContext';
import { DisponibiliteMap } from '../../../generateurHoraire.constants';

interface FiltersProviderProps {
  children?: React.ReactNode;
}

function FiltersProvider({ children }: FiltersProviderProps): JSX.Element {
  const currentGroupes = useAtomValue(selectFilterGroupesAtom);
  const currentDisponibilites = useAtomValue(selectFilterDisponibilitesAtom);

  const [groupes, setGroupes] = useState<string[]>(currentGroupes);
  const [disponibilites, setDisponibilites] = useState<DisponibiliteMap>(
    currentDisponibilites || getDefaultDisponibilites(),
  );

  const context = useMemo(
    () => ({
      groupes,
      setGroupes,
      disponibilites,
      setDisponibilites,
    }),
    [groupes, disponibilites],
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

  return <FiltersContext.Provider value={context}>{children}</FiltersContext.Provider>;
}

export default FiltersProvider;
