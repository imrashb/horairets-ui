import React, { useEffect, useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { GridView, Sort, ViewList } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl, InputLabel, MenuItem, Select, Tooltip, Typography, useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import GenerateurHoraireFiltersWrapper from './GenerateurHoraireFilters.styles';
import {
  selectSorting,
  selectView,
  setSorting,
  setView,
} from '../../../features/generateur/generateur.slice';
import { GENERATEUR_GRID_VIEW, GENERATEUR_LIST_VIEW } from '../../../features/generateur/generateur.constants';
import { COMBINAISONS_SORTS } from '../generateurHoraire.sorting';
import useCombinaisonsSelector from '../Combinaisons/useCombinaisonsSelector';

function GenerateurHoraireFilters() {
  const { t } = useTranslation('common');
  const view = useSelector(selectView);
  const sorting = useSelector(selectSorting);
  const data = useCombinaisonsSelector();
  const [sortDialogVisible, setSortDialogVisible] = useState(false);
  const dispatch = useDispatch();

  const handleAlignment = (event, value) => {
    dispatch(setView(value));
  };

  const theme = useTheme();
  const isLargeViewport = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    if (!isLargeViewport) {
      dispatch(setView(GENERATEUR_LIST_VIEW));
    }
  }, [isLargeViewport]);

  useEffect(() => {
    if (!isSmallViewport) {
      setSortDialogVisible(false);
    }
  }, [isSmallViewport]);

  return (
    <GenerateurHoraireFiltersWrapper>
      {isLargeViewport && (
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
      )}
      <div className="sort-wrapper">
        {!isSmallViewport ? (
          <>
            <Typography className="sort-text" variant="h5" component="div">{t('trierPar')}</Typography>
            <FormControl className="sort-dropdown">
              <Select
                size="small"
                variant="outlined"
                value={sorting}
                onChange={(e) => dispatch(setSorting(e?.target?.value))}
              >
                {Object.keys(COMBINAISONS_SORTS).map(
                  (value) => (<MenuItem value={value}>{t(value)}</MenuItem>),
                )}
              </Select>
            </FormControl>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={() => setSortDialogVisible(true)}
          >
            {t('trier')}
            {' '}
            <Sort />
          </Button>
        )}
      </div>

      <Dialog open={sortDialogVisible}>
        <DialogTitle sx={{ alignItems: 'center', display: 'flex' }}>
          {t('trier')}
          <Sort />
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="standard">
            <InputLabel>{t('trierPar')}</InputLabel>
            <Select
              value={sorting}
              onChange={(e) => dispatch(setSorting(e?.target?.value))}
              label={t('trierPar')}
            >
              {Object.keys(COMBINAISONS_SORTS).map(
                (value) => (<MenuItem value={value}>{t(value)}</MenuItem>),
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setSortDialogVisible(false)}
          >
            {t('fermer')}
          </Button>
        </DialogActions>
      </Dialog>

      {data && (
      <Typography className="nb-horaires-generes" variant="h5">
        {t('horairesGeneres', { count: data?.length })}
      </Typography>
      )}
    </GenerateurHoraireFiltersWrapper>
  );
}

export default GenerateurHoraireFilters;
