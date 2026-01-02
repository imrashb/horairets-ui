import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  programmesAtom,
  sessionAtom,
} from "../../../features/generateur/generateurAtoms";
import { useGetCoursSession } from "../../../features/generateur/generateurQueries";
import { areArraysSame } from "../../../utils/Array.utils";
import useGenerateurHoraire from "../GenerateurHoraireContexts/hooks/useGenerateurHoraire";
import SelectionProgramme from "./SelectionProgramme";
import SelectionSession from "./SelectionSession";
import SelectionSessionProgrammeWrapper from "./SelectionSessionProgramme.styles";

function SelectionSessionProgramme(): JSX.Element {
  const { t } = useTranslation("common");

  const [currentSession, setCurrentSession] = useAtom(sessionAtom);
  const [currentProgramme, setCurrentProgramme] = useAtom(programmesAtom);

  const { session, programmes } = useGenerateurHoraire();

  const coursSessionQuery = useGetCoursSession(session, programmes);

  useEffect(() => {
    if (session && programmes && programmes.length > 0) {
      const areProgrammesSame = areArraysSame(programmes, currentProgramme);
      const isSessionSame = currentSession === session;

      if (!isSessionSame) {
        setCurrentSession(session);
      }
      if (!areProgrammesSame) {
        setCurrentProgramme(programmes);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, programmes, currentProgramme, currentSession]); // Removing exhaustive-deps warning to be safe, but adhering to logic

  const [expanded, setExpanded] = useState(true);
  return (
    <SelectionSessionProgrammeWrapper>
      <Accordion
        expanded={expanded}
        onChange={() => setExpanded(!expanded)}
        className="choix-session"
      >
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">{t("sessionProgramme")}</Typography>
          {coursSessionQuery?.isFetching && (
            <CircularProgress size="2rem" thickness={8} />
          )}
        </AccordionSummary>
        <Divider />
        <AccordionDetails className="selection-wrapper">
          <SelectionSession />
          <SelectionProgramme />
        </AccordionDetails>
      </Accordion>
    </SelectionSessionProgrammeWrapper>
  );
}

export default SelectionSessionProgramme;
