import { Routes, Route } from 'react-router-dom';
import GenerateurHoraire from '../pages/GenerateurHoraire/GenerateurHoraire';
import Home from '../pages/Home/Home';

const GENERATEUR_HORAIRE_URL = '/generateur';

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path={GENERATEUR_HORAIRE_URL} element={<GenerateurHoraire />} />
    </Routes>
  );
}

export default Routing;
