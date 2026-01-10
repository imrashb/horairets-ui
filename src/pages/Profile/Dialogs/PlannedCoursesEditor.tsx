import { deleteField } from "firebase/firestore";
import { Save, Warning } from "@mui/icons-material";
import { Button, Theme, Typography } from "@mui/material";
import isEqual from "lodash/isEqual";
import sortBy from "lodash/sortBy";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useUserDocument from "../../../hooks/firebase/useUserDocument";
import { SessionConfig, SessionsMap, UserDocument } from "../../../hooks/firebase/types";
import { compareSession } from "../../../utils/Sessions.utils";
import { getCurrentSession, getNextSession } from "../../../utils/SessionSequence.utils";
import { AddSessionCard } from "./AddSessionCard";
import SessionCard from "./SessionCard";

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

const DEFAULT_SESSION_CONFIG: SessionConfig = {
  cours: [],
  coursObligatoires: [],
  nombreCours: 4,
  conges: [],
};

function normalizeSessionConfig(config: SessionConfig): SessionConfig {
  return {
    ...config,
    cours: sortBy(config.cours),
    coursObligatoires: sortBy(config.coursObligatoires),
    conges: sortBy(config.conges),
  };
}

function normalizeSessionsMap(sessions: SessionsMap): SessionsMap {
  const normalized: SessionsMap = {};
  for (const [key, config] of Object.entries(sessions)) {
    normalized[key] = normalizeSessionConfig(config);
  }
  return normalized;
}

function areSessionsEqual(a: SessionsMap, b: SessionsMap): boolean {
  return isEqual(normalizeSessionsMap(a), normalizeSessionsMap(b));
}

function PlannedCoursesEditor(): JSX.Element {
  const { t } = useTranslation("common");
  const { data: userDoc, updateDocument } = useUserDocument<UserDocument>();

  const profile = userDoc?.profile;
  
  const storedSessions = useMemo(() => {
    return profile?.sessions || {};
  }, [JSON.stringify(profile?.sessions)]);
  
  const [localSessions, setLocalSessions] = useState<SessionsMap>(storedSessions);

  useEffect(() => {
    setLocalSessions(storedSessions);
  }, [storedSessions]);

  const hasChanges = useMemo(() => {
    return !areSessionsEqual(localSessions, storedSessions);
  }, [localSessions, storedSessions]);

  const sortedSessionKeys = useMemo(() => {
    return Object.keys(localSessions).sort(compareSession);
  }, [localSessions]);

  const nextSession = useMemo(() => {
    if (sortedSessionKeys.length === 0) {
      return profile?.admissionSession || getCurrentSession();
    }
    const lastSession = sortedSessionKeys[sortedSessionKeys.length - 1];
    return getNextSession(lastSession);
  }, [sortedSessionKeys, profile?.admissionSession]);

  const programme = profile?.programme || "Maîtrise";

  const handleAddNextSession = () => {
    if (Object.hasOwn(localSessions, nextSession)) return;
    setLocalSessions((prev) => ({
      ...prev,
      [nextSession]: { ...DEFAULT_SESSION_CONFIG },
    }));
  };

  const handleDeleteLastSession = () => {
    if (sortedSessionKeys.length === 0) return;
    const lastSession = sortedSessionKeys[sortedSessionKeys.length - 1];
    setLocalSessions((prev) => {
      const { [lastSession]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleUpdateSessionConfig = (sessionKey: string, config: SessionConfig) => {
    setLocalSessions((prev) => ({
      ...prev,
      [sessionKey]: config,
    }));
  };

  const handleSave = async () => {
    if (!profile) return;

    // Create updates object containing current local sessions
    // and explicit deleteField() for sessions that were removed
    const sessionsUpdates: Record<string, any> = { ...localSessions };
    
    Object.keys(storedSessions).forEach((key) => {
      if (!Object.hasOwn(localSessions, key)) {
        sessionsUpdates[key] = deleteField();
      }
    });

    await updateDocument({
      profile: {
        ...profile,
        sessions: sessionsUpdates,
      },
    }, {
      showToast: true,
      successMessage: t("coursPlanifiesMisAJour") as string,
      errorMessage: t("erreurMiseAJourCoursPlanifies") as string,
    });
  };

  const handleCancel = () => {
    setLocalSessions(storedSessions);
  };

  return (
    <>
      <Header>
        <Typography variant="h6" className="card-title" sx={{ mb: 0 }}>
          {t("coursPlanifies")}
        </Typography>
        {hasChanges && (
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
        )}
      </Header>
      <EditorWrapper>
        <SessionsGrid>
          {sortedSessionKeys.map((sessionKey, index) => (
            <SessionCard
              key={sessionKey}
              session={sessionKey}
              config={localSessions[sessionKey]}
              programme={programme}
              isLast={index === sortedSessionKeys.length - 1}
              onUpdateConfig={(config) => handleUpdateSessionConfig(sessionKey, config)}
              onDeleteSession={handleDeleteLastSession}
            />
          ))}
          <AddSessionCard nextSession={nextSession} onAdd={handleAddNextSession} />
        </SessionsGrid>
      </EditorWrapper>
    </>
  );
}

export default PlannedCoursesEditor;
