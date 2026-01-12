import { Route, Save, School, Warning } from "@mui/icons-material";
import { Button, Theme, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useUnsavedChangesWarning } from "../../../hooks/useUnsavedChangesWarning";
import { fadeInOutAnimation } from "../../../utils/animations";
import EditProfileDialog from "./EditProfileDialog";
import { PlannedSessionsGrid } from "./PlannedSessionsGrid";
import { usePlannedCourses } from "./usePlannedCourses";


const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ChangeIndicator = styled(Typography)`
  color: ${({ theme }) => (theme as Theme).palette.warning.main};
  font-size: 0.75rem;
  display: flex;
  align-items: center;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  background-color: ${({ theme }) => (theme as Theme).palette.action.hover};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => (theme as Theme).palette.divider};
`;

function PlannedCoursesEditor(): JSX.Element {
  const { t } = useTranslation("common");
  
  const {
    profile,
    localSessions,
    sortedSessionKeys,
    previousSession,
    nextSession,
    programme,
    hasChanges,
    handleAddSession,
    handleDeleteSession,
    handleUpdateSessionConfig,
    handleSave,
    handleCancel,
  } = usePlannedCourses();

  useUnsavedChangesWarning(t("avertissementNonSauvegarde"), hasChanges);

  return (
    <>
      <Header>
        <Typography variant="h6" className="card-title" sx={{ mb: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Route />
          {t("coursPlanifies")}
        </Typography>
        <AnimatePresence>
          {hasChanges && (
            <motion.div key="actions" {...fadeInOutAnimation}>
              <ActionsContainer>
                <ChangeIndicator>
                  <Warning sx={{ fontSize: 16, mr: 0.5 }} />
                  {t("changementsNonSauvegardes")}
                </ChangeIndicator>
                <Button variant="outlined" onClick={handleCancel} size="small">
                  {t("annuler")}
                </Button>
                <Button variant="contained" startIcon={<Save />} onClick={handleSave} size="small">
                  {t("sauvegarder")}
                </Button>
              </ActionsContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </Header>
      <EditorWrapper>
        {!profile?.admissionSession ? (
          <EmptyStateContainer>
            <School sx={{ fontSize: 48, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {t("commencezPlanification")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
              {t("selectionnezAdmissionDescription")}
            </Typography>
            <EditProfileDialog currentProfile={profile} />
          </EmptyStateContainer>
        ) : (
          <SessionsGrid>
            <PlannedSessionsGrid
              localSessions={localSessions}
              sortedSessionKeys={sortedSessionKeys}
              admissionSession={profile?.admissionSession}
              programme={programme}
              previousSession={previousSession}
              nextSession={nextSession}
              onAddSession={handleAddSession}
              onDeleteSession={handleDeleteSession}
              onUpdateSessionConfig={handleUpdateSessionConfig}
            />
          </SessionsGrid>
        )}
      </EditorWrapper>
    </>
  );
}

export default PlannedCoursesEditor;
