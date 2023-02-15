import { Sort } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl, InputLabel, MenuItem, Select, Typography, useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { selectSorting, setSorting } from '../../../features/generateur/generateur.slice';
import { COMBINAISONS_SORTS } from '../generateurHoraire.sorting';

function GenerationSorting() {
  const { t } = useTranslation('common');
  const sorting = useSelector(selectSorting);
  const [sortDialogVisible, setSortDialogVisible] = useState(false);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMediumViewport = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <div className="sort-wrapper">
        {!isMediumViewport ? (
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
                  (value) => (<MenuItem key={value} value={value}>{t(value)}</MenuItem>),
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

      <Dialog fullWidth open={sortDialogVisible}>
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
                (value) => (<MenuItem key={value} value={value}>{t(value)}</MenuItem>),
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
    </>
  );
}

export default GenerationSorting;
