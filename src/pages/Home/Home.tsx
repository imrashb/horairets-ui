import { Button, Typography, useMediaQuery } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles"; // Import Theme
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaDiscord } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  DISCORD_URL,
  GENERATEUR_HORAIRE_URL,
} from "../../routes/Routes.constants";
import HomeWrapper from "./Home.styles";
import HomeBackground from "./HomeBackground";

function Home(): JSX.Element {
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  const horairetsRef = useRef<HTMLSpanElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  const handleResize = () => {
    if (horairetsRef.current) {
      setWidth(horairetsRef.current.offsetWidth);
    }
  };

  useEffect(() => {
    if (horairetsRef.current) {
      const ref = horairetsRef.current;
      const observer = new ResizeObserver(handleResize);
      observer.observe(ref);
      handleResize();
      return () => {
        observer.unobserve(ref);
      };
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horairetsRef]);

  const theme = useTheme<Theme>();
  const isMediumViewport = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <HomeWrapper>
      <HomeBackground />
      <div className="left">
        <Typography variant="h2" component="div" className="body-bienvenue">
          <strong>{t("bienvenueSur")}</strong>
        </Typography>
        <Container
          className="text-container"
          disableGutters
          sx={{ width: width ? `${width}px` : "auto" }}
        >
          <div className="body-horairets">
            <span ref={horairetsRef} className="horairets-wrapper">
              <span className="text-shadow">{t("horairets")}</span>
              <span className="horairets-animated-text">{t("horair")}</span>
              <span className="ets">{t("ets")}</span>
            </span>
            <span className="description">{t("descriptionHorairets")}</span>
          </div>
          <div className="btn-wrapper">
            <Button
              className="horairets-animated-background hover-animated"
              variant="contained"
              onClick={() => {
                navigate(GENERATEUR_HORAIRE_URL);
              }}
            >
              {t("commenceMaintenant")}
            </Button>
            <Button
              color="discord" // Ensure 'discord' is a valid color in module augmentation or use sx/custom variant
              endIcon={<FaDiscord />}
              className="btn-rejoins-discord"
              variant="outlined"
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t("rejoinsDiscord")}
            </Button>
          </div>
        </Container>
      </div>
      {!isMediumViewport && (
        <div className="right">
          <img
            className="logo-horairets"
            src="./logo.png"
            alt="Logo HorairÉTS"
          />
        </div>
      )}
    </HomeWrapper>
  );
}

export default Home;
