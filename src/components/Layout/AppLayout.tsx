import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import StyledToastContainer from "../Toasts/StyledToastContainer";
import GlobalStyle from "../../themes/GlobalStyle";

const AppLayout = () => (
  <>
    <GlobalStyle />
    <CssBaseline />
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
  </>
);

export default AppLayout;
