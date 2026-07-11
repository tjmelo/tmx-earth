import { AppearancePreference } from '../interfaces'

const STORAGE_KEY = 'tmx:appearance'
const PREFERENCE_EVENT = 'tmx:appearance-updated'

const defaultAppearance: AppearancePreference = 'light'

export const readAppearancePreference = (): AppearancePreference => {
  if (typeof window === 'undefined') return defaultAppearance

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    if (rawValue === 'dark') return 'dark'
    return 'light'
  } catch {
    return defaultAppearance
  }
}

export const writeAppearancePreference = (
  appearance: AppearancePreference,
): void => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(STORAGE_KEY, appearance)
    window.dispatchEvent(
      new CustomEvent(PREFERENCE_EVENT, {
        detail: { appearance },
      }),
    )
  } catch {
    // Ignore storage failures in private browsers
  }
}

export const subscribeAppearancePreference = (
  listener: (appearance: AppearancePreference) => void,
): (() => void) => {
  if (typeof window === 'undefined') return () => {}

  const handleEvent = (event: Event) => {
    const customEvent = event as CustomEvent<{ appearance: AppearancePreference }>
    const { appearance } = customEvent.detail || {}
    if (appearance) listener(appearance)
  }

  window.addEventListener(PREFERENCE_EVENT, handleEvent)
  window.addEventListener('storage', (event: StorageEvent) => {
    if (event.key === STORAGE_KEY && (event.newValue === 'light' || event.newValue === 'dark')) {
      listener(event.newValue)
    }
  })

  return () => {
    window.removeEventListener(PREFERENCE_EVENT, handleEvent)
    window.removeEventListener('storage', handleEvent as EventListener)
  }
}

export const getDefaultAppearance = (): AppearancePreference =>
  readAppearancePreference()
