import { useContext } from "react";
import FiltersContext, { FiltersContextType } from "./FiltersContext";

const useFilters = (): FiltersContextType => useContext(FiltersContext);

export default useFilters;
