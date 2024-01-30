import { useEffect, useState } from 'react'
import { AppState, AppStateStatus } from 'react-native'

export const useAppStateChange = (onChange: (nextAppState: AppStateStatus) => void) => {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState)

      if (onChange) {
        onChange(nextAppState)
      }
    }

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange)

    return () => {
      appStateSubscription.remove()
    }
  }, [onChange])

  return appState
}
