import React, { useMemo } from 'react';
import CombinaisonHoraire from '../CombinaisonHoraire/CombinaisonHoraire';
import { Combinaison } from '../../features/generateur/generateur.types';
import HOME_BACKGROUND_HORAIRES from '../../pages/Home/HomeBackground.constants';

interface ScheduleGridProps {
  count?: number;
}

function ScheduleGrid({ count = 25 }: ScheduleGridProps): JSX.Element {
  const schedules = useMemo(
    () => (HOME_BACKGROUND_HORAIRES as unknown as Combinaison[])
      .slice(0, count)
      .map((comb) => (
        <CombinaisonHoraire
          key={comb.uniqueId}
          combinaison={comb}
          disableHeures
          disableLocaux
          disableNomActivite
          disableNomCours
          disableNomJours
          forceLegacyColors
        />
      )),
    [count],
  );

  return <>{schedules}</>;
}

export default ScheduleGrid;
