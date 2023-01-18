import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { selectMode } from '../features/user/userSlice';

export default function AppThemeProvider({ children }) {
  const mode = useSelector(selectMode);
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: {
          dark: mode === 'dark' ? '#b57ae5' : '#240046',
          darkerMain: mode === 'dark' ? '#9c57d8' : '#3C096C',
          main: mode === 'dark' ? '#8327dd' : '#5A189A',
          brighterMain: mode === 'dark' ? '#6e10c6' : '#7B2CBF',
          light: mode === 'dark' ? '#5c00b4' : '#9D4EDD',
          ets: '#EF3E45',
        },
        button: {
          main: mode === 'dark' ? '#7B2CBF' : '#3C096C',
        },
        discord: {
          main: '#7289da',
        },
        background: {
          light: '#FCFBFA',
        },
        grey: {
          50: mode === 'dark' ? 'hsl(0, 0%, 9%)' : 'hsl(0, 10%, 97%)',
          100: mode === 'dark' ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 92%)',
          200: mode === 'dark' ? 'hsl(0, 0%, 25%)' : 'hsl(0, 0%, 83%)',
          300: mode === 'dark' ? 'hsl(0, 0%, 35%)' : 'hsl(0, 0%, 80%)',
          400: mode === 'dark' ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 70%)',
          500: mode === 'dark' ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 50%)',
          600: mode === 'dark' ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 35%)',
          700: mode === 'dark' ? 'hsl(0, 0%, 83%)' : 'hsl(0, 0%, 25%)',
          800: mode === 'dark' ? 'hsl(0, 0%, 90%)' : 'hsl(0, 0%, 15%)',
          900: mode === 'dark' ? 'hsl(0, 10%, 97%)' : 'hsl(0, 0%, 9%)',
        },
      },
      sizes: {
        size_1: '0.0625rem',
        size_2: '0.125rem',
        size_3: '0.1875rem',
        size_4: '0.250rem',
        size_5: '0.3125rem',
        size_6: '0.375rem',
        size_7: '0.4375rem',
        size_8: '0.5rem',
        size_9: '0.5625rem',
        size_10: '0.625rem',
        size_11: '0.6875rem',
        size_12: '0.75rem',
        size_13: '0.8125rem',
        size_14: '0.875rem',
        size_15: '0.9375rem',
        size_16: '1rem',
        size_24: '1.5rem',
        size_32: '2rem',
        size_40: '2.5rem',
        size_48: '3rem',
        size_64: '4rem',
        size_80: '5rem',
        size_96: '6rem',
        size_112: '7rem',
        size_128: '8rem',
        size_144: '9rem',
        size_160: '10rem',
        size_176: '11rem',
        size_192: '12rem',
        size_208: '13rem',
        size_224: '14rem',
        size_240: '15rem',
        size_256: '16rem',
      },
      textShadow: {
        main: 'black 0.25vw 0.25vw 0.5vw',
      },
      text: {
        primary: mode === 'dark' ? '#FCFBFA' : '#5C5C5C',
        disabled: '#C3C1BD',
        secondary: '#999999',
      },
      typography: {
        fontFamily: 'Titillium Web, sans-serif',
        fontstyle: 'normal',
      },
      components: {
        MuiLink: {
          styleOverrides: {
            root: {
              cursor: 'pointer',
              textDecoration: 'none',
              lineHeight: '16px',
              transition: 'all 0.1s ease-in-out',
              '&:hover': {
                opacity: 0.8,
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              aspectRatio: '1/1',
            },
          },
        },
      },
    }),
  );
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        {' '}
        {children}
        {' '}
      </StyledThemeProvider>
    </ThemeProvider>
  );
}
