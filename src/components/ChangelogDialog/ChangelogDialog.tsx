import { ArrowBack, ArrowForward, Close, NewReleases } from "@mui/icons-material";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MobileStepper,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  CHANGELOG_STORAGE_KEY,
  CHANGELOGS,
  getLatestChangelogDate,
  getUnseenChangelogs,
} from "./changelog.config";

const ChangelogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ul {
    margin: 0;
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
    }
  }

  .section-title {
    font-weight: 600;
    margin-top: 8px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

function ChangelogDialog(): JSX.Element {
  const { t } = useTranslation("common");
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isDev = import.meta.env.DEV;

  const unseenChangelogs = useMemo(() => {
      if(isDev) {
        return CHANGELOGS;
      }

    const lastSeenDate = localStorage.getItem(CHANGELOG_STORAGE_KEY);
    return getUnseenChangelogs(lastSeenDate);
  }, [isDev]);


  useEffect(() => {
    if (isDev) {
      setOpen(true);
      return;
    }

    if (unseenChangelogs.length > 0) {
      setOpen(true);
    }
  }, [isDev, unseenChangelogs.length]);

  const currentChangelog = useMemo(
    () => unseenChangelogs[currentIndex],
    [unseenChangelogs, currentIndex]
  );

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === unseenChangelogs.length - 1;

  const handleDismiss = () => {
    localStorage.setItem(CHANGELOG_STORAGE_KEY, getLatestChangelogDate());
    setOpen(false);
  };

  const handleNext = () => {
    if (isLast) {
      handleDismiss();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  if (!currentChangelog) return <></>;

  const { Content, date } = currentChangelog;

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <TitleWrapper>
          <NewReleases color="primary" />
          {t("nouveautes")}
          <Chip
            label={new Date(`${date}T12:00:00`).toLocaleDateString()}
            size="small"
            variant="filled"
            color="primary"
          />
        </TitleWrapper>
        <IconButton onClick={handleDismiss}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ChangelogContentWrapper>
          <Content onDismiss={handleDismiss} />
        </ChangelogContentWrapper>
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", gap: 1, px: 3, pb: 2 }}>
        {unseenChangelogs.length > 1 && (
          <MobileStepper
            variant="dots"
            steps={unseenChangelogs.length}
            position="static"
            activeStep={currentIndex}
            sx={{ width: "100%", bgcolor: "transparent", justifyContent: "center" }}
            backButton={<></>}
            nextButton={<></>}
          />
        )}
        <div style={{ display: "flex", gap: "8px", width: "100%", justifyContent: "flex-end" }}>
          {!isFirst && (
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleBack}
            >
              {t("precedent")}
            </Button>
          )}
          <Button
            variant="contained"
            endIcon={!isLast ? <ArrowForward /> : undefined}
            onClick={handleNext}
          >
            {isLast ? t("compris") : t("suivant")}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default ChangelogDialog;
