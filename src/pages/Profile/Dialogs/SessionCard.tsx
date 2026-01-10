import { Add, Close, Delete, Lock, LockOpen } from "@mui/icons-material";
import {
  Autocomplete,
  Chip,
  ClickAwayListener,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  Theme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useGetCoursSession } from "../../../features/generateur/generateurQueries";
import { SessionConfig } from "../../../hooks/firebase/types";
import { getSessionTranslation } from "../../../utils/Sessions.utils";

const CardWrapper = styled.div`
  background: ${({ theme }) => (theme as Theme).palette.grey[100]};
  border: 1px solid ${({ theme }) => (theme as Theme).palette.grey[200]};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CoursesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  min-height: 32px;
`;

interface CourseChipProps {
  $isLocked: boolean;
}

const CourseChip = styled.div<CourseChipProps>`
  background: ${({ theme, $isLocked }) => 
    $isLocked 
      ? (theme as Theme).palette.primary.darkerMain 
      : (theme as Theme).palette.primary.main};
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  height: 28px;
  box-sizing: border-box;

  &:hover {
    opacity: 0.9;
  }
`;

const AddButton = styled(IconButton)`
  width: 28px;
  height: 28px;
  background: ${({ theme }) => (theme as Theme).palette.primary.light};
  color: white;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => (theme as Theme).palette.primary.main};
  }
`;

const InlineAutocomplete = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 28px;

  .MuiAutocomplete-root {
    width: 180px;
  }

  .MuiInputBase-root {
    height: 28px;
    font-size: 0.8125rem;
    padding: 0 8px !important;
  }

  .MuiOutlinedInput-notchedOutline {
    border-radius: 6px;
  }
`;

const EmptyState = styled(Typography)`
  color: ${({ theme }) => (theme as Theme).palette.text.secondary};
  font-style: italic;
  font-size: 0.875rem;
  line-height: 28px;
`;

const DeleteButton = styled(IconButton)`
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => (theme as Theme).palette.error.main};
  }
`;

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
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const coursQuery = useGetCoursSession(session, programme, isAdding);

  const availableCourses = coursQuery.data?.filter(
    (c) => !config.cours.includes(c.sigle)
  ) || [];

  const handleStartAdding = () => {
    setIsAdding(true);
    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleStopAdding = () => {
    setIsAdding(false);
    setInputValue("");
  };

  const handleAddCourse = (sigle: string) => {
    onUpdateConfig({
      ...config,
      cours: [...config.cours, sigle],
    });
    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 50);
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
        {config.cours.length === 0 && !isAdding && (
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

        {isAdding ? (
          <ClickAwayListener onClickAway={handleStopAdding}>
            <InlineAutocomplete>
              <Autocomplete
                size="small"
                options={availableCourses}
                getOptionLabel={(option) => option.sigle}
                loading={coursQuery.isLoading}
                inputValue={inputValue}
                value={null}
                onInputChange={(_, value, reason) => {
                  if (reason !== "reset") setInputValue(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={inputRef}
                    placeholder={t("sigle") as string}
                    variant="outlined"
                    size="small"
                    onKeyDown={(e) => {
                      if (e.key === "Escape") handleStopAdding();
                    }}
                  />
                )}
                onChange={(_, value) => {
                  if (value) {
                    handleAddCourse(value.sigle);
                    setInputValue("");
                  }
                }}
                autoHighlight
                openOnFocus
                blurOnSelect={false}
                clearOnBlur={false}
              />
              <IconButton size="small" onClick={handleStopAdding} sx={{ p: 0.25 }}>
                <Close sx={{ fontSize: 14 }} />
              </IconButton>
            </InlineAutocomplete>
          </ClickAwayListener>
        ) : (
          <AddButton size="small" onClick={handleStartAdding}>
            <Add sx={{ fontSize: 18 }} />
          </AddButton>
        )}
      </CoursesContainer>
    </CardWrapper>
  );
}

export default SessionCard;
