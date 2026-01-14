import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheminementViewMode } from '../PlannedCourses.constants';
import ViewModeToggle from './ViewMode/ViewModeToggle';

interface PlannedCoursesHeaderActionsProps {
  isEditMode: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: CheminementViewMode;
  onViewModeChange: (mode: CheminementViewMode) => void;
  hasChanges: boolean;
}

function PlannedCoursesHeaderActions({
  isEditMode,
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  hasChanges,
}: PlannedCoursesHeaderActionsProps): JSX.Element {
  const { t } = useTranslation('common');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {!isEditMode && (
        <TextField
          size="small"
          placeholder={t('rechercherUnCours') as string}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 250 }}
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
