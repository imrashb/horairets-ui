import { Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BaseCard } from '../../../../../components/Cards/BaseCard';
import { SessionConfig } from '../../../../../hooks/firebase/types';
import { getSessionTranslation, parseScheduleId } from '../../../../../utils/Sessions.utils';
import { useSelectedSchedule } from '../../../../../hooks/firebase';
import { useCreditsLabel } from '../../../../../hooks/useCreditsLabel';
import { CreditsRange } from '../../../../../utils/credits.utils';
import ViewSelectedScheduleButton from '../ViewSelectedScheduleButton';
import SemesterCoursesList from './SemesterCoursesList';

const SemesterCardDesktop = styled(BaseCard)`
  height: 100%;
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

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const StickyHeader = styled.div<{ $seamless?: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ $seamless, theme }) => ($seamless ? `
    padding: 0.5rem 1rem;
    background: ${(theme as Theme).palette.background.paper};
    border-bottom: 1px solid ${(theme as Theme).palette.divider};
  ` : `
    gap: 0.25rem;
  `)}
`;

interface SemesterViewCardProps {
  session: string;
  config: SessionConfig | undefined;
  creditsRange?: CreditsRange;
  seamless?: boolean;
  searchTerm?: string;
}

function SemesterViewCard({
  session,
  config,
  creditsRange,
  seamless = false,
  searchTerm,
}: SemesterViewCardProps): JSX.Element {
  const { t } = useTranslation('common');
  const sessionName = getSessionTranslation(session, t) || session;
  const { getSelectedSchedule } = useSelectedSchedule();

  const selectedScheduleId = getSelectedSchedule(session);
  const parsedSchedule = selectedScheduleId ? parseScheduleId(selectedScheduleId) : null;

  const coursesToDisplay = parsedSchedule
    ? parsedSchedule.courses.map((c) => ({ sigle: c.sigle, group: c.group }))
    : (config?.cours || []).map((c) => ({ sigle: c, group: null as string | null }));

  const creditsLabel = useCreditsLabel(creditsRange || { min: 0, max: 0 });

  const content = (
    <>
      <StickyHeader $seamless={seamless}>
        <HeaderRow>
          <Typography variant={seamless ? 'subtitle1' : 'subtitle2'} fontWeight="bold" textAlign="center">
            {sessionName}
          </Typography>
          {selectedScheduleId && (
            <div style={{ position: 'absolute', right: 0, display: 'flex' }}>
              <ViewSelectedScheduleButton session={session} />
            </div>
          )}
        </HeaderRow>
        {creditsLabel && (
          <Typography variant="caption" color="text.secondary" textAlign="center">
            {creditsLabel}
          </Typography>
        )}
      </StickyHeader>
      <SemesterCoursesList
        courses={coursesToDisplay}
        searchTerm={searchTerm}
        seamless={seamless}
      />
    </>
  );

  if (seamless) {
    return <SemesterCardMobile>{content}</SemesterCardMobile>;
  }

  return <SemesterCardDesktop>{content}</SemesterCardDesktop>;
}

export default SemesterViewCard;
