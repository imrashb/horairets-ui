import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components';
import PropTypes from 'prop-types';

function ButtonDialog({
  icon, title, onClose, children,
}) {
  const { t } = useTranslation('common');
  const [visible, setVisible] = useState(false);

  const theme = useTheme();
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!isSmallViewport) {
      setVisible(false);
    }
  }, [isSmallViewport]);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <>
      <div className="button-dialog-wrapper">
        <Button
          variant="contained"
          onClick={() => setVisible(true)}
        >
          {!isSmallViewport && title}
          {!isSmallViewport && <div style={{ width: 4 }} />}
          {icon}
        </Button>
      </div>

      <Dialog fullWidth open={visible}>
        <DialogTitle sx={{ alignItems: 'center', display: 'flex' }}>
          {title}
          {icon}
        </DialogTitle>
        <DialogContent>
          <DialogContentWrapper>
            {children}
          </DialogContentWrapper>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
          >
            {t('appliquerParametres')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const DialogContentWrapper = styled.div`
  
    display: flex;
    flex-direction: column;

    & > * {
      &:not(:last-child) {
        margin-bottom: ${({ theme }) => theme.sizes.size_16};
      }
    }  

  `;

ButtonDialog.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ButtonDialog;
