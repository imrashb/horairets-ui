import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import HorairetsLogo from "../../../components/HorairetsLogo/HorairetsLogo";
import { HeroSection } from "../About.styles";

function AboutBanner(): JSX.Element {
  const { t } = useTranslation("common");

  return (
    <HeroSection>
      <div className="logo-row">
        <img src="./logo.png" alt="Logo HorairÉTS" className="logo" />
        <HorairetsLogo fontSize="4rem" mobileFontSize="3rem" />
      </div>
      <Typography variant="body1" color="text.secondary" className="subtitle">
        {t("descriptionHorairets")}
      </Typography>
    </HeroSection>
  );
}

export default AboutBanner;
