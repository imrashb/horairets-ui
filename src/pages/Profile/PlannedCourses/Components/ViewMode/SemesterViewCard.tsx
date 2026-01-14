import { Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BaseCard } from '../../../../../components/Cards/BaseCard';
import { SessionConfig } from '../../../../../hooks/firebase/types';
import { getSessionTranslation } from '../../../../../utils/Sessions.utils';

import { APP_LAYOUT_NAVBAR_HEIGHT } from '../../../../../components/Layout/AppLayout';

const SemesterCardDesktop = styled(BaseCard)`
  height: auto;
`;

const SemesterCardMobile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => (theme as Theme).palette.divider};

  &:last-child {
    border-bottom: none;
  }
`;

const StickyHeader = styled.div<{ $seamless?: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ $seamless, theme }) => ($seamless ? `
    padding: 0.5rem 1rem;
    position: sticky;
    top: ${APP_LAYOUT_NAVBAR_HEIGHT};
    z-index: 1;
    background: ${(theme as Theme).palette.background.paper};
    border-bottom: 1px solid ${(theme as Theme).palette.divider};
  ` : `
    gap: 0.25rem;
  `)}
`;

const CoursesList = styled.div<{ $seamless?: boolean }>`
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

const CourseItem = styled.div`
  padding: 0.5rem;
  background: ${({ theme }) => (theme as Theme).palette.grey[100]};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => (theme as Theme).palette.divider};
  text-align: center;
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

interface SemesterViewCardProps {
  session: string;
  config: SessionConfig | undefined;
  totalCredits?: number;
  seamless?: boolean;
}

function SemesterViewCard({
  session,
  config,
  totalCredits = 0,
  seamless = false,
}: SemesterViewCardProps): JSX.Element {
  const { t } = useTranslation('common');
  const sessionName = getSessionTranslation(session, t) || session;
  const courses = config?.cours || [];

  const creditsLabel = totalCredits > 0
    ? t('credits', { count: totalCredits })
    : '';

  const content = (
    <>
      <StickyHeader $seamless={seamless}>
        <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
          {sessionName}
        </Typography>
        {creditsLabel && (
          <Typography variant="caption" color="text.secondary" textAlign="center">
            {creditsLabel}
          </Typography>
        )}
      </StickyHeader>
      <CoursesList $seamless={seamless}>
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
    </>
  );

  if (seamless) {
    return <SemesterCardMobile>{content}</SemesterCardMobile>;
  }

  return <SemesterCardDesktop>{content}</SemesterCardDesktop>;
}

export default SemesterViewCard;
