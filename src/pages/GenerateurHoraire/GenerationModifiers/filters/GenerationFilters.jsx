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
import { useDispatch } from 'react-redux';
import styled, { useTheme } from 'styled-components';
import {
  setFilters,
} from '../../../../features/generateur/generateur.slice';
import PlanificationSeanceFilter from './PlanificationSeanceFilter';
import useFilters from './context/useFilters';
import GroupesFilter from './GroupesFilter';

function GenerationFilters() {
  const { t } = useTranslation('common');
  const [filterDialogVisible, setFilterDialogVisible] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!isSmallViewport) {
      setFilterDialogVisible(false);
    }
  }, [isSmallViewport]);

  const { planification, groupes } = useFilters();

  const handleClose = () => {
    setFilterDialogVisible(false);
    dispatch(setFilters({
      planification,
      groupes,
    }));
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
          <DialogContentWrapper>
            <PlanificationSeanceFilter />
            <GroupesFilter />
          </DialogContentWrapper>
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

const DialogContentWrapper = styled.div`
  
    & > * {
      &:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.sizes.size_16};
      }
    }  

  `;

export default GenerationFilters;
