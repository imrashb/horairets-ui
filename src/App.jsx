import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Routing from './routes/Routing';
import GlobalStyle from './themes/GlobalStyle';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <GlobalStyle />
        <CssBaseline />
        <NavBar />
        <Container
          id="main-container"
          maxWidth
          disableGutters
        >
          <Routing />
        </Container>
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;
