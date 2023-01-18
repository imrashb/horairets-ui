import { Sync } from '@mui/icons-material';
import {
  Button,
  Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, Switch,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoursSession, useLazyGetCombinaisonsQuery } from '../../../features/generateur/generateur.api';
import {
  selectProgramme, selectSelectedCours, selectSession, setSelectedCours,
} from '../../../features/generateur/generateur.slice';
import CoursTransferList from '../TransferList/CoursTransferList';
import SelectionCoursWrapper from './SelectionCours.styles';

function SelectionCours() {
  const { t } = useTranslation('common');

  const dispatch = useDispatch();

  const [getCombinaisonsTrigger] = useLazyGetCombinaisonsQuery();
  const session = useSelector(selectSession);
  const programme = useSelector(selectProgramme);
  const selectedCours = useSelector(selectSelectedCours);
  const { isUninitialized } = useSelector(selectCoursSession(session, programme));
  const [includeMaitrise, setIncludeMaitrise] = useState(true);
  const [cours, setCours] = useState([]);

  const onSelectedCoursChange = (value) => {
    setCours(value?.map((c) => c?.sigle));
  };

  const handleGenerateCombinaisons = () => {
    dispatch(setSelectedCours(cours));
    getCombinaisonsTrigger({ session, cours });
  };

  return (
    <SelectionCoursWrapper>
      <Card>
        <CardHeader title={t('cours')} />
        <Divider />
        <CardContent>
          <CoursTransferList
            includeMaitrise={includeMaitrise}
            onSelectedCoursChange={onSelectedCoursChange}
          />
          <FormControlLabel
            checked={includeMaitrise}
            onChange={() => setIncludeMaitrise(!includeMaitrise)}
            control={(
              <Switch />
            )}
            label={t('inclureMaitrise')}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            variant="text"
            disabled={cours.length === 0 || cours?.every((v) => selectedCours?.includes(v))}
            onClick={handleGenerateCombinaisons}
          >
            {t('genererHoraires')}
            <Sync />
          </Button>
        </CardActions>
      </Card>
    </SelectionCoursWrapper>
  );
}

export default SelectionCours;
