import { Delete, Lock, LockOpen, Warning } from "@mui/icons-material";
import { Chip, Tooltip, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Cours } from "../../../features/generateur/generateur.types";
import { SessionConfig } from "../../../hooks/firebase/types";
import { getSessionTranslation } from "../../../utils/Sessions.utils";
import AddCourseAutocomplete from "./AddCourseAutocomplete";
import EditSessionConfigDialog from "./EditSessionConfigDialog";
import SessionStatsChips from "./SessionStatsChips";
import {
  CardHeader,
  CardWrapper,
  CoursesContainer,
  DeleteButton,
  EmptyState,
} from "./SessionCard.styles";

interface SessionCardProps {
  session: string;
  config: SessionConfig;
  allCours: Cours[];
  isCoursLoading?: boolean;
  onUpdateConfig: (config: SessionConfig) => void;
  onDeleteSession: () => void;
}

function SessionCard({
  session,
  config,
  allCours,
  isCoursLoading = false,
  onUpdateConfig,
  onDeleteSession,
}: SessionCardProps): JSX.Element {
  const { t } = useTranslation("common");

  const totalCredits = useMemo(() => {
    return allCours
      .filter((c) => config.cours.includes(c.sigle))
      .reduce((sum, c) => sum + c.credits, 0);
  }, [allCours, config.cours]);

  const handleAddCourse = (sigle: string) => {
    onUpdateConfig({
      ...config,
      cours: [...config.cours, sigle],
    });
  };

  const handleRemoveCourse = (sigle: string) => {
    onUpdateConfig({
      ...config,
      cours: config.cours.filter((c) => c !== sigle),
      coursObligatoires: config.coursObligatoires.filter((c) => c !== sigle),
    });
  };

  const handleToggleLock = (sigle: string) => {
    const isLocked = config.coursObligatoires.includes(sigle);
    onUpdateConfig({
      ...config,
      coursObligatoires: isLocked
        ? config.coursObligatoires.filter((c) => c !== sigle)
        : [...config.coursObligatoires, sigle],
    });
  };

  const hasWarning =
    config.nombreCours !== null && config.cours.length < config.nombreCours;

  return (
    <CardWrapper>
      <CardHeader>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {getSessionTranslation(session, t) || session}
            </Typography>
            {hasWarning && (
              <Tooltip
                title={t("alerteNombreCoursInferieur", {
                  nbCours: config.nombreCours,
                  count: config.cours.length,
                })}
              >
                <Warning color="warning" sx={{ fontSize: 20 }} />
              </Tooltip>
            )}
          </div>
          <SessionStatsChips config={config} totalCredits={totalCredits} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <EditSessionConfigDialog 
            config={config} 
            onSave={onUpdateConfig} 
          />
          <DeleteButton size="small" onClick={onDeleteSession}>
            <Delete sx={{ fontSize: 18 }} />
          </DeleteButton>
        </div>
      </CardHeader>

      <CoursesContainer>
        {config.cours.length === 0 && (
          <EmptyState>{t("aucunCoursPlanifie")}</EmptyState>
        )}

        {config.cours.map((sigle) => {
          const isLocked = config.coursObligatoires.includes(sigle);
          return (
            <Tooltip
              key={sigle}
              title={isLocked ? t("coursObligatoire") : t("coursOptionnel")}
            >
              <Chip
                label={sigle}
                icon={isLocked ? <Lock /> : <LockOpen />}
                onClick={() => handleToggleLock(sigle)}
                onDelete={() => handleRemoveCourse(sigle)}
                color={isLocked ? "secondary" : "primary"}
                size="small"
              />
            </Tooltip>
          );
        })}

        <AddCourseAutocomplete
          allCours={allCours}
          isLoading={isCoursLoading}
          existingCourses={config.cours}
          onAddCourse={handleAddCourse}
        />
      </CoursesContainer>
    </CardWrapper>
  );
}

export default SessionCard;
