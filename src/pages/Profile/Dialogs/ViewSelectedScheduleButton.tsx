import { CalendarToday } from "@mui/icons-material";
import { CircularProgress, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ButtonDialog from "../../../components/ButtonDialog/ButtonDialog";
import CombinaisonHoraire from "../../../components/CombinaisonHoraire/CombinaisonHoraire";
import { useGetCombinaisonsFromId } from "../../../features/generateur/generateurQueries";
import { useDisplayPreferences, useSelectedSchedule } from "../../../hooks/firebase";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
  & > div {
    height: 60vh;
    min-height: 25rem;
    max-height: 35rem;
    width: 100%;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

interface ViewSelectedScheduleButtonProps {
  session: string;
}

function ViewSelectedScheduleButton({ session }: ViewSelectedScheduleButtonProps): JSX.Element | null {
  const { t } = useTranslation("common");

  const { getSelectedSchedule } = useSelectedSchedule();
  const { preferences } = useDisplayPreferences();
  const getCombinaisonMutation = useGetCombinaisonsFromId();

  const selectedScheduleId = getSelectedSchedule(session);

  const handleOpen = useCallback(() => {
    if (selectedScheduleId) {
      getCombinaisonMutation.mutate(selectedScheduleId);
    }
  }, [selectedScheduleId, getCombinaisonMutation]);

  if (!selectedScheduleId) return null;

  const combinaison = getCombinaisonMutation.data?.[0];
  const isLoading = getCombinaisonMutation.isPending;
  const hasError = getCombinaisonMutation.isError;

  const {
    showNomCoursGroupe,
    showNomActivite,
    showLocaux,
    showModeEnseignement,
    showEnseignant,
  } = preferences;

  return (
    <ButtonDialog
      icon={<CalendarToday sx={{ fontSize: 16 }} />}
      title={t("horaireActuel") as string}
      viewOnly
      maxWidth="md"
      isIconButton
      tooltip={t("voirHoraireActuel") as string}
      onOpen={handleOpen}
      iconButtonProps={{
        size: "small",
        sx: {
          bgcolor: "success.main",
          color: "success.contrastText",
          "&:hover": { bgcolor: "success.dark" },
        },
      }}
    >
      <ContentWrapper>
        {isLoading && (
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        )}

        {hasError && (
          <Typography color="error">{t("erreurChargementHoraire")}</Typography>
        )}

        {!isLoading && !hasError && combinaison && (
          <CombinaisonHoraire
            combinaison={combinaison}
            disableLocaux={!showLocaux}
            disableNomActivite={!showNomActivite}
            disableNomCours={!showNomCoursGroupe}
            disableModeEnseignement={!showModeEnseignement}
            disableEnseignant={!showEnseignant}
          />
        )}

        {!isLoading && !hasError && !combinaison && (
          <Typography color="text.secondary">{t("aucunHoraireSelectionne")}</Typography>
        )}
      </ContentWrapper>
    </ButtonDialog>
  );
}

export default ViewSelectedScheduleButton;

