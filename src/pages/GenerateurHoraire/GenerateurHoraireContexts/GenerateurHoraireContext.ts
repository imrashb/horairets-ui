import React from 'react';

export interface GenerateurHoraireContextType {
  session: string | null;
  setSession: (val: string | null) => void;
  programmes: string[];
  setProgrammes: (val: string[]) => void;
  cours: string[];
  setCours: (val: string[]) => void;
  nombreCours: number | null;
  setNombreCours: (val: number | null) => void;
  coursObligatoires: string[];
  setCoursObligatoires: (val: string[]) => void;
  conges: string[];
  setConges: (val: string[]) => void;
}

const noOp = () => ''; // Original was () => ''?

export default React.createContext<GenerateurHoraireContextType>({
  session: '',
  setSession: noOp,
  programmes: [],
  setProgrammes: noOp,
  cours: [],
  setCours: noOp,
  nombreCours: 0,
  setNombreCours: noOp,
  coursObligatoires: [],
  setCoursObligatoires: noOp,
  conges: [],
  setConges: noOp,
});
