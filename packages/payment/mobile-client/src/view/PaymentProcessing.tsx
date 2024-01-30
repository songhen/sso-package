import React, { useCallback, useEffect, useRef } from 'react'
import { View, StyleSheet, AppStateStatus } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { PaymentStatus } from 'wing-b2c-payment-sdk/model'
import { useBackHandler } from 'wing-b2c-core-mobile-sdk/src/hooks/useBackHandler'
import { AbsoluteIndicator } from 'wing-b2c-core-mobile-sdk/src/ui'

import { useAppStateChange } from './hooks/useAppStateChange'
import { useSubscribeTransaction } from './hooks/useSubscribeTransaction'

const PAYMENT_TIMEOUT = 5000
const PAYMENT_WITH_WEB_TIMEOUT = 8000

export function PaymentProcessing({
  componentId,
  txnId,
  with: payWith,
  resolve,
  checkPaymentStatus,
}: {
  componentId: string
  txnId: string
  with?: 'web' | 'app'
  resolve: (status: PaymentStatus) => void
  checkPaymentStatus?: () => Promise<PaymentStatus | null>
}) {
  const timerRef = useRef<null | any>(null)
  const txnStatus = useSubscribeTransaction(txnId)

  useBackHandler(() => true)

  const onAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (appState.match(/active|inactive|background/) && nextAppState === 'active') {
        // Info: check payment status before transaction status
        if (checkPaymentStatus) {
          const paymentStatus = await checkPaymentStatus()
          if (paymentStatus !== 'success') {
            resolve('failed')
            Navigation.dismissOverlay(componentId)
            return
          }
        }

        const timeoutByPlatform = payWith === 'web' ? PAYMENT_WITH_WEB_TIMEOUT : PAYMENT_TIMEOUT
        const timeout = txnStatus === 'success' || txnStatus === 'failed' ? 0 : timeoutByPlatform

        timerRef.current = setTimeout(() => {
          resolve(txnStatus)
          Navigation.dismissOverlay(componentId)
        }, timeout)
      }
    },
    [componentId, resolve, txnStatus, payWith, checkPaymentStatus]
  )

  const appState = useAppStateChange(onAppStateChange)

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    onAppStateChange(appState)
  }, [txnStatus, appState, onAppStateChange])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <View style={styles.container}>
      <AbsoluteIndicator bgOpacity={0.5} loading indicatorColor="primary" label="Processing Payment..." />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
