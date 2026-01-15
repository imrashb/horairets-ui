import { ExpandMore } from '@mui/icons-material';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Theme,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useGetCours } from '../../../../../features/generateur/generateurQueries';
import { useCreditsLabel } from '../../../../../hooks/useCreditsLabel';
import SemesterViewCard from './SemesterViewCard';
import { AcademicYearData, useTimelineData } from './useTimelineData';
import { fadeInOutAnimation } from '../../../../../utils/animations';
import { usePlannedCourses } from '../../PlannedCoursesContext';

const VerticalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledAccordion = styled(Accordion)`
  &.MuiAccordion-root {
    border-radius: 12px !important;
    border: 1px solid ${({ theme }) => (theme as Theme).palette.divider};
    box-shadow: none;

    &::before {
      display: none;
    }

    &.Mui-expanded {
      margin: 0;
    }
  }
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  &.MuiAccordionSummary-root {
    min-height: 48px;
    padding: 0 1rem;

    &.Mui-expanded {
      min-height: 48px;
    }

    .MuiAccordionSummary-content {
      margin: 0.75rem 0;

      &.Mui-expanded {
        margin: 0.75rem 0;
      }
    }
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  &.MuiAccordionDetails-root {
    padding: 0;
  }
`;

const SemestersContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${({ theme }) => (theme as Theme).palette.text.secondary};
`;

interface YearAccordionItemProps {
  yearData: AcademicYearData;
  isCurrentYear: boolean;
  isExpanded: boolean;
  onAccordionChange: (year: number) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

function YearAccordionItem({
  yearData,
  isCurrentYear,
  isExpanded,
  onAccordionChange,
}: YearAccordionItemProps): JSX.Element {
  const { t } = useTranslation('common');
  const cumulativeLabel = useCreditsLabel(yearData.cumulativeCreditsRange);

  return (
    <motion.div
      {...fadeInOutAnimation}
      style={{ scrollMarginTop: '100px' }}
    >
      <StyledAccordion
        expanded={isExpanded}
        onChange={onAccordionChange(yearData.year)}
      >
        <StyledAccordionSummary expandIcon={<ExpandMore sx={{ fontSize: '2rem' }} />}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" fontWeight={isCurrentYear ? 700 : 600}>
              {yearData.label}
              {isCurrentYear && (
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ ml: 1, color: 'primary.main' }}
                >
                  (
                  {t('anneeEnCours')}
                  )
                </Typography>
              )}
            </Typography>
            {cumulativeLabel && (
              <Typography variant="caption" color="text.secondary">
                {cumulativeLabel}
                {' '}
                {t('total')}
              </Typography>
            )}
          </div>
        </StyledAccordionSummary>
        <StyledAccordionDetails>
          <SemestersContainer>
            {yearData.semesters.map((semester) => (
              <SemesterViewCard
                key={semester.key}
                session={semester.session}
                config={semester.config}
                creditsRange={semester.creditsRange}
                seamless
              />
            ))}
          </SemestersContainer>
        </StyledAccordionDetails>
      </StyledAccordion>
    </motion.div>
  );
}

function VerticalTimelineView(): JSX.Element {
  const { t } = useTranslation('common');
  const { programme, localSessions: sessions, searchTerm } = usePlannedCourses();
  const { data: allCours = [] } = useGetCours(programme ? [programme] : undefined);
  const { academicYearsData, currentAcademicYear, isEmpty } = useTimelineData(sessions, allCours);

  const [expandedYears, setExpandedYears] = useState<number[]>(currentAcademicYear !== null ? [currentAcademicYear] : []);

  useEffect(() => {
    if (searchTerm) {
      setExpandedYears(academicYearsData.map((data) => data.year));
    }
  }, [searchTerm, academicYearsData]);

  const handleAccordionChange = (year: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedYears((prev) => {
      if (isExpanded) {
        return [...prev, year];
      }
      return prev.filter((y) => y !== year);
    });
  };

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
    <VerticalWrapper>
      <AnimatePresence mode="popLayout">
        {academicYearsData.map((yearData) => (
          <YearAccordionItem
            key={yearData.year}
            yearData={yearData}
            isCurrentYear={yearData.year === currentAcademicYear}
            isExpanded={expandedYears.includes(yearData.year)}
            onAccordionChange={handleAccordionChange}
          />
        ))}
      </AnimatePresence>
    </VerticalWrapper>
  );
}

export default VerticalTimelineView;
