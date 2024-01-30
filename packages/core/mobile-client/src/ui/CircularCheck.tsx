import React, { memo } from 'react'
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome5'

import { Colors, createStyles, Mixins } from '../themes'

type CircularCheckProps = {
  active?: boolean
  activeBackgroundColor?: (typeof Colors)[keyof typeof Colors]
  size?: number
  iconSize?: number
  onPress?: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

function CircularCheck({
  size = Mixins.Spacing.SCALE_16,
  active = false,
  activeBackgroundColor = Colors.SECONDARY_1,
  onPress,
  iconSize = 10,
  disabled = false,
  style,
}: CircularCheckProps) {
  const iconColor = active ? Colors.WHITE_1 : Colors.WHITE_1
  let backgroundColor = active ? activeBackgroundColor : Colors.DARK_5

  if (disabled) {
    backgroundColor = Colors.DARK_6 + '70'
  }

  const wrapperStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
  }

  const whiteCircle = {
    width: size - 4,
    height: size - 4,
    borderRadius: (size - 4) / 2,
  }

  const inner = {
    width: size - 2,
    height: size - 2,
    borderRadius: (size - 2) / 2,
    backgroundColor,
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || !onPress}
      style={[styles.checkButton, styles.contentCenter, wrapperStyle, style]}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 40 }}
    >
      <View style={[styles.whiteCircle, whiteCircle, styles.contentCenter]}>
        {active && (
          <View style={[styles.inner, inner, styles.contentCenter]}>
            <FAIcon name="check" color={iconColor} size={iconSize} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = createStyles({
  checkButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteCircle: {
    backgroundColor: Colors.WHITE_1,
  },
  inner: {
    position: 'absolute',
  },
})

export default memo(
  CircularCheck,
  (prev, next) =>
    prev.active === next.active &&
    prev.disabled === next.disabled &&
    prev.size === next.size &&
    prev.iconSize === next.iconSize &&
    prev.onPress === next.onPress &&
    prev.style === next.style
)
