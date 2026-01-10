import React from "react";
import { SessionConfig, SessionsMap } from "../../../hooks/firebase/types";
import { isSessionSameOrAfter, isSessionSameOrBefore } from "../../../utils/Sessions.utils";
import { getNextSession } from "../../../utils/SessionSequence.utils";
import { AddSessionCard } from "./AddSessionCard";
import SessionCard from "./SessionCard";

interface PlannedSessionsGridProps {
  localSessions: SessionsMap;
  sortedSessionKeys: string[];
  admissionSession?: string;
  programme: string;
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

  // Helper to determine if we can add a session before the current range
  const hasPlannedSessions = sortedSessionKeys.length > 0;
  const isPreviousSessionValid = hasPlannedSessions && isSessionSameOrAfter(previousSession, admissionSession);

  const renderSessionRangeWithGaps = () => {
    if (!hasPlannedSessions) return [];
    
    const items: JSX.Element[] = [];
    const firstSession = sortedSessionKeys[0];
    const lastSession = sortedSessionKeys[sortedSessionKeys.length - 1];
    
    let currentSession = firstSession;
    
    while (isSessionSameOrBefore(currentSession, lastSession)) {
      // Capture loop variable for closure scope
      const sessionKey = currentSession;
      const isPlanned = Object.hasOwn(localSessions, sessionKey);

      if (isPlanned) {
        items.push(
          <SessionCard
            key={sessionKey}
            session={sessionKey}
            config={localSessions[sessionKey]}
            programme={programme}
            onUpdateConfig={(config) => onUpdateSessionConfig(sessionKey, config)}
            onDeleteSession={() => onDeleteSession(sessionKey)}
          />
        );
      } else {
        items.push(
           <AddSessionCard 
             key={`gap-${sessionKey}`} 
             session={sessionKey} 
             onAdd={() => onAddSession(sessionKey)} 
           />
        );
      }
      currentSession = getNextSession(currentSession);
    }
    return items;
  };

  return (
    <>
      {isPreviousSessionValid && (
        <AddSessionCard 
          key={`prev-${previousSession}`} 
          session={previousSession} 
          onAdd={() => onAddSession(previousSession)} 
        />
      )}
      
      {renderSessionRangeWithGaps()}
      
      <AddSessionCard 
        key={`next-${nextSession}`} 
        session={nextSession} 
        onAdd={() => onAddSession(nextSession)} 
      />
    </>
  );
}
