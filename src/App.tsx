import { Container, CssBaseline } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import StyledToastContainer from "./components/Toasts/StyledToastContainer";
import Routing from "./routes/Routing";
import GlobalStyle from "./themes/GlobalStyle";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <CssBaseline />
      <NavBar />
      <Container id="main-container" maxWidth={false} disableGutters>
        <Routing />
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
    </BrowserRouter>
  );
}

export default App;
