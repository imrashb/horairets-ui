import { FilterList } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl, InputLabel, MenuItem, Select, useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { selectPlanification, setPlanification } from '../../../features/generateur/generateur.slice';
import { FILTRES_PLANIFICATION } from '../generateurHoraire.constants';

function GenerationFilters() {
  const { t } = useTranslation('common');
  const filtres = useSelector(selectPlanification);
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!isSmallViewport) {
      setFilterDialogVisible(false);
    }
  }, [isSmallViewport]);

  return (
    <>
      <div className="sort-wrapper">
        <Button
          variant="contained"
          onClick={() => setFilterDialogVisible(true)}
        >
          {t('filtrer')}
          {' '}
          <FilterList />
        </Button>
      </div>

      <Dialog fullWidth open={filterDialogVisible}>
        <DialogTitle sx={{ alignItems: 'center', display: 'flex' }}>
          {t('filtrer')}
          <FilterList />
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth variant="standard">
            <InputLabel>{t('planificationSeances')}</InputLabel>
            <Select
              multiple
              value={filtres}
              onChange={(e) => dispatch(setPlanification(e?.target?.value))}
              label={t('trierPar')}
            >
              {FILTRES_PLANIFICATION.map(
                (value) => (<MenuItem key={value} value={value}>{t(value)}</MenuItem>),
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => setFilterDialogVisible(false)}
          >
            {t('fermer')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GenerationFilters;
