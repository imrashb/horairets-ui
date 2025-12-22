import { atom } from 'jotai';

const affichageAtom = atom({
  showNomCoursGroupe: true,
  showLocaux: true,
  showNomActivite: true,
  showUniqueCoursColors: true,
  showModeEnseignement: false,
  showEnseignant: false,
});

export default affichageAtom;
