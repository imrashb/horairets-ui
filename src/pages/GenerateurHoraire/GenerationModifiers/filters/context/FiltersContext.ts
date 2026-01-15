import React from 'react';
import { getDefaultDisponibilites } from '../../../../../utils/Disponibilites.utils';
import { DisponibiliteMap } from '../../../generateurHoraire.constants';

export interface FiltersContextType {
  groupes: string[];
  setGroupes: (val: string[]) => void;
  disponibilites: DisponibiliteMap;
  setDisponibilites: (val: DisponibiliteMap) => void;
}

const noOp = () => '';

export default React.createContext<FiltersContextType>({
  groupes: [],
  setGroupes: noOp,
  disponibilites: getDefaultDisponibilites(),
  setDisponibilites: noOp,
});
