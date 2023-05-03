import { useContext } from 'react';
import FiltersContext from './FiltersContext';

const useFilters = () => useContext(FiltersContext);

export default useFilters;
