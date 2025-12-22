import React, { useEffect, useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { selectFilterGroupesAtom, selectFilterPlanificationAtom } from '../../../../../features/generateur/generateurAtoms';
import FiltersContext from './FiltersContext';

function FiltersProvider({ children }) {
  const currentPlanification = useAtomValue(selectFilterPlanificationAtom);
  const currentGroupes = useAtomValue(selectFilterGroupesAtom);

  const [planification, setPlanification] = useState(currentPlanification);
  const [groupes, setGroupes] = useState(currentGroupes);

  const context = useMemo(() => ({
    planification,
    setPlanification,
    groupes,
    setGroupes,
  }), [groupes, planification]);

  useEffect(() => {
    if (currentGroupes) { setGroupes(currentGroupes); }
  }, [currentGroupes]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FiltersContext.Provider value={context}>
      {children}
    </FiltersContext.Provider>
  );
}

export default FiltersProvider;
