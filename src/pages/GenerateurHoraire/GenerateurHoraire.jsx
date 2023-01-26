import { Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Combinaisons from './Combinaisons/Combinaisons';
import GenerateurHoraireWrapper from './GenerateurHoraire.styles';
import GenerateurHoraireFilters from './GenerateurHoraireFilters/GenerateurHoraireFilters';
import SelectionCours from './SelectionCours/SelectionCours';
import SelectionSessionProgramme from './SelectionSessionProgramme/SelectionSessionProgramme';

function GenerateurHoraire() {
  const { t } = useTranslation('common');

  const ref = useRef(null);
  const leftRef = useRef(null);

  const handleScroll = () => {
    if (ref?.current) {
      const { y } = ref.current.getBoundingClientRect();
      const navbar = document.getElementById('navbar');
      const navbarHeight = navbar.clientHeight;
      const spacing = 8;

      if (leftRef?.current) {
        const element = leftRef.current;
        // Scrolling above appbar
        if (y < navbarHeight - spacing) {
          const mainElement = document.getElementById('main-container');
          const margin = (mainElement.scrollTop - 150) / 8;
          element.style.marginTop = `${margin}rem`;
        } else {
          element.style.marginTop = 0;
        }
      }
    }
  };

  useEffect(() => {
    const element = document.getElementById('main-container');
    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const Selection = (
    <>
      <SelectionSessionProgramme />
      <SelectionCours />
    </>
  );

  return (
    <GenerateurHoraireWrapper>
      <Typography className="title" color="primary" fontWeight={600} variant="h2">{t('generateurHoraire').toUpperCase()}</Typography>
      <GenerateurHoraireFilters />
      <div className="main-content-wrapper" ref={ref}>
        <div className="left" ref={leftRef}>
          {Selection}
        </div>
        <div className="right">
          <Combinaisons />
        </div>
      </div>

    </GenerateurHoraireWrapper>
  );
}

export default GenerateurHoraire;
