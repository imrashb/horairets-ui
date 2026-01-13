import { deleteField } from 'firebase/firestore';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import {
  useEffect, useMemo, useState, useRef,
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

const DEFAULT_SESSION_CONFIG: SessionConfig = {
  cours: [],
  coursObligatoires: [],
  nombreCours: null,
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

function getBaseSession(profile: UserDocument['profile']): string {
  return profile?.admissionSession || getCurrentSession();
}

export function usePlannedCourses() {
  const { t } = useTranslation('common');
  const { data: userDoc, updateDocument } = useUserDocument<UserDocument>();

  const profile = userDoc?.profile;

  const profileSessions = profile?.sessions || {};
  const storedSessionsRef = useRef(profileSessions);

  if (!isEqual(storedSessionsRef.current, profileSessions)) {
    storedSessionsRef.current = profileSessions;
  }

  const storedSessions = storedSessionsRef.current;

  const [localSessions, setLocalSessions] = useState<SessionsMap>(storedSessions);

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

  const handleDeleteSession = (sessionKey: string) => {
    setLocalSessions((prev) => {
      const { [sessionKey]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleAddSession = (sessionKey: string) => {
    setLocalSessions((prev) => ({
      ...prev,
      [sessionKey]: { ...DEFAULT_SESSION_CONFIG },
    }));
  };

  const handleUpdateSessionConfig = (sessionKey: string, config: SessionConfig) => {
    setLocalSessions((prev) => ({
      ...prev,
      [sessionKey]: config,
    }));
  };

  const handleSave = async () => {
    if (!profile) return;

    const normalizedLocalSessions = normalizeSessionsMap(localSessions);
    const sessionsUpdates: Record<string, any> = { ...normalizedLocalSessions };

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
  };

  const handleCancel = () => {
    setLocalSessions(storedSessions);
  };

  return {
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
  };
}
