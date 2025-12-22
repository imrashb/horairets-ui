import { Sort } from '@mui/icons-material';
import {
  FormControl, InputLabel, MenuItem, Select, Typography, useMediaQuery,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { useTheme } from 'styled-components';
import { sortingAtom } from '../../../features/generateur/generateurAtoms';
import { COMBINAISONS_SORTS } from '../generateurHoraire.sorting';
import ButtonDialog from '../../../components/ButtonDialog/ButtonDialog';

function GenerationSorting() {
  const { t } = useTranslation('common');
  const [sorting, setSorting] = useAtom(sortingAtom);

  const theme = useTheme();
  const isMediumViewport = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className="sort-wrapper">
      {!isMediumViewport ? (
        <>
          <Typography className="sort-text" variant="h5" component="div">{t('trierPar')}</Typography>
          <FormControl className="sort-dropdown">
            <Select
              size="small"
              variant="outlined"
              value={sorting}
              onChange={(e) => setSorting(e?.target?.value)}
            >
              {Object.keys(COMBINAISONS_SORTS).map(
                (value) => (<MenuItem key={value} value={value}>{t(value)}</MenuItem>),
              )}
            </Select>
          </FormControl>
        </>

      )
        : (
          <ButtonDialog title={t('trier')} icon={<Sort />} onClose={() => { }}>
            <FormControl fullWidth variant="standard">
              <InputLabel>{t('trierPar')}</InputLabel>
              <Select
                value={sorting}
                onChange={(e) => setSorting(e?.target?.value)}
                label={t('trierPar')}
              >
                {Object.keys(COMBINAISONS_SORTS).map(
                  (value) => (<MenuItem key={value} value={value}>{t(value)}</MenuItem>),
                )}
              </Select>
            </FormControl>

          </ButtonDialog>
        )}
    </div>
  );
}

export default GenerationSorting;
