import { Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { LinkCard } from "../About.styles";

interface AboutLinkCardProps {
  href: string;
  icon: ReactNode;
  iconBackground: string;
  iconColor: string;
  title: string;
  subtitle: string;
}

function AboutLinkCard({
  href,
  icon,
  iconBackground,
  iconColor,
  title,
  subtitle,
}: AboutLinkCardProps): JSX.Element {
  return (
    <LinkCard
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="icon-wrapper"
        style={{ background: iconBackground, color: iconColor }}
      >
        {icon}
      </div>
      <div className="content">
        <Typography fontWeight="600">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </div>
    </LinkCard>
  );
}

export default AboutLinkCard;
