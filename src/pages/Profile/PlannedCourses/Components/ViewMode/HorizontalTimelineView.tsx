import { Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SessionsMap } from '../../../../../hooks/firebase/types';
import { ACADEMIC_YEAR_SEMESTERS_INDICES } from '../../../../../utils/SessionSequence.utils';
import SemesterViewCard from './SemesterViewCard';
import { useTimelineData } from './useTimelineData';

interface TimelineGridProps {
  $columnCount: number;
}

const TimelineWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 1rem;
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
  const { academicYears, academicYearsData, isEmpty } = useTimelineData(sessions);

  if (isEmpty) {
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
        {academicYearsData.map((yearData) => (
          <YearHeader key={`header-${yearData.year}`} variant="caption">
            {yearData.label}
          </YearHeader>
        ))}

        {ACADEMIC_YEAR_SEMESTERS_INDICES.map((semesterIndex) => (
          academicYearsData.map((yearData) => {
            const semester = yearData.semesters[semesterIndex];
            return (
              <SemesterViewCard
                key={semester.key}
                session={semester.session}
                config={semester.config}
              />
            );
          })
        ))}
      </TimelineGrid>
    </TimelineWrapper>
  );
}

export default HorizontalTimelineView;
