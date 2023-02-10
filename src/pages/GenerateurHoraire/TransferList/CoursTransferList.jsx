/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import {
  IconButton,
  ListItemButton, ListItemIcon, TextField, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  ChevronLeft, ChevronRight, Lock, LockOpen, SwapHoriz,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import CoursTransferListWrapper from './CoursTransferList.styles';
import { selectCoursSession } from '../../../features/generateur/generateur.api';
import { selectProgramme, selectSelectedCours, selectSession } from '../../../features/generateur/generateur.slice';
import { MAITRISE, NOMBRE_MAX_COURS, NOMBRE_MAX_COURS_PAR_HORAIRE } from '../generateurHoraire.constants';

const RIGHT = 'right';
const LEFT = 'left';

const createListProperties = (id, listName, icon, filter, setFilter) => ({
  id,
  listName,
  icon,
  filter,
  setFilter,
});

export default function CoursTransferList({
  includeMaitrise, onSelectedCoursChange, onCoursObligatoiresChange, nombreCours,
}) {
  const { t } = useTranslation('common');

  const programme = useSelector(selectProgramme);
  const session = useSelector(selectSession);
  const selectedCours = useSelector(selectSelectedCours);
  const coursSessionQuery = useSelector(selectCoursSession(session, programme));

  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [unselectedFilter, setUnselectedFilter] = useState('');
  const [locked, setLocked] = useState([]);

  useEffect(() => {
    if (locked.length > nombreCours) {
      setLocked([]);
      if (onCoursObligatoiresChange) {
        onCoursObligatoiresChange([]);
      }
    }
  }, [nombreCours]);

  // eslint-disable-next-line no-param-reassign
  nombreCours = nombreCours || Math.min(right.length, NOMBRE_MAX_COURS_PAR_HORAIRE);

  useEffect(() => {
    if (coursSessionQuery?.data) {
      setLeft(coursSessionQuery?.data);
      setRight([]);
      setSelectedFilter('');
      setUnselectedFilter('');
    }
  }, [coursSessionQuery?.data]);

  useEffect(() => {
    if (selectedCours && coursSessionQuery?.data) {
      const selected = coursSessionQuery?.data?.filter((c) => selectedCours.includes(c?.sigle));
      const unselected = coursSessionQuery?.data?.filter((c) => !selected.includes(c));
      setRight(selected);
      setLeft(unselected);
    }
  }, []);

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
    const modifiedLocked = locked.filter((v) => v !== value);
    setLocked(modifiedLocked);
    setLeft(modifiedLeft);
    setRight(modifiedRight);

    if (onSelectedCoursChange) {
      onSelectedCoursChange(modifiedRight);
    }

    if (onCoursObligatoiresChange) {
      onCoursObligatoiresChange(modifiedLocked);
    }
  };

  const handleLocked = (value) => {
    let modified;
    if (locked.includes(value)) {
      modified = locked.filter((v) => v !== value);
    } else {
      modified = [...locked, value];
    }
    setLocked(modified);
    if (onCoursObligatoiresChange) {
      onCoursObligatoiresChange(modified);
    }
  };

  const handleFilterChange = (event, setState) => {
    setState(event?.target?.value);
  };

  const lists = {
    [LEFT]: createListProperties(LEFT, t('coursDisponibles'), <ChevronRight />, unselectedFilter, setUnselectedFilter),
    [RIGHT]: createListProperties(RIGHT, t('coursSelectionnes'), <ChevronLeft />, selectedFilter, setSelectedFilter),
  };

  const customList = (items, properties) => {
    const {
      id, listName, icon, filter, setFilter,
    } = properties;
    const filterFunction = (i) => i?.sigle.toLowerCase().includes(filter.toLowerCase());

    let filteredItems = filter ? items.filter(filterFunction) : items;

    filteredItems = (includeMaitrise || id === RIGHT)
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
    const title = id === RIGHT ? `${listName} (${right.length}/${NOMBRE_MAX_COURS})`
      : `${listName} (${filteredItems.length})`;

    return (
      <Paper className="selection-list">
        <Typography>{title}</Typography>
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
              disabled={id === LEFT && right.length === 15}
            >
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              <ListItemText primary={value?.sigle} />
              {id === RIGHT && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleLocked(value);
                }}
                disabled={!locked?.includes(value)
                && (locked.length >= nombreCours
                )}
              >
                {locked?.includes(value) ? <Lock /> : <LockOpen />}
              </IconButton>
              )}
            </ListItemButton>
          ))}
          {id === RIGHT && right.length === 0
            && (
            <ListItemButton
              disableGutters
              disabled
            >
              <ListItemText primary={t('aucunCoursSelectionne')} />
            </ListItemButton>
            )}
        </List>
      </Paper>
    );
  };

  return (
    <CoursTransferListWrapper>
      {customList(left, lists[LEFT])}
      <SwapHoriz className="swap-icon" />
      {customList(right, lists[RIGHT])}
    </CoursTransferListWrapper>
  );
}
