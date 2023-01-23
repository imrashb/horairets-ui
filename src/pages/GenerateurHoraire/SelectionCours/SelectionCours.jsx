import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider, FormControlLabel, Switch, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
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
  const selectCoursSessionQuery = useSelector(selectCoursSession(session, programme));
  const [includeMaitrise, setIncludeMaitrise] = useState(true);
  const [cours, setCours] = useState([]);
  const [expanded, setExpanded] = useState(!!selectCoursSessionQuery?.data);

  const onSelectedCoursChange = (value) => {
    setCours(value?.map((c) => c?.sigle));
  };

  const handleGenerateCombinaisons = () => {
    dispatch(setSelectedCours(cours));
    getCombinaisonsTrigger({ session, cours });
  };

  useEffect(() => {
    if (selectCoursSessionQuery?.data) {
      setExpanded(!!selectCoursSessionQuery?.data);
    }
  }, [selectCoursSessionQuery?.data]);

  return (
    <SelectionCoursWrapper>
      <Accordion
        expanded={expanded}
        disabled={!selectCoursSessionQuery?.data}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
        >
          <Typography variant="h5">{t('cours')}</Typography>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
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
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button
            variant="contained"
            disabled={cours.length === 0
      || (cours?.length === selectedCours?.length
      && cours?.every((v) => selectedCours?.includes(v)))}
            onClick={handleGenerateCombinaisons}
          >
            {t('genererHoraires')}
          </Button>
        </AccordionActions>
      </Accordion>
    </SelectionCoursWrapper>
  );
}

export default SelectionCours;
