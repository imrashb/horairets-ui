import { useMemo } from 'react';
import { SessionConfig, SessionsMap } from '../../../../../hooks/firebase/types';
import { getAcademicYearRange, getAcademicYearSessions } from '../../../../../utils/SessionSequence.utils';
import { Cours } from '../../../../../features/generateur/generateur.types';
import {
  calculateCreditsRange, CreditsRange, EMPTY_CREDITS_RANGE, sumCreditsRanges,
} from '../../../../../utils/credits.utils';

export interface SemesterData {
  key: string;
  session: string;
  config: SessionConfig | undefined;
  creditsRange: CreditsRange;
}

export interface AcademicYearData {
  year: number;
  label: string;
  semesters: SemesterData[];
  creditsRange: CreditsRange;
  cumulativeCreditsRange: CreditsRange;
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

export function useTimelineData(sessions: SessionsMap, allCours: Cours[] = []): TimelineData {
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
    if (academicYears.includes(current)) {
      return current;
    }
    return null;
  }, [academicYears]);

  const academicYearsData = useMemo((): AcademicYearData[] => {
    let cumulativeMin = 0;
    let cumulativeMax = 0;

    return academicYears.map((year) => {
      const sessionKeys = getAcademicYearSessions(year);
      const semesters: SemesterData[] = sessionKeys.map((session) => {
        const config = sessions[session];
        const creditsRange = config
          ? calculateCreditsRange(allCours, config)
          : EMPTY_CREDITS_RANGE;

        return {
          key: session,
          session,
          config,
          creditsRange,
        };
      });

      const yearCreditsRange = sumCreditsRanges(semesters.map((s) => s.creditsRange));

      cumulativeMin += yearCreditsRange.min;
      cumulativeMax += yearCreditsRange.max;

      return {
        year,
        label: `${year}-${year + 1}`,
        semesters,
        creditsRange: yearCreditsRange,
        cumulativeCreditsRange: { min: cumulativeMin, max: cumulativeMax },
      };
    });
  }, [academicYears, sessions, allCours]);

  return {
    academicYears,
    academicYearsData,
    currentAcademicYear,
    isEmpty: academicYears.length === 0,
  };
}
