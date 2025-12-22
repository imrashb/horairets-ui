import React, { useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import {
  congesAtom,
  coursObligatoiresAtom, nombreCoursAtom, programmeAtom, selectedCoursAtom, sessionAtom,
} from '../../../features/generateur/generateurAtoms';
import GenerateurHoraireContext from './GenerateurHoraireContext';

function GenerateurHoraireProvider({ children }) {
  // Get current generateur values
  const currentSession = useAtomValue(sessionAtom);
  const currentProgramme = useAtomValue(programmeAtom);
  const currentCours = useAtomValue(selectedCoursAtom);
  const currentNombreCours = useAtomValue(nombreCoursAtom);
  const currentCoursObligatoires = useAtomValue(coursObligatoiresAtom);
  const currentConges = useAtomValue(congesAtom);

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
