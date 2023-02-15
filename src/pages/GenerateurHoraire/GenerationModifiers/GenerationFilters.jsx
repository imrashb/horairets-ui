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

const areArraysSame = (a, b) => a?.length === b?.length
  && a?.every((v) => b?.includes(v));

function GenerationFilters() {
  const { t } = useTranslation('common');
  const planification = useSelector(selectPlanification);
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const [controlledPlanification, setControlledPlanification] = useState(planification);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!isSmallViewport) {
      setFilterDialogVisible(false);
    }
  }, [isSmallViewport]);

  const handleClose = () => {
    setFilterDialogVisible(false);

    if (!areArraysSame(controlledPlanification, planification)) {
      dispatch(setPlanification(controlledPlanification));
    }
  };

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
              value={controlledPlanification}
              onChange={(e) => setControlledPlanification(e?.target?.value)}
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
            onClick={handleClose}
          >
            {t('appliquerParametres')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GenerationFilters;
