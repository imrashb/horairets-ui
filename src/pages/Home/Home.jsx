import { Button, Typography, useMediaQuery } from '@mui/material';
import { Container, useTheme } from '@mui/system';
import React, { useRef, useEffect, useState } from 'react';
import { FaDiscord } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import HomeWrapper from './Home.styles';
import { DISCORD_URL, GENERATEUR_HORAIRE_URL } from '../../routes/Routes.constants';
import HomeBackground from './HomeBackground';

function Home() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();

  const horairetsRef = useRef(null);
  const [width, setWidth] = useState(null);

  const handleResize = () => {
    setWidth(horairetsRef.current.offsetWidth);
  };

  useEffect(() => {
    if (horairetsRef.current) {
      const ref = horairetsRef.current;
      const observer = new ResizeObserver(handleResize);
      observer.observe(ref);
      handleResize();
      return () => { observer.unobserve(ref); };
    }
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horairetsRef]);

  const theme = useTheme();
  const isMediumViewport = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <HomeWrapper>
      <HomeBackground />
      <div className="left">
        <Typography variant="h2" component="div" className="body-bienvenue">
          <strong>{t('bienvenueSur')}</strong>
        </Typography>
        <Container className="text-container" disableGutters sx={{ width: `${width}px` }}>
          <div className="body-horairets">
            <span ref={horairetsRef} className="horairets-wrapper">
              <span className="text-shadow">{t('horairets')}</span>
              <span className="horairets-animated-text">{t('horair')}</span>
              <span className="ets">{t('ets')}</span>
            </span>
            <span className="description">{t('descriptionHorairets')}</span>
          </div>
          <div className="btn-wrapper">
            <Button
              className="horairets-animated-background hover-animated"
              variant="contained"
              onClick={() => {
                navigate(GENERATEUR_HORAIRE_URL);
              }}
            >
              {t('commenceMaintenant')}

            </Button>
            <Button
              color="discord"
              endIcon={<FaDiscord />}
              className="btn-rejoins-discord"
              variant="outlined"
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              {t('rejoinsDiscord')}
            </Button>
          </div>
        </Container>
      </div>
      {!isMediumViewport && (
      <div className="right">
        <img className="logo-horairets" src="./logo.png" alt="Logo HorairÉTS" />
      </div>
      )}
    </HomeWrapper>
  );
}

export default Home;
