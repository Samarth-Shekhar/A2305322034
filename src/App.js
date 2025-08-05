import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  Box,
  createTheme,
  ThemeProvider,
  IconButton
} from '@mui/material';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import Redirect from './pages/Redirect'; 

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                background: {
                  default: '#f5f7fa',
                  paper: '#fff',
                },
              }
            : {
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }),
        },
        typography: {
          fontFamily: `'Segoe UI', 'Roboto', 'Arial', sans-serif`,
        },
      }),
    [mode]
  );

  const toggleMode = () => setMode((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="md">
          {/* Dark Mode Toggle */}
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <IconButton onClick={toggleMode} color="inherit">
              {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Box>

          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Statistics />} />
              <Route path="/short/:code" element={<Redirect />} /> {/* NEW */}
            </Routes>
          </Router>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
