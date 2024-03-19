import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Paper, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import CryptoContext from './pages/cryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CryptoContext>
      <ThemeProvider theme={theme}>
        <Paper>
          <App />
        </Paper>
      </ThemeProvider>
    </CryptoContext>
    

  </React.StrictMode>
);
