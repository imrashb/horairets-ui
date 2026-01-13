import { Save, Warning } from '@mui/icons-material';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Fade } from './Fade';
import {
  DesktopFloatingPill,
  MobileFixedContainer,
  MobileActionsRow,
  PillActionsRow,
  ChangeIndicator,
  LayoutSpacer,
} from './SmartSaveButtons.styles';

export interface SmartSaveButtonsProps {
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
}

function SmartSaveButtons({
  hasChanges,
  onSave,
  onCancel,
}: SmartSaveButtonsProps): JSX.Element {
  const { t } = useTranslation('common');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Select the appropriate container and row components
  const Container = isMobile ? MobileFixedContainer : DesktopFloatingPill;
  const ActionsRow = isMobile ? MobileActionsRow : PillActionsRow;
  const buttonSize = isMobile ? 'medium' : 'small';

  return (
    <>
      <LayoutSpacer $expanded={hasChanges} />
      <Fade $visible={hasChanges}>
        <Container>
          <ChangeIndicator>
            <Warning sx={{ fontSize: 16 }} />
            {t('changementsNonSauvegardes')}
          </ChangeIndicator>
          <ActionsRow>
            <Button variant="outlined" onClick={onCancel} size={buttonSize}>
              {t('annuler')}
            </Button>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={onSave}
              size={buttonSize}
            >
              {t('sauvegarder')}
            </Button>
          </ActionsRow>
        </Container>
      </Fade>
    </>
  );
}

export default SmartSaveButtons;
export { SmartSaveButtons };
