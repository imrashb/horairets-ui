import React from 'react';

import { useTranslation } from 'react-i18next';
import { CheminementViewMode } from '../PlannedCourses.constants';
import ViewModeToggle from './ViewMode/ViewModeToggle';
import ResponsiveSearchBar from './ResponsiveSearchBar';

interface PlannedCoursesHeaderActionsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: CheminementViewMode;
  onViewModeChange: (mode: CheminementViewMode) => void;
  hasChanges: boolean;
}

function PlannedCoursesHeaderActions({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  hasChanges,
}: PlannedCoursesHeaderActionsProps): JSX.Element {
  const { t } = useTranslation('common');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <ResponsiveSearchBar
        value={searchTerm}
        onChange={onSearchChange}
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
