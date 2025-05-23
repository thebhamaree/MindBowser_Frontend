import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- import from 'react-dom/client'
import App from './App';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
