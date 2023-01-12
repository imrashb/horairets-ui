import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { GridView, ViewList } from '@mui/icons-material';
import {
  FormControl, MenuItem, Select, Tooltip, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import GenerateurHoraireFiltersWrapper from './GenerateurHoraireFilters.styles';

const GRID_VIEW = 'grid';
const LIST_VIEW = 'list';

function GenerateurHoraireFilters() {
  const { t } = useTranslation('common');

  const [view, setView] = useState(LIST_VIEW);

  const handleAlignment = (event, value) => {
    setView(value);
  };

  return (
    <GenerateurHoraireFiltersWrapper>
      <ToggleButtonGroup
        className="views-wrapper"
        value={view}
        exclusive
        onChange={handleAlignment}
      >
        <ToggleButton value={LIST_VIEW} size="small">
          <Tooltip title={t('affichageListe')}>
            <ViewList />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value={GRID_VIEW} size="small">
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
