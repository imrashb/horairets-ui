import { Route, School } from '@mui/icons-material';
import { Theme, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import SmartSaveButtons from '../../../components/SmartSaveButtons';
import EditProfileDialog from './EditProfileDialog';
import { PlannedSessionsGrid } from './PlannedSessionsGrid';
import { usePlannedCourses } from './usePlannedCourses';

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SessionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  ${({ theme }) => (theme as Theme).breakpoints.down('lg')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${({ theme }) => (theme as Theme).breakpoints.down('md')} {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

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

function PlannedCoursesEditor(): JSX.Element {
  const { t } = useTranslation('common');

  const {
    profile,
    localSessions,
    sortedSessionKeys,
    previousSession,
    nextSession,
    programme,
    hasChanges,
    handleAddSession,
    handleDeleteSession,
    handleUpdateSessionConfig,
    handleSave,
    handleCancel,
  } = usePlannedCourses();

  return (
    <>
      <Header>
        <Typography
          variant="h6"
          className="card-title"
          sx={{
            mb: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Route />
          {t('coursPlanifies')}
        </Typography>
      </Header>
      <EditorWrapper>
        {!profile?.admissionSession ? (
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
        ) : (
          <SessionsGrid>
            <PlannedSessionsGrid
              localSessions={localSessions}
              sortedSessionKeys={sortedSessionKeys}
              admissionSession={profile?.admissionSession}
              programme={programme}
              previousSession={previousSession}
              nextSession={nextSession}
              onAddSession={handleAddSession}
              onDeleteSession={handleDeleteSession}
              onUpdateSessionConfig={handleUpdateSessionConfig}
            />
          </SessionsGrid>
        )}
      </EditorWrapper>
      <SmartSaveButtons
        hasChanges={hasChanges}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  );
}

export default PlannedCoursesEditor;
