import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppContext } from './context/AppContext';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Box from 'material-ui/Box'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
      <Box>
        <MuiThemeProvider>
          <App />
        </ MuiThemeProvider>
      </Box>
    </AppContext>
  </React.StrictMode>
);
