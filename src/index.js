import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppContext } from './context/AppContext';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContext>
      <MuiThemeProvider>
        <App />
      </ MuiThemeProvider>
    </AppContext>
  </React.StrictMode>
);
