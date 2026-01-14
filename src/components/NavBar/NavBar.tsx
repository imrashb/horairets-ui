import {
  AppBar, Tab, Tabs, Toolbar, useMediaQuery, useTheme,
} from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import HorairetsLogo from '../HorairetsLogo/HorairetsLogo';
import LoginButton from './components/LoginButton';
import MobileNavDrawer from './components/MobileNavDrawer';
import NavLogo from './components/NavLogo';
import NavBarWrapper from './NavBar.styles';
import useNavBarTabs from './useNavBarTabs';

export default function NavBar(): JSX.Element {
  const tabs = useNavBarTabs();
  const { t } = useTranslation('common');

  const [selectedTab, setSelectedTab] = useState<string | boolean | number>(false);

  const navigate = useNavigate();

  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname) {
      const tab = tabs.find((ta) => ta.path === location.pathname && !ta.hidden);

      if (tab) {
        setSelectedTab(tab.label);
      } else {
        setSelectedTab(false);
      }
    }
  }, [location.pathname, tabs]);

  const handleTabSelection = (value: string) => {
    setSelectedTab(value);
    const tab = tabs.find((tmp) => tmp.label === value);
    if (tab) {
      navigate(tab.path);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumViewport = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return <MobileNavDrawer />;
  }

  return (
    <NavBarWrapper id="navbar">
      <AppBar position="static">
        <Toolbar>
          <div className="navbar-left">
            <NavLogo />
            {!isMediumViewport && <HorairetsLogo fontSize="1.5rem" />}
          </div>
          <Tabs
            className="navbar-center"
            value={selectedTab}
            onChange={(_e, value) => handleTabSelection(value)}
          >
            {tabs.map(
              (tab) => !tab.hidden && (
              <Tab
                disabled={tab.disabled}
                key={tab.label}
                value={tab.label}
                icon={<tab.icon />}
                label={t(tab.label)}
              />
              ),
            )}
          </Tabs>
          <div className="navbar-right">
            <LoginButton />
          </div>
        </Toolbar>
      </AppBar>
    </NavBarWrapper>
  );
}
