import { Route } from '@mui/icons-material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContentCard from '../../../components/Cards/ContentCard';
import SmartSaveButtons from '../../../components/SmartSaveButtons';
import useUserDocument from '../../../hooks/firebase/useUserDocument';
import { UserDocument } from '../../../hooks/firebase/types';
import { createEnumValidator, useQueryParam } from '../../../hooks/useQueryParam';
import { PlannedCoursesProvider, usePlannedCourses } from './PlannedCoursesContext';
import { CheminementViewMode } from './PlannedCourses.constants';
import PlannedCoursesContentView from './Components/PlannedCoursesContentView';
import PlannedCoursesHeaderActions from './Components/PlannedCoursesHeaderActions';

function PlannedCoursesContent(): JSX.Element {
  const { t } = useTranslation('common');
  const { data: userDoc } = useUserDocument<UserDocument>();
  const profile = userDoc?.profile;

  const [viewMode, setViewMode] = useQueryParam<CheminementViewMode>('mode', {
    defaultValue: CheminementViewMode.SESSIONS,
    validate: createEnumValidator(CheminementViewMode),
  });

  const [searchTerm, setSearchTerm] = useState('');

  const {
    localSessions,
    hasChanges,
    onSave,
    onCancel,
  } = usePlannedCourses();

  const isSessionsMode = viewMode === CheminementViewMode.SESSIONS;

  return (
    <>
      <ContentCard
        icon={<Route />}
        title={t('cheminement')}
        titleActions={
          profile?.admissionSession && (
            <PlannedCoursesHeaderActions
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              hasChanges={hasChanges}
            />
          )
        }
      >
        <PlannedCoursesContentView
          profile={profile}
          isSessionsMode={isSessionsMode}
          localSessions={localSessions}
          searchTerm={searchTerm}
        />
      </ContentCard>
      {isSessionsMode && (
        <SmartSaveButtons
          hasChanges={hasChanges}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
    </>
  );
}

function PlannedCoursesEditor(): JSX.Element {
  return (
    <PlannedCoursesProvider>
      <PlannedCoursesContent />
    </PlannedCoursesProvider>
  );
}

export default PlannedCoursesEditor;
