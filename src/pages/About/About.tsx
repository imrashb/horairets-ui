import { GitHub, Link as LinkIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";
import { FaDiscord } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { DISCORD_URL } from "../../routes/Routes.constants";
import {
  AboutContainer,
  AboutWrapper,
  LinksGrid,
  Section,
} from "./About.styles";
import AboutBanner from "./Components/AboutBanner";
import AboutLinkCard from "./Components/AboutLinkCard";
import DeveloperSection from "./Components/DeveloperSection";

const GITHUB_REPOS = {
  frontend: "imrashb/horairets-ui",
  backend: "imrashb/horaire-ets",
};

function About(): JSX.Element {
  const { t } = useTranslation("common");

  return (
    <AboutWrapper>
      <AboutContainer>
        <AboutBanner />

        <Section>
          <Typography variant="h5" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LinkIcon /> {t("liensUtiles")}
          </Typography>
          <LinksGrid>
            <AboutLinkCard
              href={DISCORD_URL}
              icon={<FaDiscord size={24} />}
              iconBackground="rgba(88, 101, 242, 0.15)"
              iconColor="#5865F2"
              title={t("communauteDiscord") as string}
              subtitle={t("rejoinsDiscordDescription") as string}
            />
            <AboutLinkCard
              href={`https://github.com/${GITHUB_REPOS.frontend}`}
              icon={<GitHub />}
              iconBackground="rgba(255, 255, 255, 0.1)"
              iconColor="#fff"
              title={t("codeSourceFrontend") as string}
              subtitle={GITHUB_REPOS.frontend}
            />
            <AboutLinkCard
              href={`https://github.com/${GITHUB_REPOS.backend}`}
              icon={<GitHub />}
              iconBackground="rgba(255, 255, 255, 0.1)"
              iconColor="#fff"
              title={t("codeSourceBackend") as string}
              subtitle={GITHUB_REPOS.backend}
            />
          </LinksGrid>
        </Section>

        <DeveloperSection />
      </AboutContainer>
    </AboutWrapper>
  );
}

export default About;
