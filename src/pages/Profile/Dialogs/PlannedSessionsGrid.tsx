import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { SessionConfig, SessionsMap } from "../../../hooks/firebase/types";
import { fadeInOutAnimation } from "../../../utils/animations";
import { isSessionSameOrAfter, isSessionSameOrBefore } from "../../../utils/Sessions.utils";
import { getNextSession } from "../../../utils/SessionSequence.utils";
import { AddSessionCard } from "./AddSessionCard";
import SessionCard from "./SessionCard";

interface PlannedSessionsGridProps {
  localSessions: SessionsMap;
  sortedSessionKeys: string[];
  admissionSession?: string;
  programme?: string;
  previousSession: string;
  nextSession: string;
  onAddSession: (sessionKey: string) => void;
  onDeleteSession: (sessionKey: string) => void;
  onUpdateSessionConfig: (sessionKey: string, config: SessionConfig) => void;
}

export function PlannedSessionsGrid({
  localSessions,
  sortedSessionKeys,
  admissionSession,
  programme,
  previousSession,
  nextSession,
  onAddSession,
  onDeleteSession,
  onUpdateSessionConfig,
}: PlannedSessionsGridProps): JSX.Element {

  
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
            <SessionCard
              session={sessionKey}
              config={localSessions[sessionKey]}
              programme={programme}
              onUpdateConfig={(config) => onUpdateSessionConfig(sessionKey, config)}
              onDeleteSession={() => onDeleteSession(sessionKey)}
            />
          </motion.div>
        );
      } else {
        items.push(
          <motion.div key={`gap-${sessionKey}`} layout {...fadeInOutAnimation}>
            <AddSessionCard
              session={sessionKey}
              onAdd={() => onAddSession(sessionKey)}
            />
          </motion.div>
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
          <AddSessionCard
            session={previousSession}
            onAdd={() => onAddSession(previousSession)}
          />
        </motion.div>
      )}
      
      {renderSessionRangeWithGaps()}
      
      <motion.div key={`next-${nextSession}`} layout {...fadeInOutAnimation}>
        <AddSessionCard
          session={nextSession}
          onAdd={() => onAddSession(nextSession)}
        />
      </motion.div>
    </AnimatePresence>
  );
}
