import React from 'react';

const noOp = () => '';

export default React.createContext({
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
