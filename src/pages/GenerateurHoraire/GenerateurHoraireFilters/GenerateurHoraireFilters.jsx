import React from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { GridView, ViewList } from '@mui/icons-material';
import {
  FormControl, MenuItem, Select, Tooltip, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import GenerateurHoraireFiltersWrapper from './GenerateurHoraireFilters.styles';
import { selectView, setView } from '../../../features/generateur/generateur.slice';
import { GENERATEUR_GRID_VIEW, GENERATEUR_LIST_VIEW } from '../../../features/generateur/generateur.constants';

function GenerateurHoraireFilters() {
  const { t } = useTranslation('common');
  const view = useSelector(selectView);
  const dispatch = useDispatch();

  const handleAlignment = (event, value) => {
    dispatch(setView(value));
  };

  return (
    <GenerateurHoraireFiltersWrapper>
      <ToggleButtonGroup
        className="views-wrapper"
        value={view}
        exclusive
        onChange={handleAlignment}
      >
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
      <div className="sort-wrapper">
        <Typography className="sort-text" variant="h5" component="div">{t('trierPar')}</Typography>
        <FormControl className="sort-dropdown">
          <Select
            size="small"
            variant="outlined"
            value={10}
          >
            <MenuItem value={10}>Lorem ipsum</MenuItem>
          </Select>
        </FormControl>
      </div>
    </GenerateurHoraireFiltersWrapper>
  );
}

export default GenerateurHoraireFilters;
