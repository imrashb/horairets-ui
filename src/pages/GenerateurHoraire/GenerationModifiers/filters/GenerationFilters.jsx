import { FilterList } from '@mui/icons-material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  setFilters,
} from '../../../../features/generateur/generateur.slice';
import PlanificationSeanceFilter from './PlanificationSeanceFilter';
import useFilters from './context/useFilters';
import GroupesFilter from './GroupesFilter';
import ButtonDialog from '../../../../components/ButtonDialog/ButtonDialog';

function GenerationFilters() {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const { planification, groupes } = useFilters();

  const onClose = () => {
    dispatch(setFilters({
      planification,
      groupes,
    }));
  };

  return (
    <ButtonDialog onClose={onClose} title={t('filtrer')} icon={<FilterList />}>
      <PlanificationSeanceFilter />
      <GroupesFilter />
    </ButtonDialog>
  );
}

export default GenerationFilters;
