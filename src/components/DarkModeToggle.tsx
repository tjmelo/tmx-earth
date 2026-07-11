import React from 'react'
import { useAppearancePreference } from '../hooks/useAppearancePreference'

const buttonStyles: React.CSSProperties = {
  cursor: 'pointer',
  border: '1px solid currentColor',
  borderRadius: '999px',
  padding: '0.6rem 1rem',
  background: 'transparent',
  color: 'inherit',
  fontWeight: 600,
  minWidth: 'fit-content',
}

const DarkModeToggle = () => {
  const { appearance, toggleAppearance } = useAppearancePreference()
  const isDark = appearance === 'dark'

  return (
    <button
      type="button"
      onClick={toggleAppearance}
      aria-pressed={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={buttonStyles}
      data-testid="dark-mode-toggle"
    >
      {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  )
}

export default DarkModeToggle
