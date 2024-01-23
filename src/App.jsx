import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import Routing from './routes/Routing';
import GlobalStyle from './themes/GlobalStyle';
import NavBar from './components/NavBar/NavBar';
import StyledToastContainer from './components/Toasts/StyledToastContainer';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <CssBaseline />
      <NavBar />
      <Container
        id="main-container"
        maxWidth
        maxHeight
        disableGutters
      >
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
