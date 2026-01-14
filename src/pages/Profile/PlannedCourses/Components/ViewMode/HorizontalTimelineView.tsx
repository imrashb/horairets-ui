import { Theme, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SessionsMap } from '../../../../../hooks/firebase/types';
import { getAcademicYearRange, getAcademicYearSessions } from '../../../../../utils/SessionSequence.utils';
import SemesterViewCard from './SemesterViewCard';

interface TimelineGridProps {
  $columnCount: number;
}

const TimelineWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 1rem;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => (theme as Theme).palette.grey[200]};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme as Theme).palette.primary.main};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => (theme as Theme).palette.primary.dark};
    }
  }

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${(theme as Theme).palette.primary.main} ${(theme as Theme).palette.grey[200]}`};
`;

const TimelineGrid = styled.div<TimelineGridProps>`
  display: grid;
  grid-template-columns: repeat(${({ $columnCount }) => $columnCount}, 220px);
  grid-template-rows: auto auto auto auto;
  gap: 0.75rem;
  column-gap: 2rem;
`;

const YearHeader = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => (theme as Theme).palette.text.secondary};
  text-align: center;
  padding: 0.25rem;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${({ theme }) => (theme as Theme).palette.text.secondary};
`;

interface HorizontalTimelineViewProps {
  sessions: SessionsMap;
}

function HorizontalTimelineView({ sessions }: HorizontalTimelineViewProps): JSX.Element {
  const { t } = useTranslation('common');

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

  const gridItems = useMemo(() => {
    if (academicYears.length === 0) return { headers: [], rows: [] };

    const headers = academicYears.map((year) => ({
      key: `header-${year}`,
      label: t('anneeAcademique', { startYear: year, endYear: year + 1 }),
    }));

    // Build 3 rows: Automne, Hiver, Été
    const rows: Array<{ key: string; session: string; config: SessionsMap[string] | undefined }[]> = [
      [], // Automne row
      [], // Hiver row
      [], // Été row
    ];

    academicYears.forEach((year) => {
      getAcademicYearSessions(year).forEach((session, index) => {
        rows[index].push({ key: session, session, config: sessions[session] });
      });
    });

    return { headers, rows };
  }, [academicYears, sessions, t]);

  if (academicYears.length === 0) {
    return (
      <EmptyState>
        <Typography variant="body1" color="text.secondary">
          {t('aucunCoursPlanifie')}
        </Typography>
      </EmptyState>
    );
  }

  return (
    <TimelineWrapper>
      <TimelineGrid $columnCount={academicYears.length}>
        {/* Year headers row */}
        {gridItems.headers.map((header) => (
          <YearHeader key={header.key} variant="caption">
            {header.label}
          </YearHeader>
        ))}

        {/* Semester rows */}
        {gridItems.rows.map((row) => row.map((cell) => (
          <SemesterViewCard
            key={cell.key}
            session={cell.session}
            config={cell.config}
          />
        )))}
      </TimelineGrid>
    </TimelineWrapper>
  );
}

export default HorizontalTimelineView;
