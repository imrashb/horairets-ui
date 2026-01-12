import { useGetCours, useGetCoursSession, useGetSessions } from '../../../features/generateur/generateurQueries';

export function useSessionCourses(session: string, programme?: string) {
  const { data: availableSessions = [], isLoading: isLoadingSessions } = useGetSessions();
  const isSessionAvailable = availableSessions.includes(session);

  const { data: coursesSession, isLoading: isLoadingSession } = useGetCoursSession(
    session,
    programme || "",
    isSessionAvailable && !isLoadingSessions
  );

  const { data: coursesGlobal, isLoading: isLoadingGlobal } = useGetCours(
    programme ? [programme] : undefined,
    !isSessionAvailable && !isLoadingSessions
  );

  const allCours = (isSessionAvailable ? coursesSession : coursesGlobal) || [];
  const isCoursLoading = isLoadingSessions || (isSessionAvailable ? isLoadingSession : isLoadingGlobal);

  return {
    allCours,
    isCoursLoading,
    isSessionAvailable,
    isLoadingSessions,
  };
}
