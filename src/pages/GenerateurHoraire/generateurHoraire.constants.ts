// eslint-disable-next-line import/prefer-default-export
export const MAITRISE = 'MAITRISE';
export const NOMBRE_MAX_COURS = 15;
export const NOMBRE_MAX_COURS_PAR_HORAIRE = 6;

export enum Jour {
  DIMANCHE = 'DIMANCHE',
  LUNDI = 'LUNDI',
  MARDI = 'MARDI',
  MERCREDI = 'MERCREDI',
  JEUDI = 'JEUDI',
  VENDREDI = 'VENDREDI',
  SAMEDI = 'SAMEDI',
}

export const JOURS = Object.values(Jour);

// Filtres
export enum Periode {
  MATIN = 'matin',
  APRES_MIDI = 'apresmidi',
  SOIR = 'soir',
}

export const FILTRES_PLANIFICATION = Object.values(Periode);

export type DisponibiliteMap = Record<Jour, Periode[]>;
