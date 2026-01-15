import { deleteField, FieldValue } from 'firebase/firestore';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import useUserDocument from '../../../hooks/firebase/useUserDocument';
import { SessionConfig, SessionsMap, UserDocument } from '../../../hooks/firebase/types';
import { compareSession } from '../../../utils/Sessions.utils';
import {
  getCurrentSession,
  getNextSession,
  getPreviousSession,
} from '../../../utils/SessionSequence.utils';
import {
  getDefaultDisponibilites,
} from '../../../utils/Disponibilites.utils';

const DEFAULT_SESSION_CONFIG: SessionConfig = {
  cours: [],
  coursObligatoires: [],
  nombreCours: null,
  disponibilites: getDefaultDisponibilites(),
};

function normalizeSessionConfig(config: SessionConfig): SessionConfig {
  const normalized: SessionConfig = {
    cours: sortBy(config.cours),
    coursObligatoires: sortBy(config.coursObligatoires),
    nombreCours: config.nombreCours ?? null,
    disponibilites: config.disponibilites || getDefaultDisponibilites(),
    selectedCombinaisonId: config.selectedCombinaisonId ?? null,
  };

  return normalized;
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

function getBaseSession(profile: UserDocument['profile']): string {
  return profile?.admissionSession || getCurrentSession();
}

interface PlannedCoursesContextType {

  localSessions: SessionsMap;
  sortedSessionKeys: string[];
  previousSession: string;
  nextSession: string;
  programme: string;
  hasChanges: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onAddSession: (sessionKey: string) => void;
  onDeleteSession: (sessionKey: string) => void;
  onUpdateSessionConfig: (sessionKey: string, config: SessionConfig) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
}

const PlannedCoursesContext = createContext<PlannedCoursesContextType | null>(null);

export function usePlannedCourses() {
  const context = useContext(PlannedCoursesContext);
  if (!context) {
    throw new Error('usePlannedCourses must be used within a PlannedCoursesProvider');
  }
  return context;
}

export function PlannedCoursesProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const { t } = useTranslation('common');
  const { data: userDoc, updateDocument } = useUserDocument<UserDocument>();

  const profile = userDoc?.profile;

  const storedSessions = useMemo(() => {
    const map: SessionsMap = {};
    if (profile?.sessions) {
      Object.entries(profile.sessions).forEach(([key, config]) => {
        map[key] = {
          ...config,
          disponibilites: config.disponibilites || getDefaultDisponibilites(),
        };
      });
    }
    return map;
  }, [profile?.sessions]);

  const [localSessions, setLocalSessions] = useState<SessionsMap>(storedSessions);

  // Effect to sync
  useEffect(() => {
    setLocalSessions(storedSessions);
  }, [storedSessions]);

  const hasChanges = useMemo(
    () => !areSessionsEqual(localSessions, storedSessions),
    [localSessions, storedSessions],
  );

  const sortedSessionKeys = useMemo(
    () => Object.keys(localSessions).sort(compareSession),
    [localSessions],
  );

  const previousSession = useMemo(() => {
    if (sortedSessionKeys.length === 0) {
      return getPreviousSession(getBaseSession(profile));
    }
    const firstSession = sortedSessionKeys[0];
    return getPreviousSession(firstSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedSessionKeys, profile?.admissionSession]);

  const nextSession = useMemo(() => {
    if (sortedSessionKeys.length === 0) {
      return getBaseSession(profile);
    }
    const lastSession = sortedSessionKeys[sortedSessionKeys.length - 1];
    return getNextSession(lastSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedSessionKeys, profile?.admissionSession]);

  const programme = profile?.programme || 'Maîtrise';

  const handleDeleteSession = useCallback((sessionKey: string) => {
    setLocalSessions((prev) => {
      const { [sessionKey]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const handleAddSession = useCallback((sessionKey: string) => {
    setLocalSessions((prev) => ({
      ...prev,
      [sessionKey]: { ...DEFAULT_SESSION_CONFIG },
    }));
  }, []);

  const handleUpdateSessionConfig = useCallback((sessionKey: string, config: SessionConfig) => {
    setLocalSessions((prev) => ({
      ...prev,
      [sessionKey]: config,
    }));
  }, []);

  const handleSave = useCallback(async () => {
    if (!profile) return;

    const normalizedLocalSessions = normalizeSessionsMap(localSessions);
    // Convert to Firestore format
    const sessionsUpdates: Record<string, SessionConfig | FieldValue> = {};

    Object.entries(normalizedLocalSessions).forEach(([key, config]) => {
      sessionsUpdates[key] = config;
    });

    // Handle deletions
    Object.keys(storedSessions).forEach((key) => {
      if (!Object.hasOwn(localSessions, key)) {
        sessionsUpdates[key] = deleteField();
      }
    });

    await updateDocument(
      {
        profile: {
          ...profile,
          sessions: sessionsUpdates,
        },
      },
      {
        showToast: true,
        successMessage: t('coursPlanifiesMisAJour') as string,
        errorMessage: t('erreurMiseAJourCoursPlanifies') as string,
      },
    );
  }, [profile, localSessions, storedSessions, updateDocument, t]);

  const handleCancel = useCallback(() => {
    setLocalSessions(storedSessions);
  }, [storedSessions]);

  const [searchTerm, setSearchTerm] = useState('');

  const value = useMemo(() => ({
    localSessions,
    sortedSessionKeys,
    previousSession,
    nextSession,
    programme,
    hasChanges,
    searchTerm,
    setSearchTerm,
    onAddSession: handleAddSession,
    onDeleteSession: handleDeleteSession,
    onUpdateSessionConfig: handleUpdateSessionConfig,
    onSave: handleSave,
    onCancel: handleCancel,
  }), [
    localSessions,
    sortedSessionKeys,
    previousSession,
    nextSession,
    programme,
    hasChanges,
    searchTerm,
    handleAddSession,
    handleDeleteSession,
    handleUpdateSessionConfig,
    handleSave,
    handleCancel,
  ]);

  return (
    <PlannedCoursesContext.Provider value={value}>
      {children}
    </PlannedCoursesContext.Provider>
  );
}
