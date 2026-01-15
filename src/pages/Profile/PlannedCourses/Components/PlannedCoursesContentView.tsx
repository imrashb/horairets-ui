import { School } from '@mui/icons-material';
import {
  Theme, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { SessionsMap, UserProfile } from '../../../../hooks/firebase/types';
import EditProfileDialog from '../../Dialogs/EditProfileDialog';
import { PlannedSessionsGrid } from '../PlannedSessionsGrid';
import HorizontalTimelineView from './ViewMode/HorizontalTimelineView';
import VerticalTimelineView from './ViewMode/VerticalTimelineView';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  background-color: ${({ theme }) => (theme as Theme).palette.action.hover};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => (theme as Theme).palette.divider};
`;

interface PlannedCoursesContentViewProps {
  profile: UserProfile | undefined;
  isSessionsMode: boolean;
  localSessions: SessionsMap;
  searchTerm?: string;
}

function PlannedCoursesContentView({
  profile,
  isSessionsMode,
  localSessions,
  searchTerm = '',
}: PlannedCoursesContentViewProps): JSX.Element {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  if (!profile?.admissionSession) {
    return (
      <EmptyStateContainer>
        <School sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          {t('commencezPlanification')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
          {t('selectionnezAdmissionDescription')}
        </Typography>
        <EditProfileDialog currentProfile={profile} />
      </EmptyStateContainer>
    );
  }

  if (isSessionsMode) {
    return <PlannedSessionsGrid />;
  }

  if (isDesktop) {
    return <HorizontalTimelineView sessions={localSessions} searchTerm={searchTerm} />;
  }

  return <VerticalTimelineView sessions={localSessions} searchTerm={searchTerm} />;
}

export default PlannedCoursesContentView;
