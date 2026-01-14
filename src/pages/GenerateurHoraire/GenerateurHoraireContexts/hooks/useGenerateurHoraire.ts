import { useContext } from 'react';
import GenerateurHoraireContext, {
  GenerateurHoraireContextType,
} from '../GenerateurHoraireContext';

const useGenerateurHoraire = (): GenerateurHoraireContextType => useContext(GenerateurHoraireContext);

export default useGenerateurHoraire;
