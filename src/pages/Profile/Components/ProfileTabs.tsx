import { Tab, Tabs } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ProfileTab } from "../Profile.constants";

interface ProfileTabsProps {
  selectedTab: number;
  onTabChange: (newValue: number) => void;
}

function ProfileTabs({ selectedTab, onTabChange }: ProfileTabsProps): JSX.Element {
  const { t } = useTranslation("common");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onTabChange(newValue);
  };

  return (
    <Tabs
      value={selectedTab}
      onChange={handleChange}
      aria-label="profile tabs"
      sx={{
        minHeight: 48,
        "& .MuiTabs-indicator": {
          backgroundColor: "primary.main",
        },
      }}
    >
      <Tab label={t("tabCheminement")} value={ProfileTab.CHEMINEMENT} />
      <Tab label={t("tabAVenir")} value={ProfileTab.A_VENIR} disabled />
    </Tabs>
  );
}

export default ProfileTabs;
