import { Delete, Lock, LockOpen } from "@mui/icons-material";
import { Chip, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SessionConfig } from "../../../hooks/firebase/types";
import { getSessionTranslation } from "../../../utils/Sessions.utils";
import AddCourseAutocomplete from "./AddCourseAutocomplete";
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
  programme: string;
  isLast: boolean;
  onUpdateConfig: (config: SessionConfig) => void;
  onDeleteSession?: () => void;
}

function SessionCard({
  session,
  config,
  programme,
  isLast,
  onUpdateConfig,
  onDeleteSession,
}: SessionCardProps): JSX.Element {
  const { t } = useTranslation("common");

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

  
  return (
    <CardWrapper>
      <CardHeader>
        <Typography variant="subtitle1" fontWeight="bold">
          {getSessionTranslation(session, t) || session}
        </Typography>
        {isLast && onDeleteSession && (
          <DeleteButton size="small" onClick={onDeleteSession}>
            <Delete sx={{ fontSize: 18 }} />
          </DeleteButton>
        )}
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
          session={session}
          programme={programme}
          existingCourses={config.cours}
          onAddCourse={handleAddCourse}
        />
      </CoursesContainer>
    </CardWrapper>
  );
}

export default SessionCard;
