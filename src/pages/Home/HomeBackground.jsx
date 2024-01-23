import React, { useMemo } from 'react';
import CombinaisonHoraire from '../../components/CombinaisonHoraire/CombinaisonHoraire';
import HOME_BACKGROUND_HORAIRES from './HomeBackground.constants';
import HomeBackgroundWrapper from './HomeBackground.styles';

function HomeBackground(props) {
  const { fixed = true } = props;
  const MemoizedBackground = useMemo(() => HOME_BACKGROUND_HORAIRES.slice(0, 25).map((comb) => (
    <CombinaisonHoraire
      combinaison={comb}
      disableHeures
      disableNomJours
      forceLegacyColors
    />
  )), []);

  return (
    <HomeBackgroundWrapper fixed={fixed} className="home-background-wrapper">
      <div className="opacity-gradient" />
      <div className="wrapper-home-background">
        {MemoizedBackground}
      </div>
    </HomeBackgroundWrapper>
  );
}

export default HomeBackground;
