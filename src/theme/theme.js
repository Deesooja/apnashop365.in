import { createTheme } from '@mui/material/styles';

/**
 * Brand colors live only here.
 * Ivory background, deep maroon accents, soft gold highlights.
 */
const colors = {
  ivory: '#F7F1E8',
  ivoryDark: '#EDE4D6',
  maroon: '#5C1A1B',
  maroonDark: '#3F1011',
  maroonLight: '#7A2B2D',
  gold: '#C4A35A',
  goldSoft: '#D4BC7D',
  goldDark: '#9A7B3C',
  textPrimary: '#2B2118',
  textSecondary: '#6B5B4B',
  white: '#FFFFFF',
  error: '#A33B3B',
  success: '#3D6B4F',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.maroon,
      dark: colors.maroonDark,
      light: colors.maroonLight,
      contrastText: colors.ivory,
    },
    secondary: {
      main: colors.gold,
      dark: colors.goldDark,
      light: colors.goldSoft,
      contrastText: colors.textPrimary,
    },
    background: {
      default: colors.ivory,
      paper: colors.white,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
    },
    error: { main: colors.error },
    success: { main: colors.success },
    divider: 'rgba(92, 26, 27, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: { borderRadius: 2 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--color-ivory': colors.ivory,
          '--color-ivory-dark': colors.ivoryDark,
          '--color-maroon': colors.maroon,
          '--color-maroon-dark': colors.maroonDark,
          '--color-gold': colors.gold,
          '--color-gold-soft': colors.goldSoft,
          '--color-text': colors.textPrimary,
        },
        html: { scrollBehavior: 'smooth' },
        body: {
          backgroundColor: colors.ivory,
          backgroundImage:
            'radial-gradient(ellipse at top, rgba(196, 163, 90, 0.08), transparent 55%)',
          minHeight: '100vh',
        },
        img: { maxWidth: '100%', display: 'block' },
        a: { color: 'inherit' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 2, minHeight: 44 },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none', backgroundColor: colors.maroonDark },
        },
        outlinedPrimary: {
          borderColor: colors.maroon,
          '&:hover': { borderColor: colors.maroonDark, backgroundColor: 'rgba(92,26,27,0.04)' },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(247, 241, 232, 0.92)',
          color: colors.textPrimary,
          boxShadow: 'none',
          borderBottom: '1px solid rgba(92, 26, 27, 0.1)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: colors.ivory },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid rgba(92, 26, 27, 0.08)',
          backgroundColor: colors.white,
        },
      },
    },
  },
});

export { colors };
export default theme;
