import { useContext } from 'react';
import GenerateurHoraireContext from '../GenerateurHoraireContext';

const useGenerateurHoraire = () => useContext(GenerateurHoraireContext);

export default useGenerateurHoraire;
