import { Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BaseCard } from '../../../../../components/Cards/BaseCard';
import { SessionConfig } from '../../../../../hooks/firebase/types';
import { getSessionTranslation } from '../../../../../utils/Sessions.utils';

const SemesterCard = styled(BaseCard)`
  height: auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const CoursesList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
`;

const CourseItem = styled.div`
  padding: 0.5rem;
  background: ${({ theme }) => (theme as Theme).palette.background.paper};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => (theme as Theme).palette.divider};
  text-align: center;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: span 2;
  padding: 0.5rem;
  color: ${({ theme }) => (theme as Theme).palette.text.disabled};
  font-size: 0.875rem;
`;

interface SemesterViewCardProps {
  session: string;
  config: SessionConfig | undefined;
  totalCredits?: number;
}

function SemesterViewCard({ session, config, totalCredits = 0 }: SemesterViewCardProps): JSX.Element {
  const { t } = useTranslation('common');
  const sessionName = getSessionTranslation(session, t) || session;
  const courses = config?.cours || [];

  const creditsLabel = totalCredits > 0
    ? t('credits', { count: totalCredits })
    : '';

  return (
    <SemesterCard>
      <Header>
        <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
          {sessionName}
        </Typography>
        {creditsLabel && (
          <Typography variant="caption" color="text.secondary">
            {creditsLabel}
          </Typography>
        )}
      </Header>
      <CoursesList>
        {courses.length > 0 ? (
          courses.map((course) => (
            <CourseItem key={course}>
              <Typography variant="body2">{course}</Typography>
            </CourseItem>
          ))
        ) : (
          <EmptyState>{t('aucunCoursPourSession')}</EmptyState>
        )}
      </CoursesList>
    </SemesterCard>
  );
}

export default SemesterViewCard;
