import {
  Container, CssBaseline, useMediaQuery, useTheme,
} from '@mui/material';
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useLocation } from 'react-router-dom';
import ChangelogDialog from '../ChangelogDialog/ChangelogDialog';
import FullPageLoader from '../Loaders/FullPageLoader';
import NavBar from '../NavBar/NavBar';
import StyledToastContainer from '../Toasts/StyledToastContainer';
import GlobalStyle from '../../themes/GlobalStyle';

function AppLayout(): JSX.Element {
  const auth = getAuth();
  const [, loading] = useAuthState(auth);
  const { pathname } = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (loading) {
    return (
      <>
        <GlobalStyle />
        <CssBaseline />
        <FullPageLoader isLoading>{null}</FullPageLoader>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <CssBaseline />
      <FullPageLoader isLoading={false}>
        <NavBar />
        <Container
          id="main-container"
          maxWidth={false}
          disableGutters
          sx={{ pt: isMobile ? '56px' : 0 }}
        >
          <Outlet />
        </Container>
        <StyledToastContainer
          position="bottom-right"
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <ChangelogDialog />
      </FullPageLoader>
    </>
  );
}

export default AppLayout;
