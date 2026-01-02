import React, { useEffect, useMemo } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  activeGenerateurConfigAtom,
  formGenerateurConfigAtom,
} from '../../../features/generateur/generateurAtoms';
import GenerateurHoraireContext from './GenerateurHoraireContext';

function GenerateurHoraireProvider({ children }) {
  const [formConfig, setFormConfig] = useAtom(formGenerateurConfigAtom);
  const currentActiveConfig = useAtomValue(activeGenerateurConfigAtom);

  useEffect(() => {
    if (currentActiveConfig) {
      setFormConfig((prev) => ({ ...prev, ...(structuredClone(currentActiveConfig)) }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  const {
    session,
    programmes,
    cours,
    nombreCours,
    coursObligatoires,
    conges,
  } = formConfig;

  const context = useMemo(() => {
    const setSession = (val) => setFormConfig((prev) => ({ ...prev, session: val }));
    const setProgrammes = (val) => setFormConfig((prev) => ({ ...prev, programmes: val }));
    const setCours = (val) => setFormConfig((prev) => ({ ...prev, cours: val }));
    const setNombreCours = (val) => setFormConfig((prev) => ({ ...prev, nombreCours: val }));
    const setCoursObligatoires = (val) => setFormConfig((prev) => ({
      ...prev, coursObligatoires: val,
    }));
    const setConges = (val) => setFormConfig((prev) => ({ ...prev, conges: val }));

    return {
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
    };
  }, [
    session, programmes, cours, nombreCours, coursObligatoires, conges, setFormConfig,
  ]);

  return (
    <GenerateurHoraireContext.Provider value={context}>
      {children}
    </GenerateurHoraireContext.Provider>
  );
}

export default GenerateurHoraireProvider;
