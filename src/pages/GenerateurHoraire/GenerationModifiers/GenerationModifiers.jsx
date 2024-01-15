import React, { useEffect } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { GridView, ViewList } from '@mui/icons-material';
import { Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import GenerationModifiersWrapper from './GenerationModifiers.styles';
import { selectView, setView } from '../../../features/generateur/generateur.slice';
import { GENERATEUR_GRID_VIEW, GENERATEUR_LIST_VIEW } from '../../../features/generateur/generateur.constants';
import GenerationSorting from './GenerationSorting';
import GenerationFilters from './filters/GenerationFilters';
import FiltersProvider from './filters/context/FiltersProvider';
import AffichageCombinaisons from './affichage/AffichageCombinaisons';

function GenerationModifiers({ title }) {
  const { t } = useTranslation('common');
  const view = useSelector(selectView);
  const dispatch = useDispatch();

  const handleAlignment = (event, value) => {
    if (value) dispatch(setView(value));
  };

  const theme = useTheme();
  const isLargeViewport = useMediaQuery(theme.breakpoints.up('lg'));
  useEffect(() => {
    if (!isLargeViewport) {
      dispatch(setView(GENERATEUR_LIST_VIEW));
    }
  }, [isLargeViewport]);

  return (
    <GenerationModifiersWrapper>
      {isLargeViewport && (
        <ToggleButtonGroup className="views-wrapper" value={view} exclusive onChange={handleAlignment}>
          <ToggleButton value={GENERATEUR_LIST_VIEW} size="small">
            <Tooltip title={t('affichageListe')}>
              <ViewList />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={GENERATEUR_GRID_VIEW} size="small">
            <Tooltip title={t('affichageGrille')}>
              <GridView />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      )}
      <GenerationSorting />
      <GenerationFilters />
      <FiltersProvider>
        <GenerationFilters />
      </FiltersProvider>
      <AffichageCombinaisons />

      {title && (
        <Typography className="nb-horaires-generes" variant="h5">
          {title}
        </Typography>
      )}
    </GenerationModifiersWrapper>
  );
}

export default GenerationModifiers;
