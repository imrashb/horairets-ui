import { GitHub, LinkedIn, Person } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Section } from "../About.styles";

const DEVELOPER = {
  name: "Emmanuel Coulombe",
  github: "imrashb",
  linkedin: "emmanuelcoulombe",
};

const DeveloperCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  max-width: 400px;

  .avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .socials {
    display: flex;
    gap: 4px;
  }
`;

function DeveloperSection(): JSX.Element {
  const { t } = useTranslation("common");

  return (
    <Section>
      <Typography variant="h5" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Person /> {t("developpeur")}
      </Typography>
      <DeveloperCard>
        <img
          src={`https://github.com/${DEVELOPER.github}.png?size=128`}
          alt={DEVELOPER.name}
          className="avatar"
        />
        <div className="info">
          <Typography fontWeight="600">{DEVELOPER.name}</Typography>
          <div className="socials">
            <IconButton
              size="small"
              href={`https://github.com/${DEVELOPER.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              href={`https://linkedin.com/in/${DEVELOPER.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn fontSize="small" />
            </IconButton>
          </div>
        </div>
      </DeveloperCard>
    </Section>
  );
}

export default DeveloperSection;
