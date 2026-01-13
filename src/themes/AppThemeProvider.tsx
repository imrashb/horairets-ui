import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import { useAtomValue } from 'jotai';
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { modeAtom } from '../features/user/userAtoms';

// Extend MUI Theme definitions
declare module '@mui/material/styles' {
  interface PaletteColor {
    darkerMain?: string;
    brighterMain?: string;
    ets?: string;
  }
  interface SimplePaletteColorOptions {
    darkerMain?: string;
    brighterMain?: string;
    ets?: string;
  }
  interface TypeBackground {
    light?: string;
  }
  interface Palette {
    badgeNew: {
      main: string;
    };
    button: {
      main: string;
    };
    discord: {
      main: string;
    };
  }
  interface PaletteOptions {
    badgeNew?: {
      main: string;
    };
    button?: {
      main: string;
    };
    discord?: {
      main: string;
    };
  }

  interface Theme {
    sizes: Record<string, string>;
    textShadow: {
      main: string;
    };
  }
  // eslint-disable-next-line no-shadow
  interface ThemeOptions {
    sizes?: Record<string, string>;
    textShadow?: {
      main: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    discord: true;
  }
}

type AppThemeProviderProps = {
  children?: React.ReactNode;
};

export default function AppThemeProvider({ children }: AppThemeProviderProps): JSX.Element {
  const mode = useAtomValue(modeAtom);

  const themeOptions: ThemeOptions = {
    palette: {
      mode: mode as PaletteMode,
      primary: {
        dark: mode === 'dark' ? '#b57ae5' : '#240046',
        main: mode === 'dark' ? '#8327dd' : '#5A189A',
        light: mode === 'dark' ? '#5c00b4' : '#9D4EDD',
        darkerMain: mode === 'dark' ? '#9c57d8' : '#3C096C',
        brighterMain: mode === 'dark' ? '#6e10c6' : '#7B2CBF',
        ets: '#EF3E45',
      },
      badgeNew: {
        main: '#3498db',
      },
      button: {
        main: mode === 'dark' ? '#7B2CBF' : '#3C096C',
      },
      discord: {
        main: '#7289da',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#FCFBFA',
        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
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
    typography: {
      fontFamily: 'Titillium Web, sans-serif',
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
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: 'rgba(33, 33, 33, 0.95)',
            color: '#ffffff',
          },
          arrow: {
            color: 'rgba(33, 33, 33, 0.95)',
          },
        },
      },
    },
  };

  const theme = responsiveFontSizes(createTheme(themeOptions));

  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeProvider>
  );
}
