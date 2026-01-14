import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { fadeInOutAnimation } from '../../../utils/animations';
import { isSessionSameOrAfter, isSessionSameOrBefore } from '../../../utils/Sessions.utils';
import { getNextSession } from '../../../utils/SessionSequence.utils';
import { AddSessionCard } from './Components/AddSessionCard';
import SessionCard from './Components/SessionCard';
import { usePlannedCourses } from './PlannedCoursesContext';
import useUserDocument from '../../../hooks/firebase/useUserDocument';
import { UserDocument } from '../../../hooks/firebase/types';

export function PlannedSessionsGrid(): JSX.Element {
  const {
    localSessions,
    sortedSessionKeys,
    previousSession,
    nextSession,
  } = usePlannedCourses();

  const { data: userDoc } = useUserDocument<UserDocument>();
  const profile = userDoc?.profile;
  const admissionSession = profile?.admissionSession;

  if (!admissionSession) return <></>;

  const hasPlannedSessions = sortedSessionKeys.length > 0;
  const isPreviousSessionValid = hasPlannedSessions && isSessionSameOrAfter(previousSession, admissionSession);

  const renderSessionRangeWithGaps = () => {
    if (!hasPlannedSessions) return [];

    const items: JSX.Element[] = [];
    const firstSession = sortedSessionKeys[0];
    const lastSession = sortedSessionKeys[sortedSessionKeys.length - 1];

    let currentSession = firstSession;

    while (isSessionSameOrBefore(currentSession, lastSession)) {
      const sessionKey = currentSession;
      const isPlanned = Object.hasOwn(localSessions, sessionKey);

      if (isPlanned) {
        items.push(
          <motion.div key={sessionKey} layout {...fadeInOutAnimation}>
            <SessionCard session={sessionKey} />
          </motion.div>,
        );
      } else {
        items.push(
          <motion.div key={`gap-${sessionKey}`} layout {...fadeInOutAnimation}>
            <AddSessionCard session={sessionKey} />
          </motion.div>,
        );
      }
      currentSession = getNextSession(currentSession);
    }
    return items;
  };

  return (
    <AnimatePresence mode="popLayout">
      {isPreviousSessionValid && (
        <motion.div key={`prev-${previousSession}`} layout {...fadeInOutAnimation}>
          <AddSessionCard session={previousSession} />
        </motion.div>
      )}

      {renderSessionRangeWithGaps()}

      <motion.div key={`next-${nextSession}`} layout {...fadeInOutAnimation}>
        <AddSessionCard session={nextSession} />
      </motion.div>
    </AnimatePresence>
  );
}
