import React from 'react';

import { useTranslation } from 'react-i18next';
import { CheminementViewMode } from '../PlannedCourses.constants';
import ViewModeToggle from './ViewMode/ViewModeToggle';
import ResponsiveSearchBar from './ResponsiveSearchBar';

interface PlannedCoursesHeaderActionsProps {
  isSessionsMode: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: CheminementViewMode;
  onViewModeChange: (mode: CheminementViewMode) => void;
  hasChanges: boolean;
}

function PlannedCoursesHeaderActions({
  isSessionsMode,
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  hasChanges,
}: PlannedCoursesHeaderActionsProps): JSX.Element {
  const { t } = useTranslation('common');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {!isSessionsMode && (
        <ResponsiveSearchBar
          value={searchTerm}
          onChange={onSearchChange}
          placeholder={t('rechercherUnCours') as string}
        />
      )}
      <ViewModeToggle
        value={viewMode}
        onChange={onViewModeChange}
        disabled={hasChanges}
      />
    </div>
  );
}

export default PlannedCoursesHeaderActions;
