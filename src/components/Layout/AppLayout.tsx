import { Container, CssBaseline } from "@mui/material";
import { getAuth } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import ChangelogDialog from "../ChangelogDialog/ChangelogDialog";
import FullPageLoader from "../Loaders/FullPageLoader";
import NavBar from "../NavBar/NavBar";
import StyledToastContainer from "../Toasts/StyledToastContainer";
import GlobalStyle from "../../themes/GlobalStyle";

const AppLayout = (): JSX.Element => {
  const auth = getAuth();
  const [, loading] = useAuthState(auth);

  if (loading) {
    return (
      <>
        <GlobalStyle />
        <CssBaseline />
        <FullPageLoader isLoading={true}>
          {null}
        </FullPageLoader>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <CssBaseline />
      <FullPageLoader isLoading={false}>
        <NavBar />
        <Container id="main-container" maxWidth={false} disableGutters>
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
};

export default AppLayout;


