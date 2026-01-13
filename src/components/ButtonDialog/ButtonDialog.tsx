import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  IconButtonProps,
  Theme,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";

type ButtonDialogProps = {
  icon: React.ReactNode;
  title: string;
  onClose?: () => void;
  onOpen?: () => void;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  isIconButton?: boolean;
  iconButtonProps?: Partial<IconButtonProps>;
  viewOnly?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  tooltip?: string;
};

const DialogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => (theme as Theme).sizes?.size_8};

  & > * {
    &:not(:last-child) {
      margin-bottom: ${({ theme }) => (theme as Theme).sizes?.size_16};
    }
  }
`;

function ButtonDialog({
  icon,
  title,
  onClose,
  onOpen,
  children,
  isIconButton,
  iconButtonProps,
  viewOnly = false,
  maxWidth,
  tooltip,
}: ButtonDialogProps): JSX.Element {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  const theme = useTheme() as Theme;
  const isSmallViewport = useMediaQuery(theme.breakpoints.down("sm"));
  const onOpenRef = React.useRef(onOpen);
  onOpenRef.current = onOpen;

  useEffect(() => {
    if (!isSmallViewport) {
      setVisible(false);
    }
  }, [isSmallViewport]);

  useEffect(() => {
    if (visible) {
      onOpenRef.current?.();
    }
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const Spacer = <div style={{ width: 4 }} />;

  const triggerButton = isIconButton ? (
    <IconButton onClick={() => setVisible(true)} {...iconButtonProps}>
      {icon}
    </IconButton>
  ) : (
    <Button variant="contained" onClick={() => setVisible(true)}>
      {!isSmallViewport && title}
      {!isSmallViewport && Spacer}
      {icon}
    </Button>
  );

  const Trigger = tooltip ? (
    <Tooltip title={tooltip}>{triggerButton}</Tooltip>
  ) : (
    triggerButton
  );

  return (
    <>
      <div className="button-dialog-wrapper">{Trigger}</div>

      <Dialog fullWidth open={visible} onClose={handleCancel} maxWidth={maxWidth}>
        <DialogTitle sx={{ alignItems: "center", display: "flex", justifyContent: viewOnly ? "space-between" : undefined }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            {title}
            {Spacer}
            {icon}
          </span>
          {viewOnly && (
            <IconButton onClick={handleCancel}>
              <Close />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentWrapper>{children}</DialogContentWrapper>
        </DialogContent>
        {!viewOnly && (
          <DialogActions>
            <Button variant="contained" color="error" onClick={handleCancel}>
              {t("annuler")}
            </Button>
            <Button variant="contained" onClick={handleClose}>
              {t("appliquerParametres")}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}

export default ButtonDialog;

