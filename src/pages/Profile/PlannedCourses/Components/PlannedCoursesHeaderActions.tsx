import React from 'react';

import { useTranslation } from 'react-i18next';
import { CheminementViewMode } from '../PlannedCourses.constants';
import ViewModeToggle from './ViewMode/ViewModeToggle';
import ResponsiveSearchBar from './ResponsiveSearchBar';

import { usePlannedCourses } from '../PlannedCoursesContext';

interface PlannedCoursesHeaderActionsProps {
  viewMode: CheminementViewMode;
  onViewModeChange: (mode: CheminementViewMode) => void;
  hasChanges: boolean;
}

function PlannedCoursesHeaderActions({
  viewMode,
  onViewModeChange,
  hasChanges,
}: PlannedCoursesHeaderActionsProps): JSX.Element {
  const { t } = useTranslation('common');
  const { searchTerm, setSearchTerm } = usePlannedCourses();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ResponsiveSearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder={t('rechercherUnCours') as string}
      />
      <ViewModeToggle
        value={viewMode}
        onChange={onViewModeChange}
        disabled={hasChanges}
      />
    </div>
  );
}

export default PlannedCoursesHeaderActions;
