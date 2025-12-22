import { ExpandMore, Settings } from '@mui/icons-material';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useGetCombinaisons, useGetCoursSession } from '../../../features/generateur/generateurQueries';
import {
  congesAtom,
  coursObligatoiresAtom,
  nombreCoursAtom,
  programmeAtom,
  selectedCoursAtom,
  sessionAtom,
  setRawCombinaisonsAtom,
} from '../../../features/generateur/generateurAtoms';
import { areArraysSame } from '../../../utils/Array.utils';
import { NOMBRE_MAX_COURS_PAR_HORAIRE } from '../generateurHoraire.constants';
import useGenerateurHoraire from '../GenerateurHoraireContexts/hooks/useGenerateurHoraire';
import ParametresDialog from '../ParametresDialog/ParametresDialog';
import CoursTransferList from '../TransferList/CoursTransferList';
import SelectionCoursWrapper from './SelectionCours.styles';
import GenerationInformationToasts from './toasts/GenerationInformationToasts';
import ParametresGenerationToast from './toasts/ParametresGenerationToast';

function SelectionCours() {
  const { t } = useTranslation('common');

  const getCombinaisonsMutation = useGetCombinaisons();
  const setRawCombinaisons = useSetAtom(setRawCombinaisonsAtom);

  // Current Generateur Settings
  const session = useAtomValue(sessionAtom);
  const programme = useAtomValue(programmeAtom);
  const [selectedCours, setSelectedCours] = useAtom(selectedCoursAtom);
  const [nombreCours, setNombreCours] = useAtom(nombreCoursAtom);
  const [conges, setConges] = useAtom(congesAtom);
  const [coursObligatoires, setCoursObligatoires] = useAtom(coursObligatoiresAtom);

  const selectCoursSessionQuery = useGetCoursSession(session, programme);
  const [includeMaitrise, setIncludeMaitrise] = useState(true);
  const [expanded, setExpanded] = useState(!!selectCoursSessionQuery?.data);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    cours,
    coursObligatoires: controlledCoursObligatoires,
    conges: controlledConges,
    nombreCours: controlledNombreCours,
  } = useGenerateurHoraire();

  const nombreCoursGeneration = controlledNombreCours
    || Math.min(cours?.length, NOMBRE_MAX_COURS_PAR_HORAIRE);

  const handleGenerateCombinaisons = () => {
    setSelectedCours(cours);
    setNombreCours(nombreCoursGeneration);
    setConges(controlledConges);
    setCoursObligatoires(controlledCoursObligatoires);
    getCombinaisonsMutation.mutate({
      session,
      cours,
      conges: controlledConges,
      nombreCours: nombreCoursGeneration,
      coursObligatoires: controlledCoursObligatoires,
    }, {
      onSuccess: (data) => {
        setRawCombinaisons(data);
      },
    });
  };

  useEffect(() => {
    if (selectCoursSessionQuery?.data) {
      setExpanded(!!selectCoursSessionQuery?.data);
    }
  }, [selectCoursSessionQuery?.data]);

  const isCoursEqual = areArraysSame(selectedCours, cours);
  const isNombreCoursEqual = nombreCours === nombreCoursGeneration;
  const isCongesEqual = areArraysSame(conges, controlledConges);
  const isObligatoiresEqual = areArraysSame(controlledCoursObligatoires, coursObligatoires);
  const readyToGenerate = !(cours.length === 0
    || controlledNombreCours > cours?.length
    || (isCoursEqual
      && isNombreCoursEqual
      && isCongesEqual
      && isObligatoiresEqual));

  return (
    <SelectionCoursWrapper>
      <ParametresDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
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
            disabled={!readyToGenerate}
            onClick={handleGenerateCombinaisons}
          >
            {t('genererHoraires')}
          </Button>
        </AccordionActions>
      </Accordion>

      <ParametresGenerationToast readyToGenerate={readyToGenerate} />
      <GenerationInformationToasts readyToGenerate={readyToGenerate} />

      {getCombinaisonsMutation?.isPending && (
        <Backdrop
          open={getCombinaisonsMutation?.isPending}
          sx={{ zIndex: 3000 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </SelectionCoursWrapper>
  );
}

export default SelectionCours;
