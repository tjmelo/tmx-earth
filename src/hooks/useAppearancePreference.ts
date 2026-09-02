import { useCallback, useEffect, useState } from 'react'
import {
  getDefaultAppearance,
  readAppearancePreference,
  subscribeAppearancePreference,
  writeAppearancePreference,
} from '../utils/appearanceStorage'
import { AppearancePreference } from '../interfaces'

export const useAppearancePreference = () => {
  const [appearance, setAppearance] = useState<AppearancePreference>(
    getDefaultAppearance,
  )

  useEffect(() => {
    writeAppearancePreference(appearance)
  }, [appearance])

  useEffect(() => {
    const unsubscribe = subscribeAppearancePreference(setAppearance)
    return unsubscribe
  }, [])

  const toggleAppearance = useCallback(() => {
    setAppearance((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return {
    appearance,
    toggleAppearance,
    setAppearance,
  }
}
