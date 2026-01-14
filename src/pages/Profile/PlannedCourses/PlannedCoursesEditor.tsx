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
    defaultValue: CheminementViewMode.EDIT,
    validate: createEnumValidator(CheminementViewMode),
  });

  const [searchTerm, setSearchTerm] = useState('');

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
            <PlannedCoursesHeaderActions
              isEditMode={isEditMode}
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
          isEditMode={isEditMode}
          localSessions={localSessions}
          searchTerm={searchTerm}
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
