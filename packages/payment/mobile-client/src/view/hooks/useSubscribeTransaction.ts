import { useEffect, useState } from 'react'
import database from '@react-native-firebase/database'
import { PaymentStatus } from 'wing-b2c-payment-sdk/model'

const PAYMENT_STATUS_PATH = 'wingshopping_payment_status'

export const useSubscribeTransaction = (txnId: string) => {
  const [transaction, setTransaction] = useState<PaymentStatus>('pending')

  useEffect(() => {
    const subscription = database().ref(`${PAYMENT_STATUS_PATH}/${txnId}`)

    const onDataChange = (snapshot: any) => {
      const data = snapshot.val()
      setTransaction(data)
    }

    subscription.on('value', onDataChange)

    return () => {
      subscription.off('value', onDataChange)
    }
  }, [txnId])

  return transaction
}
