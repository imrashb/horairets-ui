/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import {
  ListItemButton, ListItemIcon, TextField, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, SwapHoriz } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import CoursTransferListWrapper from './CoursTransferList.styles';
import { selectCoursSession } from '../../../features/generateur/generateur.api';
import { selectProgramme, selectSession } from '../../../features/generateur/generateur.slice';
import { MAITRISE } from '../generateurHoraire.constants';

export default function CoursTransferList({ includeMaitrise, onSelectedCoursChange }) {
  const { t } = useTranslation('common');

  console.log(includeMaitrise);
  const programme = useSelector(selectProgramme);
  const session = useSelector(selectSession);

  const coursSessionQuery = useSelector(selectCoursSession(session, programme));

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [unselectedFilter, setUnselectedFilter] = useState('');

  useEffect(() => {
    if (coursSessionQuery?.data) {
      setLeft(coursSessionQuery?.data);
      setRight([]);
      setSelectedFilter('');
      setUnselectedFilter('');
    }
  }, [coursSessionQuery?.data]);

  const handleToggle = (value) => {
    const isLeft = left.find((v) => v?.sigle === value?.sigle);

    let modifiedLeft;
    let modifiedRight;

    if (isLeft) {
      modifiedLeft = left.filter((v) => v !== value);
      modifiedRight = [...right, value];
    } else {
      modifiedRight = right.filter((v) => v !== value);
      modifiedLeft = [...left, value];
    }
    setLeft(modifiedLeft);
    setRight(modifiedRight);

    if (onSelectedCoursChange) {
      onSelectedCoursChange(modifiedRight);
    }
  };

  const handleFilterChange = (event, setState) => {
    setState(event?.target?.value);
  };

  const customList = (items, listName, icon, filter, setFilter) => {
    const filterFunction = (i) => i?.sigle.toLowerCase().includes(filter.toLowerCase());

    let filteredItems = filter ? items.filter(filterFunction) : items;

    filteredItems = includeMaitrise
      ? filteredItems : filteredItems.filter((i) => !i?.programmes?.includes(MAITRISE));

    const sortFunction = (a, b) => {
      if (a.sigle < b.sigle) {
        return -1;
      }
      if (a.sigle > b.sigle) {
        return 1;
      }
      return 0;
    };

    return (
      <Paper className="selection-list">
        <Typography>{listName}</Typography>
        <TextField
          value={filter}
          label={t('filtrerSigle')}
          variant="standard"
          onChange={(event) => handleFilterChange(event, setFilter)}
          type="search"
        />
        <List dense component="div" role="list">
          {[...filteredItems].sort(sortFunction).map((value) => (
            <ListItemButton
              disableGutters
              divider
              key={value?.sigle}
              onClick={() => handleToggle(value)}
            >
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={value?.sigle} />
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
