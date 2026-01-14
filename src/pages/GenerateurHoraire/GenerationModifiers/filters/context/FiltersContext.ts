import React from 'react';

export interface FiltersContextType {
  groupes: string[];
  setGroupes: (val: string[]) => void;
  disponibilites: boolean[][];
  setDisponibilites: (val: boolean[][]) => void;
}

const noOp = () => '';

export default React.createContext<FiltersContextType>({
  groupes: [],
  setGroupes: noOp,
  disponibilites: Array.from({ length: 7 }, () => [true, true, true]),
  setDisponibilites: noOp,
});
