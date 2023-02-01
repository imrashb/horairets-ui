import { ExpandMore, Settings } from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Button,
  CircularProgress,
  Divider, FormControlLabel, Switch, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoursSession, useLazyGetCombinaisonsQuery } from '../../../features/generateur/generateur.api';
import {
  selectConges,
  selectNombreCours,
  selectProgramme, selectSelectedCours, selectSession, setConges, setNombreCours, setSelectedCours,
} from '../../../features/generateur/generateur.slice';
import useCombinaisonsSelector from '../Combinaisons/useCombinaisonsSelector';
import ParametresDialog from '../ParametresDialog/ParametresDialog';
import CoursTransferList from '../TransferList/CoursTransferList';
import SelectionCoursWrapper from './SelectionCours.styles';

function SelectionCours() {
  const { t } = useTranslation('common');

  const dispatch = useDispatch();

  const [getCombinaisonsTrigger, getCombinaisonQuery] = useLazyGetCombinaisonsQuery();
  const session = useSelector(selectSession);
  const programme = useSelector(selectProgramme);
  const selectedCours = useSelector(selectSelectedCours);
  const nombreCours = useSelector(selectNombreCours);
  const conges = useSelector(selectConges);
  const selectCoursSessionQuery = useSelector(selectCoursSession(session, programme));
  const [includeMaitrise, setIncludeMaitrise] = useState(true);
  const [cours, setCours] = useState(selectedCours || []);
  const [expanded, setExpanded] = useState(!!selectCoursSessionQuery?.data);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [controlledNombreCours, setControlledNombreCours] = useState(nombreCours);
  const [controlledConges, setControlledConges] = useState(conges);

  const onSelectedCoursChange = (value) => {
    setCours(value?.map((c) => c?.sigle));
  };

  const handleGenerateCombinaisons = () => {
    dispatch(setSelectedCours(cours));
    dispatch(setNombreCours(controlledNombreCours));
    dispatch(setConges(controlledConges));
    getCombinaisonsTrigger({
      session, cours, conges: controlledConges, nombreCours: controlledNombreCours,
    });
  };

  const handleDialogClose = (values) => {
    if (values) {
      setControlledNombreCours(values?.nombreCours);
      setControlledConges(values?.conges);
    }
    setDialogOpen(false);
  };

  useEffect(() => {
    if (selectCoursSessionQuery?.data) {
      setExpanded(!!selectCoursSessionQuery?.data);
    }
  }, [selectCoursSessionQuery?.data]);

  return (
    <SelectionCoursWrapper>
      <Backdrop
        open={getCombinaisonQuery?.isFetching}
        sx={{ zIndex: 3000 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ParametresDialog open={dialogOpen} onClose={handleDialogClose} />
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
            startIcon={<Settings />}
            variant="outlined"
            onClick={() => setDialogOpen(true)}
          >
            {t('parametres')}
          </Button>
          <Button
            variant="contained"
            disabled={cours.length === 0
      || (cours?.length === selectedCours?.length
      && cours?.every((v) => selectedCours?.includes(v))
      && nombreCours === controlledNombreCours
      && conges === controlledConges)}
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
