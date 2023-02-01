import { ExpandMore, Settings } from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  CircularProgress,
  Divider, FormControlLabel, Snackbar, Switch, Typography,
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
import { NOMBRE_MAX_COURS_PAR_HORAIRE } from '../generateurHoraire.constants';
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

  const nombreCoursGeneration = controlledNombreCours
  || Math.min(cours?.length, NOMBRE_MAX_COURS_PAR_HORAIRE);

  const onSelectedCoursChange = (value) => {
    setCours(value?.map((c) => c?.sigle));
  };

  const handleGenerateCombinaisons = () => {
    dispatch(setSelectedCours(cours));
    dispatch(setNombreCours(nombreCoursGeneration));
    dispatch(setConges(controlledConges));
    getCombinaisonsTrigger({
      session, cours, conges: controlledConges, nombreCours: nombreCoursGeneration,
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

  const isntReadyToGenerate = cours.length === 0
  || controlledNombreCours > cours?.length
  || (cours?.length === selectedCours?.length
  && cours?.every((v) => selectedCours?.includes(v))
  && nombreCours === nombreCoursGeneration
  && conges === controlledConges);

  return (
    <SelectionCoursWrapper>
      <Backdrop
        open={getCombinaisonQuery?.isFetching}
        sx={{ zIndex: 3000 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={!isntReadyToGenerate}>
        <Alert severity="info">
          <AlertTitle>
            {t('parametresHoraire')}
          </AlertTitle>
          {`${t('cours')}: ${cours?.join(', ')}`}
          <br />
          {`${t('nombreCoursParHoraire')}: ${controlledNombreCours || nombreCoursGeneration} ${t('cours').toLowerCase()}`}
          <br />
          {`${t('joursConges')}: ${controlledConges?.map((c) => t(c))?.join(', ') || t('aucun')}`}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={isntReadyToGenerate && controlledNombreCours > cours?.length}>
        <Alert severity="error">
          <AlertTitle>
            {t('nombreCoursInvalide')}
          </AlertTitle>
          {t('alerteNombreCoursInferieur', { count: cours?.length, nbCours: controlledNombreCours })}
        </Alert>
      </Snackbar>

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
            disabled={isntReadyToGenerate}
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
