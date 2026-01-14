import { ExpandMore } from '@mui/icons-material';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Theme,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { SessionsMap } from '../../../../../hooks/firebase/types';
import SemesterViewCard from './SemesterViewCard';
import { useTimelineData } from './useTimelineData';
import { fadeInOutAnimation } from '../../../../../utils/animations';

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

interface VerticalTimelineViewProps {
  sessions: SessionsMap;
}

function VerticalTimelineView({ sessions }: VerticalTimelineViewProps): JSX.Element {
  const { t } = useTranslation('common');
  const { academicYearsData, currentAcademicYear, isEmpty } = useTimelineData(sessions);

  const [expandedYears, setExpandedYears] = useState<number[]>(currentAcademicYear !== null ? [currentAcademicYear] : []);

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
        {academicYearsData.map((yearData) => {
          const isCurrentYear = yearData.year === currentAcademicYear;
          const isExpanded = expandedYears.includes(yearData.year);

          return (
            <motion.div
              key={yearData.year}
              {...fadeInOutAnimation}
              style={{ scrollMarginTop: '100px' }}
            >
              <StyledAccordion
                expanded={isExpanded}
                onChange={handleAccordionChange(yearData.year)}
              >
                <StyledAccordionSummary expandIcon={<ExpandMore />}>
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
                </StyledAccordionSummary>
                <StyledAccordionDetails>
                  <SemestersContainer>
                    {yearData.semesters.map((semester) => (
                      <SemesterViewCard
                        key={semester.key}
                        session={semester.session}
                        config={semester.config}
                        seamless
                      />
                    ))}
                  </SemestersContainer>
                </StyledAccordionDetails>
              </StyledAccordion>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </VerticalWrapper>
  );
}

export default VerticalTimelineView;
