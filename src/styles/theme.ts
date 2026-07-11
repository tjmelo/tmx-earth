import { createTheme, ThemeOptions } from '@mui/material/styles'
import { AppearancePreference } from '../interfaces'

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#0f62fe' },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#313131',
      secondary: '#4f4f4f',
    },
  },
  typography: {
    fontFamily: '"Noto Sans JP", sans-serif',
  },
}

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#bb86fc' },
    background: {
      default: '#121212',
      paper: '#1f1f1f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cfcfcf',
    },
  },
  typography: {
    fontFamily: '"Noto Sans JP", sans-serif',
  },
}

export const getThemeOptions = (preference: AppearancePreference): ThemeOptions =>
  preference === 'dark' ? darkThemeOptions : lightThemeOptions

export const createAppTheme = (preference: AppearancePreference) =>
  createTheme(getThemeOptions(preference))
