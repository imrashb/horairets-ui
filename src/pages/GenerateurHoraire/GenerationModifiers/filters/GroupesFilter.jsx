import {
  Checkbox,
  FormControl, InputLabel, ListItemText, ListSubheader, MenuItem, Select, useTheme,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import useFilters from './context/useFilters';
import { combinaisonsInfoAtom } from '../../../../features/generateur/generateurAtoms';
import { getGroupeId } from '../../../../utils/Groupes.utils';

function GroupesFilter() {
  const { t } = useTranslation('common');

  const { groupes, setGroupes } = useFilters();
  const combinaisonsInfo = useAtomValue(combinaisonsInfoAtom);
  const isVisible = combinaisonsInfo && combinaisonsInfo?.length > 0;
  const handleChange = (e) => {
    setGroupes(e?.target?.value);
  };

  const theme = useTheme();

  const sortFunction = (a, b) => {
    if (a.sigle < b.sigle) {
      return -1;
    }
    if (a.sigle > b.sigle) {
      return 1;
    }
    return 0;
  };

  const sorted = combinaisonsInfo?.slice()?.sort(sortFunction);
  return (isVisible
    && (
      <FormControl fullWidth variant="standard">
        <InputLabel>{t('groupes')}</InputLabel>
        <Select
          multiple
          value={groupes}
          onChange={handleChange}
          label={t('trierPar')}
          renderValue={(value) => t('groupesSelectionnes', { count: value.length })}
        >
          {sorted.map((cours) => (

            [<ListSubheader
              sx={{ background: theme.palette.grey[100] }}
            >
              {cours.sigle}
              {/* eslint-disable-next-line react/jsx-indent */}
             </ListSubheader>, ...cours.groupes.map((groupe) => {
              const id = getGroupeId(cours?.sigle, groupe);
              return (
                <MenuItem
                  key={id}
                  value={id}
                >
                  <Checkbox checked={groupes.includes(id)} />
                  <ListItemText primary={id} />
                </MenuItem>
              );
            })]

          ))}

        </Select>
      </FormControl>
    )
  );
}

export default GroupesFilter;
