import {
  CalendarToday, Dashboard, Info,
} from '@mui/icons-material';
import {
  AppBar, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { GENERATEUR_HORAIRE_URL } from '../../routes/Routes.constants';
import NavBarWrapper from './NavBar.styles';
import LoginButton from './components/LoginButton';

const tabs = [
  {
    id: 0,
    path: '/',
    icon: Dashboard,
    label: 'accueil',
  },
  {
    id: 1,
    path: GENERATEUR_HORAIRE_URL,
    icon: CalendarToday,
    label: 'generateurHoraire',

  },
  {
    id: 2,
    path: '/',
    icon: Info,
    label: 'aPropos',
  },
];

export default function NavBar() {
  const { t } = useTranslation('common');

  const [selectedTab, setSelectedTab] = useState(0);

  const navigate = useNavigate();

  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname) {
      const tab = tabs.find((ta) => ta.path === location.pathname);

      if (tab) {
        setSelectedTab(tab.id);
      } else {
        setSelectedTab(null);
      }
    }
  }, [location.pathname]);

  const handleTabSelection = (value) => {
    setSelectedTab(value);
    const tab = tabs.find((tmp) => tmp.id === value);
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
            <img className="logo-horairets" src="./logo.png" alt="Logo HorairÉTS" />
            {!isMediumViewport && (
              <Typography variant="h5" component="div" className="navbar-title">
                {t('horairets')}
              </Typography>
            )}
          </div>
          <Tabs className="navbar-center" value={selectedTab} onChange={(e, value) => handleTabSelection(value)}>
            {
              tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  value={tab.id}
                  icon={<tab.icon />}
                  label={isSmallViewport ? undefined : t(tab.label)}
                />
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
