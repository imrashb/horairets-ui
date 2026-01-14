import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SessionConfig, SessionsMap } from '../../../../../hooks/firebase/types';
import { getAcademicYearRange, getAcademicYearSessions } from '../../../../../utils/SessionSequence.utils';

export interface AcademicYearData {
  year: number;
  label: string;
  semesters: Array<{
    key: string;
    session: string;
    config: SessionConfig | undefined;
  }>;
}

export interface TimelineData {
  academicYears: number[];
  academicYearsData: AcademicYearData[];
  currentAcademicYear: number | null;
  isEmpty: boolean;
}

function getCurrentAcademicYear(): number {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const isBeforeSeptember = month < 8;

  if (isBeforeSeptember) {
    return year - 1;
  }
  return year;
}

export function useTimelineData(sessions: SessionsMap): TimelineData {
  const academicYears = useMemo(() => {
    const sessionKeys = Object.keys(sessions);
    const range = getAcademicYearRange(sessionKeys);

    if (!range) return [];

    const years: number[] = [];
    for (let year = range.minYear; year <= range.maxYear; year++) {
      years.push(year);
    }
    return years;
  }, [sessions]);

  const currentAcademicYear = useMemo(() => {
    const current = getCurrentAcademicYear();
    // Only return current year if it's within our range
    if (academicYears.includes(current)) {
      return current;
    }
    return null;
  }, [academicYears]);

  const academicYearsData = useMemo((): AcademicYearData[] => academicYears.map((year) => {
    const sessionKeys = getAcademicYearSessions(year);
    return {
      year,
      label: `${year}-${year + 1}`,
      semesters: sessionKeys.map((session) => ({
        key: session,
        session,
        config: sessions[session],
      })),
    };
  }), [academicYears, sessions]);

  return {
    academicYears,
    academicYearsData,
    currentAcademicYear,
    isEmpty: academicYears.length === 0,
  };
}
