import { atom } from "jotai";

export interface AffichageOptions {
  showNomCoursGroupe: boolean;
  showLocaux: boolean;
  showNomActivite: boolean;
  showUniqueCoursColors: boolean;
  showModeEnseignement: boolean;
  showEnseignant: boolean;
}

const affichageAtom = atom<AffichageOptions>({
  showNomCoursGroupe: true,
  showLocaux: true,
  showNomActivite: true,
  showUniqueCoursColors: true,
  showModeEnseignement: false,
  showEnseignant: false,
});

export default affichageAtom;
