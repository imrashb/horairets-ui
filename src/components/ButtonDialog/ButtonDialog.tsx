import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Theme,
  PaletteMode,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { useTheme } from "styled-components";

type ButtonDialogProps = {
  icon: React.ReactNode;
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
};

// Properly type the styled component with the theme type if needed, but inference is usually enough.
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
  children,
}: ButtonDialogProps): JSX.Element {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  const theme = useTheme() as Theme;
  const isSmallViewport = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (!isSmallViewport) {
      setVisible(false);
    }
  }, [isSmallViewport]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  const Spacer = <div style={{ width: 4 }} />;

  return (
    <>
      <div className="button-dialog-wrapper">
        <Button variant="contained" onClick={() => setVisible(true)}>
          {!isSmallViewport && title}
          {!isSmallViewport && Spacer}
          {icon}
        </Button>
      </div>

      <Dialog fullWidth open={visible}>
        <DialogTitle sx={{ alignItems: "center", display: "flex" }}>
          {title}
          {Spacer}
          {icon}
        </DialogTitle>
        <DialogContent>
          <DialogContentWrapper>{children}</DialogContentWrapper>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={() => setVisible(false)}>
            {t("annuler")}
          </Button>
          <Button variant="contained" onClick={handleClose}>
            {t("appliquerParametres")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ButtonDialog;
