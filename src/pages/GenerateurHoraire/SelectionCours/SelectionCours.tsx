import { ExpandMore, Settings, Download } from "@mui/icons-material";
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
} from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  activeGenerateurConfigAtom,
  programmesAtom,
  sessionAtom,
  setRawCombinaisonsAtom,
} from "../../../features/generateur/generateurAtoms";
import {
  useGetCombinaisons,
  useGetCoursSession,
} from "../../../features/generateur/generateurQueries";
import { areArraysSame } from "../../../utils/Array.utils";
import { NOMBRE_MAX_COURS_PAR_HORAIRE } from "../generateurHoraire.constants";
import useGenerateurHoraire from "../GenerateurHoraireContexts/hooks/useGenerateurHoraire";
import ParametresDialog from "../ParametresDialog/ParametresDialog";
import CoursTransferList from "../TransferList/CoursTransferList";
import SelectionCoursWrapper from "./SelectionCours.styles";
import GenerationInformationToasts from "./toasts/GenerationInformationToasts";
import ParametresGenerationToast from "./toasts/ParametresGenerationToast";
import useUserDocument from "../../../hooks/firebase/useUserDocument";
import { UserDocument } from "../../../hooks/firebase/types";

function SelectionCours(): JSX.Element {
  const { t } = useTranslation("common");

  const getCombinaisonsMutation = useGetCombinaisons();
  const setRawCombinaisons = useSetAtom(setRawCombinaisonsAtom);

  // Current Generateur Settings
  const session = useAtomValue(sessionAtom);
  const programme = useAtomValue(programmesAtom);

  const [activeConfig, setActiveConfig] = useAtom(activeGenerateurConfigAtom);

  const selectCoursSessionQuery = useGetCoursSession(session, programme);
  const [includeMaitrise, setIncludeMaitrise] = useState(true);
  const [expanded, setExpanded] = useState(!!selectCoursSessionQuery?.data);
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    cours,
    coursObligatoires: controlledCoursObligatoires,
    conges: controlledConges,
    nombreCours: controlledNombreCours,
    setCours,
    setCoursObligatoires,
    setConges,
    setNombreCours,
  } = useGenerateurHoraire();

  const { data: userDoc } = useUserDocument<UserDocument>();

  const plannedSession = useMemo(() => {
    if (!userDoc?.profile?.sessions || !session) return null;
    return userDoc.profile.sessions[session];
  }, [userDoc, session]);

  const hasPlannedCourses = (plannedSession?.cours?.length || 0) > 0;

  const handleImportFromPlanner = () => {
    if (plannedSession) {
      setCours(plannedSession.cours);
      setCoursObligatoires(plannedSession.coursObligatoires);
      setConges(plannedSession.conges);
      setNombreCours(plannedSession.nombreCours);
    }
  };

  const nombreCoursGeneration =
    controlledNombreCours ||
    Math.min(cours?.length || 0, NOMBRE_MAX_COURS_PAR_HORAIRE);

  const handleGenerateCombinaisons = () => {
    // Commit Form State to Active State
    const newConfig = {
      ...activeConfig,
      cours,
      nombreCours: nombreCoursGeneration,
      conges: controlledConges,
      coursObligatoires: controlledCoursObligatoires,
      session,
      programmes: programme,
    };
    setActiveConfig(newConfig);

    getCombinaisonsMutation.mutate(
      {
        session,
        cours,
        conges: controlledConges,
        nombreCours: nombreCoursGeneration,
        coursObligatoires: controlledCoursObligatoires,
      },
      {
        onSuccess: (data) => {
          setRawCombinaisons(data); // data is Combinaison[]
        },
      }
    );
  };

  useEffect(() => {
    if (selectCoursSessionQuery?.data) {
      setExpanded(!!selectCoursSessionQuery?.data);
    }
  }, [selectCoursSessionQuery?.data]);

  const isCoursEqual = areArraysSame(activeConfig?.cours, cours);
  const isNombreCoursEqual = activeConfig?.nombreCours === nombreCoursGeneration;
  const isCongesEqual = areArraysSame(activeConfig?.conges, controlledConges);
  const isObligatoiresEqual = areArraysSame(
    activeConfig?.coursObligatoires,
    controlledCoursObligatoires
  );
  const isSessionEqual = activeConfig?.session === session;

  const readyToGenerate = !(
    cours.length === 0 ||
    (controlledNombreCours || 0) > cours.length ||
    (isCoursEqual &&
      isNombreCoursEqual &&
      isCongesEqual &&
      isObligatoiresEqual &&
      isSessionEqual)
  );

  return (
    <SelectionCoursWrapper>
      <ParametresDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
      <Accordion
        expanded={expanded}
        disabled={!selectCoursSessionQuery?.data}
        onChange={() => setExpanded(!expanded)}
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">{t("cours")}</Typography>
          {hasPlannedCourses && (
            <Button
              startIcon={<Download />}
              variant="contained"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleImportFromPlanner();
              }}
              sx={{ ml: "auto", mr: 2 }}
            >
              {t("importerCheminement")}
            </Button>
          )}
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <CoursTransferList includeMaitrise={includeMaitrise} />
          <FormControlLabel
            checked={includeMaitrise}
            onChange={() => setIncludeMaitrise(!includeMaitrise)}
            control={<Switch />}
            label={t("inclureMaitrise")}
          />
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button
            startIcon={<Settings />}
            variant="outlined"
            onClick={() => setDialogOpen(true)}
          >
            {t("parametres")}
          </Button>
          <Button
            variant="contained"
            disabled={!readyToGenerate}
            onClick={handleGenerateCombinaisons}
          >
            {t("genererHoraires")}
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
