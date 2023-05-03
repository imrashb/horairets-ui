import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import FiltersContext from './FiltersContext';
import { selectFilterGroupes, selectFilterPlanification } from '../../../../../features/generateur/generateur.slice';

function FiltersProvider({ children }) {
  const currentPlanification = useSelector(selectFilterPlanification);
  const currentGroupes = useSelector(selectFilterGroupes);

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
      { children }
    </FiltersContext.Provider>
  );
}

export default FiltersProvider;
