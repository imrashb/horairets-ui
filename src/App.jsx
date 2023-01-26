import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import Routing from './routes/Routing';
import GlobalStyle from './themes/GlobalStyle';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <CssBaseline />
      <NavBar />
      <Container
        id="main-container"
        maxWidth
        disableGutters
        sx={{
          overflow: 'auto',
          height: '100%',
        }}
      >
        <Routing />
      </Container>
    </BrowserRouter>
  );
}

export default App;
