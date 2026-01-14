import { useAtom, useAtomValue } from 'jotai';
import React, { useEffect, useMemo } from 'react';
import {
  activeGenerateurConfigAtom,
  formGenerateurConfigAtom,
} from '../../../features/generateur/generateurAtoms';
import GenerateurHoraireContext from './GenerateurHoraireContext';
import { areArraysSame } from '../../../utils/Array.utils';

interface GenerateurHoraireProviderProps {
  children?: React.ReactNode;
}

function GenerateurHoraireProvider({ children }: GenerateurHoraireProviderProps): JSX.Element {
  const [formConfig, setFormConfig] = useAtom(formGenerateurConfigAtom);
  const currentActiveConfig = useAtomValue(activeGenerateurConfigAtom);

  useEffect(() => {
    if (currentActiveConfig?.session) {
      setFormConfig((prev) => ({
        ...prev,
        ...structuredClone(currentActiveConfig),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    session, programmes, cours, nombreCours, coursObligatoires, conges,
  } = formConfig;

  const context = useMemo(() => {
    const setSession = (val: string | null) => setFormConfig((prev) => {
      if (prev.session === val) return prev;
      return {
        ...prev,
        session: val,
        cours: [],
        coursObligatoires: [],
      };
    });
    const setProgrammes = (val: string[]) => setFormConfig((prev) => {
      if (areArraysSame(prev.programmes, val)) return prev;
      return {
        ...prev,
        programmes: val,
        cours: [],
        coursObligatoires: [],
      };
    });
    const setCours = (val: string[]) => setFormConfig((prev) => ({ ...prev, cours: val }));
    const setNombreCours = (val: number | null) => setFormConfig((prev) => ({ ...prev, nombreCours: val }));
    const setCoursObligatoires = (val: string[]) => setFormConfig((prev) => ({
      ...prev,
      coursObligatoires: val,
    }));
    const setConges = (val: string[]) => setFormConfig((prev) => ({ ...prev, conges: val }));

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
  }, [session, programmes, cours, nombreCours, coursObligatoires, conges, setFormConfig]);

  return (
    <GenerateurHoraireContext.Provider value={context}>
      {children}
    </GenerateurHoraireContext.Provider>
  );
}

export default GenerateurHoraireProvider;
