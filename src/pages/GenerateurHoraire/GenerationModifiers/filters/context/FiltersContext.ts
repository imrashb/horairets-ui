import React from "react";
import { FILTRES_PLANIFICATION } from "../../../generateurHoraire.constants";

export interface FiltersContextType {
  planification: string[];
  setPlanification: (val: string[]) => void;
  groupes: string[];
  setGroupes: (val: string[]) => void;
}

const noOp = () => "";

export default React.createContext<FiltersContextType>({
  planification: FILTRES_PLANIFICATION,
  setPlanification: noOp,
  groupes: [],
  setGroupes: noOp,
});
