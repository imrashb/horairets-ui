import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectConges,
  selectCoursObligatoires, selectNombreCours, selectProgramme, selectSelectedCours, selectSession,
} from '../../../features/generateur/generateur.slice';
import GenerateurHoraireContext from './GenerateurHoraireContext';

function GenerateurHoraireProvider({ children }) {
  // Get current generateur values
  const currentSession = useSelector(selectSession);
  const currentProgramme = useSelector(selectProgramme);
  const currentCours = useSelector(selectSelectedCours);
  const currentNombreCours = useSelector(selectNombreCours);
  const currentCoursObligatoires = useSelector(selectCoursObligatoires);
  const currentConges = useSelector(selectConges);

  const [session, setSession] = useState(currentSession);
  const [programmes, setProgrammes] = useState(currentProgramme);
  const [cours, setCours] = useState(currentCours || []);
  const [nombreCours, setNombreCours] = useState(currentNombreCours);
  const [coursObligatoires, setCoursObligatoires] = useState(currentCoursObligatoires);
  const [conges, setConges] = useState(currentConges);

  const context = useMemo(() => ({
    session,
    setSession,
    programmes,
    setProgrammes,
    cours,
    setCours,
    nombreCours,
    setNombreCours,
    coursObligatoires,
    setCoursObligatoires,
    conges,
    setConges,
  }), [session, programmes, cours, nombreCours, coursObligatoires, conges]);

  return (
    <GenerateurHoraireContext.Provider value={context}>
      {children}
    </GenerateurHoraireContext.Provider>
  );
}

export default GenerateurHoraireProvider;
