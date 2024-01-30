import React from 'react'
import { View, ViewStyle } from 'react-native'

import { createStyles, Colors } from '../themes'

export const Divider: React.FC<{ height?: number; style?: ViewStyle }> = ({ height = 8, style }) => {
  return <View style={[styles.container, { height }, style]} />
}

const styles = createStyles({
  container: {
    width: '100%',
    backgroundColor: Colors.WHITE_3,
  },
})
