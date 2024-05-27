/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  AppBar, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarWrapper from './NavBar.styles';
import LoginButton from './components/LoginButton';
import useNavBarTabs from './useNavBarTabs';
import { HOME_URL } from '../../routes/Routes.constants';
import NewBadge from '../NewBadge/NewBadge';

export default function NavBar() {
  const tabs = useNavBarTabs();
  const { t } = useTranslation('common');

  const [selectedTab, setSelectedTab] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname) {
      const tab = tabs.find((ta) => ta.path === location.pathname);

      if (tab) {
        setSelectedTab(tab.label);
      } else {
        setSelectedTab(null);
      }
    }
  }, [location.pathname]);

  const handleTabSelection = (value) => {
    setSelectedTab(value);
    const tab = tabs.find((tmp) => tmp.label === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  const theme = useTheme();
  const isMediumViewport = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallViewport = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <NavBarWrapper id="navbar">
      <AppBar position="static">
        <Toolbar>
          <div className="navbar-left">
            <img
              className="logo-horairets"
              src="./logo.png"
              alt="Logo HorairÉTS"
              onClick={() => {
                navigate(HOME_URL);
              }}
            />
            {!isMediumViewport && (
              <Typography variant="h5" component="div" className="navbar-title">
                {t('horairets')}
              </Typography>
            )}
          </div>
          <Tabs className="navbar-center" value={selectedTab} onChange={(e, value) => handleTabSelection(value)}>
            {
              tabs.map((tab) => (
                !tab.hidden && (
                  <Tab
                    disabled={tab.disabled}
                    key={tab.label}
                    value={tab.label}
                    icon={<tab.icon />}
                    label={isSmallViewport ? undefined : (
                      <>
                        {t(tab.label)}
                        {tab.new}
                      </>
                    )}
                  />
                )
              ))
            }
          </Tabs>
          <div className="navbar-right">
            <LoginButton />
          </div>
        </Toolbar>
      </AppBar>
    </NavBarWrapper>
  );
}
