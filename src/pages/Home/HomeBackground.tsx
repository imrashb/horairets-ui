import React, { useMemo } from "react";
import CombinaisonHoraire from "../../components/CombinaisonHoraire/CombinaisonHoraire";
import { Combinaison } from "../../features/generateur/generateur.types";
import HOME_BACKGROUND_HORAIRES from "./HomeBackground.constants";
import HomeBackgroundWrapper from "./HomeBackground.styles";

function HomeBackground(): JSX.Element {
  const MemoizedBackground = useMemo(
    () =>
      // Cast input to Combinaison[] if the constant file isn't perfectly typed yet, or rely on TS inference if we fix the constant file
      (HOME_BACKGROUND_HORAIRES as unknown as Combinaison[])
        .slice(0, 25)
        .map((comb) => (
          <CombinaisonHoraire
            key={comb.uniqueId}
            combinaison={comb}
            disableHeures
            disableLocaux
            disableNomActivite
            disableNomCours
            disableNomJours
            forceLegacyColors
          />
        )),
    []
  );

  return (
    <HomeBackgroundWrapper className="home-background-wrapper">
      <div className="opacity-gradient" />
      <div className="wrapper-home-background">{MemoizedBackground}</div>
    </HomeBackgroundWrapper>
  );
}

export default HomeBackground;
