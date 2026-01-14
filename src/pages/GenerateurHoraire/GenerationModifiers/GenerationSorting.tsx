import { Check, Sort } from '@mui/icons-material';
import {
  Button, ListItemIcon, ListItemText, Menu, MenuItem,
} from '@mui/material';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sortingAtom } from '../../../features/generateur/generateurAtoms';
import { COMBINAISONS_SORTS } from '../generateurHoraire.sorting';

function GenerationSorting(): JSX.Element {
  const { t } = useTranslation('common');
  const [sorting, setSorting] = useAtom(sortingAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    setSorting(value);
    handleClose();
  };

  return (
    <div className="sort-wrapper">
      <Button
        id="sort-button"
        aria-controls={open ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        color="inherit"
        startIcon={<Sort />}
        onClick={handleClick}
      >
        {t('trier')}
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sort-button',
        }}
      >
        {Object.keys(COMBINAISONS_SORTS).map((value) => (
          <MenuItem key={value} selected={value === sorting} onClick={() => handleSelect(value)}>
            <ListItemIcon>{value === sorting && <Check fontSize="small" />}</ListItemIcon>
            <ListItemText>{t(value)}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default GenerationSorting;
