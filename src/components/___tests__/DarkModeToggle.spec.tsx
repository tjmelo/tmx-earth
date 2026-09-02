import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import DarkModeToggle from '../DarkModeToggle'
import { createAppTheme } from '../../styles/theme'

describe('DarkModeToggle Component', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('Should render the toggle button with initial text', () => {
    // do
    const { asFragment } = render(<DarkModeToggle />)

    // then
    expect(screen.getByTestId('dark-mode-toggle')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('Should render "Modo escuro" button when appearance is light', () => {
    // do
    render(<DarkModeToggle />)

    // then
    const button = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(button).toHaveTextContent('Modo escuro')
  })

  it('Should update UI state when toggle button is clicked', async () => {
    // do
    render(<DarkModeToggle />)
    const button = screen.getByTestId('dark-mode-toggle')

    // Initial state: light mode
    expect(button).toHaveTextContent('Modo escuro')
    expect(button).toHaveAttribute('aria-pressed', 'false')

    // then: Click to switch to dark mode
    fireEvent.click(button)

    // then: Verify UI updates
    await waitFor(() => {
      expect(button).toHaveTextContent('Modo claro')
      expect(button).toHaveAttribute('aria-pressed', 'true')
    })
  })

  it('Should use Material Design 3-inspired theme tokens', () => {
    const lightTheme = createAppTheme('light')
    const darkTheme = createAppTheme('dark')

    expect(lightTheme.palette.primary.main).toBe('#6750A4')
    expect(lightTheme.palette.secondary.main).toBe('#625B71')
    expect(lightTheme.shape.borderRadius).toBe(16)
    expect(darkTheme.palette.background.default).toBe('#101418')
    expect(darkTheme.palette.text.primary).toBe('#F4EFF4')
  })

  it('Should persist tmx:appearance preference to localStorage', async () => {
    // do
    render(<DarkModeToggle />)
    const button = screen.getByTestId('dark-mode-toggle')

    // then: Click to switch to dark mode
    fireEvent.click(button)

    // then: Verify localStorage was updated
    await waitFor(() => {
      const storedPreference = localStorage.getItem('tmx:appearance')
      expect(storedPreference).toBe('dark')
    })
  })

  it('Should restore preference from localStorage on mount', async () => {
    // do: Set dark mode in localStorage
    localStorage.setItem('tmx:appearance', 'dark')

    // do: Render component
    render(<DarkModeToggle />)

    // then: Button should show "Modo claro"
    const button = screen.getByTestId('dark-mode-toggle')
    await waitFor(() => {
      expect(button).toHaveTextContent('Modo claro')
      expect(button).toHaveAttribute('aria-pressed', 'true')
    })
  })

  it('Should support toggling back and forth', async () => {
    // do
    render(<DarkModeToggle />)
    const button = screen.getByTestId('dark-mode-toggle')

    // then: Start with light mode
    expect(button).toHaveTextContent('Modo escuro')

    // do: Click to switch to dark
    fireEvent.click(button)

    await waitFor(() => {
      expect(button).toHaveTextContent('Modo claro')
    })

    // do: Click to switch back to light
    fireEvent.click(button)

    await waitFor(() => {
      expect(button).toHaveTextContent('Modo escuro')
    })

    // then: Verify final localStorage state
    expect(localStorage.getItem('tmx:appearance')).toBe('light')
  })

  it('Should have proper accessibility attributes', () => {
    // do
    render(<DarkModeToggle />)
    const button = screen.getByTestId('dark-mode-toggle')

    // then
    expect(button).toHaveAttribute('aria-pressed')
    expect(button).toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('type', 'button')
  })
})
