import React from 'react'
import { useAppearancePreference } from '../hooks/useAppearancePreference'

const DarkModeToggle = () => {
  const { appearance, toggleAppearance } = useAppearancePreference()
  const isDark = appearance === 'dark'

  return (
    <button
      type="button"
      onClick={toggleAppearance}
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      data-testid="dark-mode-toggle"
      className="theme-toggle-button"
    >
      <span className="theme-toggle-icon" aria-hidden="true">{isDark ? '☀' : '☾'}</span>
      <span className="theme-toggle-text">{isDark ? 'Modo claro' : 'Modo escuro'}</span>
    </button>
  )
}

export default DarkModeToggle
