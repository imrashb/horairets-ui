import { FilterList } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { selectFilterPlanification, setPlanification } from '../../../../features/generateur/generateur.slice';
import { areArraysSame } from '../../../../utils/Array.utils';
import PlanificationSeanceFilter from './PlanificationSeanceFilter';

function GenerationFilters() {
  const { t } = useTranslation('common');
  const planification = useSelector(selectFilterPlanification);
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!isSmallViewport) {
      setFilterDialogVisible(false);
    }
  }, [isSmallViewport]);

  const [controlledPlanification, setControlledPlanification] = useState(planification);

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
          <PlanificationSeanceFilter onChange={
            (p) => setControlledPlanification(p)
          }
          />
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
