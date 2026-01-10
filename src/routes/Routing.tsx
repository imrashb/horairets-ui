import { Route, Routes } from "react-router-dom";
import Favoris from "../pages/Favoris/Favoris";
import GenerateurHoraire from "../pages/GenerateurHoraire/GenerateurHoraire";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import { FAVORIS_URL, GENERATEUR_HORAIRE_URL, PROFILE_URL } from "./Routes.constants";

function Routing(): JSX.Element {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path={GENERATEUR_HORAIRE_URL} element={<GenerateurHoraire />} />
      <Route path={FAVORIS_URL} element={<Favoris />} />
      <Route path={PROFILE_URL} element={<Profile />} />
    </Routes>
  );
}

export default Routing;

