import React, { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import WebView from 'react-native-webview'
import { WebViewNativeEvent } from 'react-native-webview/lib/WebViewTypes'
import MDIcon from 'react-native-vector-icons/MaterialIcons'
import { Navigation, NavigationComponentProps } from 'react-native-navigation'

import { AbsoluteIndicator } from 'wing-b2c-core-mobile-sdk/src/ui'
import { getStatusBarHeight } from 'wing-b2c-core-mobile-sdk/src/utils/helpers'
import { PaymentStatus } from 'wing-b2c-payment-sdk/model'
import config from '../config'
import { PaymentProcessing } from './PaymentProcessing'

const ERROR_PAGE = 'errorpage'
const PAYMENT_PAGE = 'paymentCard'
const STATUS_AND_BACK = '?status=0&back=true'

type PaymentWithWebViewProps = {
  txnId: string
  url: string
  resolve: (value: PaymentStatus) => void
} & NavigationComponentProps
export function PaymentWithWebView({ componentId, txnId, url, resolve }: PaymentWithWebViewProps) {
  const [closeButtonVisible, setCloseButtonVisible] = useState(false)
  const [finishedPayment, setFinishedPayment] = useState(false)

  const onNavigationStateChange = (nextState: WebViewNativeEvent) => {
    const shouldShowCloseButton =
      (nextState.url.includes(ERROR_PAGE) || nextState.canGoBack) && !nextState.url.includes(PAYMENT_PAGE)
    setCloseButtonVisible(shouldShowCloseButton)

    if (!nextState.url) {
      return
    }

    if (nextState.url.includes(config.paymentSuccessDomain) || nextState.url.includes(STATUS_AND_BACK)) {
      setFinishedPayment(true)
    }
  }

  const dismissOverlay = useCallback(() => {
    resolve('failed')
    Navigation.dismissOverlay(componentId)
  }, [componentId, resolve])

  if (finishedPayment) {
    return <PaymentProcessing componentId={componentId} txnId={txnId} resolve={resolve} />
  }

  return (
    <View style={styles.container}>
      {closeButtonVisible && <TopBar onPress={dismissOverlay} />}
      <WebView
        source={{
          uri: url,
        }}
        bounces={false}
        startInLoadingState
        sharedCookiesEnabled
        javaScriptEnabled
        domStorageEnabled
        style={styles.webView}
        onNavigationStateChange={onNavigationStateChange}
        renderLoading={() => <AbsoluteIndicator loading={true} indicatorColor="secondary" />}
      />
    </View>
  )
}

const TopBar = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.topBarWrapper}>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View style={styles.closeButton}>
          <MDIcon name="close" color="white" size={25} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const STATUS_BAR_HEIGHT = getStatusBarHeight()
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b3250',
    paddingTop: STATUS_BAR_HEIGHT,
  },
  topBarWrapper: {
    width: '100%',
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 50,
    height: 50,
  },
  webView: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20,
  },
})
