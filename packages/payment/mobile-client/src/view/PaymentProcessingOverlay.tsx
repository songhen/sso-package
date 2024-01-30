import React from 'react'
import { PaymentProcessing } from './PaymentProcessing'
import { PaymentWithWebView } from './PaymentWithWebView'

export function PaymentProcessingOverlay(props: any) {
  return props.with === 'app' ? <PaymentProcessing {...props} /> : <PaymentWithWebView {...props} />
}
