import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'

export const Indicator: React.FC<ActivityIndicatorProps> = ({ ...restProps }) => {
  return <ActivityIndicator size="large" {...restProps} />
}
