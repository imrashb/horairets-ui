import { Edit, Visibility } from '@mui/icons-material';
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
      <ToggleButton value={CheminementViewMode.EDIT}>
        <Tooltip title={t('modeEdition')}>
          <Edit sx={{ fontSize: 18 }} />
        </Tooltip>
        {isDesktop && <ButtonLabel>{t('modeEdition')}</ButtonLabel>}
      </ToggleButton>
      <ToggleButton value={CheminementViewMode.VIEW}>
        <Tooltip title={t('modeConsultation')}>
          <Visibility sx={{ fontSize: 18 }} />
        </Tooltip>
        {isDesktop && <ButtonLabel>{t('modeConsultation')}</ButtonLabel>}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ViewModeToggle;
