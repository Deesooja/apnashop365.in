import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import theme from './theme/theme';
import store from './store';
import { LanguageProvider } from './context/LanguageContext';
import AppRouter from './routes/AppRouter';

export default function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <LanguageProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </ThemeProvider>
        </LanguageProvider>
      </Provider>
    </HelmetProvider>
  );
}
