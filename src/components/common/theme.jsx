// src/theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: '10px',
          input: {
            padding: '5.5px 10px', // Cambia el padding aquí
          },
          '& fieldset': {
            borderColor: '#ccc',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        }
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: '#2B2B2B',
          border: '1px solid white',
          color: 'white',
          fontFamily: '"Quicksand", sans-serif',
        }
      },
    },
  },
  palette: {
    primary: {
      main: '#3f51b5', // Azul
    },
    secondary: {
      main: '#f50057', // Rosa
    },
    error: {
      main: '#ff5722', // Color de error
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Inter", sans-serif',
    h1: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '2rem',
      fontWeight: 600,
      color: '#D2D2D2',
      padding: '1rem 0',
    },
    h2: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#D2D2D2',
      padding: '1rem 0',
    },
    h3: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '1.2rem',
      fontWeight: 500,
      color: '#D2D2D2',
      padding: '1rem 0',
    },
    body1: {
      fontFamily: '"Inter", sans-serif', // Texto normal (p)
      fontSize: '1rem',
      color: '#D2D2D2',
      padding: '1rem 0 1rem 0',
    },
    body2: {
      fontFamily: '"Inter", sans-serif', // Texto secundario (span)
      fontSize: '0.875rem',
      color: '#D2D2D2',
    },
    },
});

export default theme;
