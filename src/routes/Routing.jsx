import { Routes, Route } from 'react-router-dom';
import GenerateurHoraire from '../pages/GenerateurHoraire/GenerateurHoraire';
import Home from '../pages/Home/Home';
import Favoris from '../pages/Favoris/Favoris';
import { FAVORIS_URL, GENERATEUR_HORAIRE_URL, PROFIL_URL } from './Routes.constants';
import Profile from '../pages/Profile/Profile';

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path={GENERATEUR_HORAIRE_URL} element={<GenerateurHoraire />} />
      <Route path={FAVORIS_URL} element={<Favoris />} />
      <Route path={PROFIL_URL} element={<Profile />} />
    </Routes>
  );
}

export default Routing;
