import { Timeline, ViewModule } from '@mui/icons-material';
import {
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { CheminementViewMode } from '../../PlannedCourses.constants';

const ButtonLabel = styled.span`
  margin-left: 0.5rem;
`;

interface ViewModeToggleProps {
  value: CheminementViewMode;
  onChange: (mode: CheminementViewMode) => void;
  disabled?: boolean;
}

function ViewModeToggle({ value, onChange, disabled = false }: ViewModeToggleProps): JSX.Element {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isDesktop = useMediaQuery((theme as Theme).breakpoints.up('md'));

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: CheminementViewMode | null,
  ) => {
    if (newMode !== null) {
      onChange(newMode);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      size="small"
      disabled={disabled}
    >
      <ToggleButton value={CheminementViewMode.SESSIONS}>
        <Tooltip title={t('modeParSession')}>
          <ViewModule sx={{ fontSize: 24 }} />
        </Tooltip>
        {isDesktop && <ButtonLabel>{t('modeParSession')}</ButtonLabel>}
      </ToggleButton>
      <ToggleButton value={CheminementViewMode.TIMELINE}>
        <Tooltip title={t('modeChronologique')}>
          <Timeline sx={{ fontSize: 24 }} />
        </Tooltip>
        {isDesktop && <ButtonLabel>{t('modeChronologique')}</ButtonLabel>}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ViewModeToggle;
