import { FilterList } from '@mui/icons-material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';
import {
  setFiltersAtom,
} from '../../../../features/generateur/generateurAtoms';
import PlanificationSeanceFilter from './PlanificationSeanceFilter';
import useFilters from './context/useFilters';
import GroupesFilter from './GroupesFilter';
import ButtonDialog from '../../../../components/ButtonDialog/ButtonDialog';

function GenerationFilters() {
  const { t } = useTranslation('common');
  const setFilters = useSetAtom(setFiltersAtom);

  const { planification, groupes } = useFilters();

  const onClose = () => {
    setFilters({
      planification,
      groupes,
    });
  };

  return (
    <ButtonDialog onClose={onClose} title={t('filtrer')} icon={<FilterList />}>
      <PlanificationSeanceFilter />
      <GroupesFilter />
    </ButtonDialog>
  );
}

export default GenerationFilters;
