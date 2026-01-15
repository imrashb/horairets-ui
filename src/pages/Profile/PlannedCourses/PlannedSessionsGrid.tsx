import { Theme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import { fadeInOutAnimation } from '../../../utils/animations';
import { isSessionSameOrAfter, isSessionSameOrBefore } from '../../../utils/Sessions.utils';
import { getNextSession } from '../../../utils/SessionSequence.utils';
import { AddSessionCard } from './Components/AddSessionCard';
import SessionCard from './Components/SessionCard';
import { usePlannedCourses } from './PlannedCoursesContext';
import useUserDocument from '../../../hooks/firebase/useUserDocument';
import { UserDocument } from '../../../hooks/firebase/types';

const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  ${({ theme }) => (theme as Theme).breakpoints.down('lg')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => (theme as Theme).breakpoints.down('md')} {
    grid-template-columns: 1fr;
  }
`;

interface PlannedSessionsGridProps {
  searchTerm?: string;
}

export function PlannedSessionsGrid({ searchTerm }: PlannedSessionsGridProps): JSX.Element {
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
            <SessionCard session={sessionKey} searchTerm={searchTerm} />
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
    <SessionsGrid>
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
    </SessionsGrid>
  );
}
