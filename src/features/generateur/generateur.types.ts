export interface Horaire {
  jour: string;
  heureDepart: number;
  heureFin: number;
}

export interface Activite {
  horaire: Horaire;
  modeEnseignement: string;
  charges: string[];
  nom: string;
  locaux: string[];
}

export interface Cours {
  sigle: string;
  credits: number;
  titre: string;
  programmes?: string[];
}

export interface Groupe {
  cours: Cours;
  numeroGroupe: string | number;
  activites: Activite[];
}

export interface Combinaison {
  groupes: Groupe[];
  uniqueId: string;
  conges?: string[]; // Optional or required depending on usage
}

export interface GenerateurConfig {
  cours: string[]; // Sigles?
  nombreCours: number | null;
  conges: string[];
  coursObligatoires: string[];
  session: string | null;
  programmes: string[];
}

export interface Filters {
  planification: string[];
  groupes: string[];
  disponibilites: boolean[][];
}
