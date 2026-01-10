import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AppLayout from "../components/Layout/AppLayout";
import Favoris from "../pages/Favoris/Favoris";
import GenerateurHoraire from "../pages/GenerateurHoraire/GenerateurHoraire";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import {
  FAVORIS_URL,
  GENERATEUR_HORAIRE_URL,
  PROFILE_URL,
} from "./Routes.constants";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="*" element={<Home />} />
      <Route path={GENERATEUR_HORAIRE_URL} element={<GenerateurHoraire />} />
      <Route path={FAVORIS_URL} element={<Favoris />} />
      <Route path={PROFILE_URL} element={<Profile />} />
    </Route>
  )
);

export default router;
