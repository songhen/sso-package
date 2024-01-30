import React, { useMemo } from 'react'
import { View, ViewStyle } from 'react-native'
import { Colors, Mixins } from '../themes'

type RadioOptionProps = {
  size?: number
  selected?: boolean
  onPress?: () => void
  color?: (typeof Colors)[keyof typeof Colors]
}

export function RadioOption({
  size = Mixins.ButtonSize.SCALE_20,
  color = Colors.SECONDARY_1,
  selected,
}: RadioOptionProps) {
  const styles = useMemo((): Record<string, ViewStyle> => {
    return {
      outer: {
        height: size,
        width: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: selected ? color : Colors.SECONDARY_10,
      },
      circle: {
        width: size - 4,
        height: size - 4,
        borderRadius: (size - 2) / 2,
        backgroundColor: Colors.WHITE_1,
      },
      inner: {
        height: size - 8,
        width: size - 8,
        borderRadius: size / 2,
        position: 'absolute',
        backgroundColor: color,
      },
    }
  }, [size, selected, color])

  return (
    <View style={styles.outer}>
      <View style={styles.circle} />
      {selected ? <View style={styles.inner} /> : null}
    </View>
  )
}
