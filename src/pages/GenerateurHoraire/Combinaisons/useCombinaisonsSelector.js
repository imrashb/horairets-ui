import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCombinaisons, useLazyGetCombinaisonsQuery } from '../../../features/generateur/generateur.api';
import {
  selectConges, selectCoursObligatoires, selectNombreCours, selectSelectedCours, selectSession,
} from '../../../features/generateur/generateur.slice';

const useCombinaisonsSelector = () => {
  const session = useSelector(selectSession);
  const selectedCours = useSelector(selectSelectedCours);
  const nombreCours = useSelector(selectNombreCours);
  const conges = useSelector(selectConges);
  const coursObligatoires = useSelector(selectCoursObligatoires);
  const { data } = useSelector(selectCombinaisons(
    session,
    selectedCours,
    nombreCours,
    conges,
    coursObligatoires,
  ));

  // Subscribe to cache
  const [trigger] = useLazyGetCombinaisonsQuery();
  useEffect(() => {
    if (data) {
      trigger({
        session, cours: selectedCours, nombreCours, conges, coursObligatoires,
      });
    }
  }, []);

  return data;
};

export default useCombinaisonsSelector;
