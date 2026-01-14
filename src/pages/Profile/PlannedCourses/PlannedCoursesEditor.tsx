import { Route } from '@mui/icons-material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ContentCard from '../../../components/Cards/ContentCard';
import SmartSaveButtons from '../../../components/SmartSaveButtons';
import useUserDocument from '../../../hooks/firebase/useUserDocument';
import { UserDocument } from '../../../hooks/firebase/types';
import { PlannedCoursesProvider, usePlannedCourses } from './PlannedCoursesContext';
import { CheminementViewMode } from './PlannedCourses.constants';
import ViewModeToggle from './Components/ViewMode/ViewModeToggle';
import PlannedCoursesContentView from './Components/PlannedCoursesContentView';

function PlannedCoursesContent(): JSX.Element {
  const { t } = useTranslation('common');
  const { data: userDoc } = useUserDocument<UserDocument>();
  const profile = userDoc?.profile;

  const [viewMode, setViewMode] = useState<CheminementViewMode>(CheminementViewMode.EDIT);

  const {
    localSessions,
    hasChanges,
    onSave,
    onCancel,
  } = usePlannedCourses();

  const isEditMode = viewMode === CheminementViewMode.EDIT;

  return (
    <>
      <ContentCard
        icon={<Route />}
        title={t('cheminement')}
        titleActions={
          profile?.admissionSession && (
            <ViewModeToggle
              value={viewMode}
              onChange={setViewMode}
              disabled={hasChanges}
            />
          )
        }
      >
        <PlannedCoursesContentView
          profile={profile}
          isEditMode={isEditMode}
          localSessions={localSessions}
        />
      </ContentCard>
      {isEditMode && (
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
