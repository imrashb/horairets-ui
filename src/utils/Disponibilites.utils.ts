import isEqual from 'lodash/isEqual';
import { DisponibiliteMap, Jour, Periode } from '../pages/GenerateurHoraire/generateurHoraire.constants';

export const getDefaultDisponibilites = (): DisponibiliteMap => Object.values(Jour).reduce((acc, jour) => {
  acc[jour] = Object.values(Periode);
  return acc;
}, {} as DisponibiliteMap);

export const isCustomDisponibilites = (disponibilites: DisponibiliteMap): boolean => !isEqual(disponibilites, getDefaultDisponibilites());
