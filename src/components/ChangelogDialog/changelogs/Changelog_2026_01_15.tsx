/* eslint-disable react/no-unescaped-entities */
import { Typography } from '@mui/material';
import React from 'react';

// eslint-disable-next-line camelcase
function Changelog_2026_01_15(): JSX.Element {
  return (
    <>
      <Typography
        className="section-title"
      >
        ✨ Vue Chronologique
      </Typography>
      <ul>
        <li>
          📅
          Visualisez votre cheminement année par année avec la nouvelle vue chronologique
        </li>
        <li>
          ℹ️
          Cliquez sur un cours dans la vue chronologique pour accéder aux informations, au plan de cours et à la description du cours sur le site de l'ÉTS
        </li>
      </ul>

      <Typography className="section-title">⭐ Améliorations</Typography>
      <ul>
        <li>
          🔍
          Nouvelle barre de recherche disponible dans les vues "Par session" et "Chronologique" pour retrouver facilement vos cours
        </li>
        <li>
          ⚙️
          Transition de "Congés" vers "Disponibilités" pour avoir de meilleurs filtres
        </li>
      </ul>
    </>
  );
}

// eslint-disable-next-line camelcase
export default Changelog_2026_01_15;
