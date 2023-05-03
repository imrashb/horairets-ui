import React from 'react';
import { FILTRES_PLANIFICATION } from '../../../generateurHoraire.constants';

const noOp = () => '';

export default React.createContext({
  planification: FILTRES_PLANIFICATION,
  setPlanification: noOp,
  groupes: [],
  setGroupes: noOp,
});
