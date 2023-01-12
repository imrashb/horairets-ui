import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import {
  ListItemButton, ListItemIcon, TextField, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, SwapHoriz } from '@mui/icons-material';
import CoursTransferListWrapper from './CoursTransferList.styles';

export default function CoursTransferList() {
  const { t } = useTranslation('common');

  const [left, setLeft] = useState(['LOG100', 'LOG121', 'LOG240', 'LOG320']);
  const [right, setRight] = useState(['MAT472', 'MAT350', 'LOG710', 'LOG745']);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [unselectedFilter, setUnselectedFilter] = useState('');

  const handleToggle = (value) => {
    if (left.includes(value)) {
      setLeft(left.filter((v) => v !== value));
      setRight([...right, value]);
      setUnselectedFilter('');
    } else {
      setRight(right.filter((v) => v !== value));
      setLeft([...left, value]);
      setSelectedFilter('');
    }
  };

  const handleFilterChange = (event, setState) => {
    setState(event?.target?.value);
  };

  const customList = (items, listName, icon, filter, setFilter) => {
    const filteredItems = filter ? items.filter(
      (i) => i.toLowerCase().includes(filter.toLowerCase()),
    ) : items;

    return (
      <Paper className="selection-list">
        <Typography>{listName}</Typography>
        <TextField value={filter} label={t('filtrerSigle')} variant="standard" onChange={(event) => handleFilterChange(event, setFilter)} />
        <List dense component="div" role="list">
          {filteredItems.sort().map((value) => (
            <ListItemButton disableGutters divider key={value} onClick={() => handleToggle(value)}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={value} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    );
  };

  return (
    <CoursTransferListWrapper>
      {customList(left, t('coursDisponibles'), <ChevronRight />, unselectedFilter, setUnselectedFilter)}
      <SwapHoriz className="swap-icon" />
      {customList(right, t('coursSelectionnes'), <ChevronLeft />, selectedFilter, setSelectedFilter)}
    </CoursTransferListWrapper>
  );
}
