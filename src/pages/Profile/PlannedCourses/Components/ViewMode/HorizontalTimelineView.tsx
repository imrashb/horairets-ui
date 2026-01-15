import { Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SessionsMap } from '../../../../../hooks/firebase/types';
import { ACADEMIC_YEAR_SEMESTERS_INDICES } from '../../../../../utils/SessionSequence.utils';
import { fadeInOutAnimation } from '../../../../../utils/animations';
import { useGetCours } from '../../../../../features/generateur/generateurQueries';
import { useCreditsLabel } from '../../../../../hooks/useCreditsLabel';
import SemesterViewCard from './SemesterViewCard';
import { useTimelineData } from './useTimelineData';
import { usePlannedCourses } from '../../PlannedCoursesContext';

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

const YearHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.25rem;
`;

const YearHeader = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => (theme as Theme).palette.text.secondary};
  text-align: center;
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
  searchTerm?: string;
}

interface YearHeaderWithCreditsProps {
  label: string;
  cumulativeCreditsRange: { min: number; max: number };
}

function YearHeaderWithCredits({
  label,
  cumulativeCreditsRange,
}: YearHeaderWithCreditsProps): JSX.Element {
  const { t } = useTranslation('common');
  const cumulativeLabel = useCreditsLabel(cumulativeCreditsRange);

  return (
    <YearHeaderContainer>
      <YearHeader variant="h6">
        {label}
      </YearHeader>
      {cumulativeLabel && (
        <Typography variant="caption" color="text.secondary">
          {cumulativeLabel}
          {' '}
          {t('total')}
        </Typography>
      )}
    </YearHeaderContainer>
  );
}

function HorizontalTimelineView({ sessions, searchTerm }: HorizontalTimelineViewProps): JSX.Element {
  const { t } = useTranslation('common');
  const { programme } = usePlannedCourses();
  const { data: allCours = [] } = useGetCours(programme ? [programme] : undefined);
  const { academicYears, academicYearsData, isEmpty } = useTimelineData(sessions, allCours);

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
          <YearHeaderWithCredits
            key={`header-${yearData.year}`}
            label={yearData.label}
            cumulativeCreditsRange={yearData.cumulativeCreditsRange}
          />
        ))}

        {ACADEMIC_YEAR_SEMESTERS_INDICES.map((semesterIndex) => (
          academicYearsData.map((yearData) => {
            const semester = yearData.semesters[semesterIndex];
            return (
              <motion.div
                key={semester.key}
                {...fadeInOutAnimation}
                layout
                style={{
                  height: '100%',
                }}
              >
                <SemesterViewCard
                  session={semester.session}
                  config={semester.config}
                  creditsRange={semester.creditsRange}
                  searchTerm={searchTerm}
                />
              </motion.div>
            );
          })
        ))}
      </TimelineGrid>
    </TimelineWrapper>
  );
}

export default HorizontalTimelineView;
