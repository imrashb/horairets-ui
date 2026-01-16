import { Theme, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CourseDetailsDialog from '../../../../../components/Dialogs/CourseDetailsDialog';

import { usePlannedCourses } from '../../PlannedCoursesContext';

const CoursesListWrapper = styled.div<{ $seamless?: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;

  ${({ theme, $seamless }) => $seamless && `
    ${(theme as Theme).breakpoints.down('md')} {
      grid-template-columns: 1fr;
      padding: 0.5rem 1rem 1rem 1rem;
      gap: 0.5rem;
    }
  `}
`;

const CourseItem = styled.div<{ $highlight?: boolean }>`
  padding: 0.5rem;
  background: ${({ theme, $highlight }) => ($highlight
    ? (theme as Theme).palette.primary.main
    : (theme as Theme).palette.grey[100])};
  border-radius: 6px;
  border: 1px solid ${({ theme, $highlight }) => ($highlight
    ? (theme as Theme).palette.primary.main
    : (theme as Theme).palette.divider)};
  text-align: center;

  ${({ $highlight, theme }) => $highlight && `
    color: ${(theme as Theme).palette.primary.contrastText};
  `}

  box-shadow: ${({ theme }) => (theme as Theme).shadows[2]};

  transition: all 0.2s linear;
  cursor: pointer;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1 / -1;
  padding: 0.5rem;
  color: ${({ theme }) => (theme as Theme).palette.text.disabled};
  font-size: 0.875rem;
`;

interface SemesterCoursesListProps {
  courses: { sigle: string; group: string | null }[];
  session: string;
  seamless?: boolean;
}

function SemesterCoursesList({
  courses,
  session,
  seamless = false,
}: SemesterCoursesListProps): JSX.Element {
  const { t } = useTranslation('common');
  const { searchTerm } = usePlannedCourses();

  const [selectedSigle, setSelectedSigle] = useState<string | null>(null);

  return (
    <CoursesListWrapper $seamless={seamless}>
      {courses.length > 0 ? (
        courses.map((course) => {
          const fullString = `${course.sigle}${course.group ? `-${course.group}` : ''}`;
          const isMatch = !!(searchTerm && fullString.toLowerCase().includes(searchTerm.toLowerCase()));
          return (
            <CourseDetailsDialog
              key={course.sigle}
              open={selectedSigle === course.sigle}
              sigle={course.sigle}
              session={session}
              groupe={course.group || undefined}
              onClose={() => setSelectedSigle(null)}
              activator={(
                <CourseItem
                  $highlight={isMatch}
                  onClick={() => setSelectedSigle(course.sigle)}
                >
                  <Typography variant={seamless ? 'body1' : 'body2'} color={isMatch ? 'inherit' : 'text.primary'}>
                    {course.sigle}
                    {course.group && `-${course.group}`}
                  </Typography>
                </CourseItem>
              )}
            />
          );
        })
      ) : (
        <EmptyState>{t('aucunCoursPourSession')}</EmptyState>
      )}
    </CoursesListWrapper>
  );
}

export default SemesterCoursesList;
