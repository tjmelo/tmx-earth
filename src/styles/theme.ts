export type AppearancePreference = 'light' | 'dark'

const sharedPalette = {
  primary: { main: '#6750A4', light: '#D0BCFF', dark: '#4F378B', contrastText: '#FFFFFF' },
  secondary: { main: '#625B71', light: '#E8DEF8', dark: '#49454F', contrastText: '#FFFFFF' },
  error: { main: '#B3261E', light: '#F9DEDC', dark: '#7A1C1C' },
  divider: '#CAC4D0',
  action: {
    hover: '#F3EDF7',
    selected: '#E8DEF8',
  },
}

const lightThemeOptions = {
  palette: {
    mode: 'light',
    ...sharedPalette,
    background: {
      default: '#FFFBFE',
      paper: '#F7F2FA',
    },
    text: {
      primary: '#1D1B20',
      secondary: '#49454F',
    },
  },
  shape: { borderRadius: 16 },
}

const darkThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#D0BCFF', light: '#EADDFF', dark: '#4F378B', contrastText: '#381E72' },
    secondary: { main: '#CCC2DC', light: '#E8DEF8', dark: '#49454F', contrastText: '#1D1B20' },
    error: { main: '#F2B8B5', light: '#F9DEDC', dark: '#7A1C1C' },
    background: {
      default: '#101418',
      paper: '#1E1F26',
    },
    text: {
      primary: '#F4EFF4',
      secondary: '#D0C4D7',
    },
    divider: '#49454F',
    action: {
      hover: '#2A2D38',
      selected: '#322F3A',
    },
  },
  shape: { borderRadius: 16 },
}

export const getThemeOptions = (preference: AppearancePreference) =>
  preference === 'dark' ? darkThemeOptions : lightThemeOptions

export const createAppTheme = (preference: AppearancePreference) => getThemeOptions(preference)
