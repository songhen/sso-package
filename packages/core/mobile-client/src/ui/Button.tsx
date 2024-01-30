import React from 'react'
import { StyleProp, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'

import { Text } from './Text'
import { Indicator } from './Indicator'
import { createStyles, Colors, Mixins } from '../themes'
import { FontVariantType, FontWeightType } from '../themes/typography'

export type MyButtonProps = {
  label: string
  disabled?: boolean
  loading?: boolean
  indicatorColor?: (typeof Colors)[keyof typeof Colors]
  rounded?: (typeof Mixins.Spacing)[keyof typeof Mixins.Spacing]
  backgroundColor?: (typeof Colors)[keyof typeof Colors]
  labelVariant?: FontVariantType
  labelWeight?: FontWeightType
  labelColor?: (typeof Colors)[keyof typeof Colors]
  onPress?: () => void
  width?: ViewStyle['width']
  height?: ViewStyle['height']
  style?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  icon?: React.ReactNode
  numberOfLines?: number
}

export const Button: React.FC<MyButtonProps> = ({
  icon,
  width,
  height = 40,
  rounded = Mixins.Spacing.SCALE_8,
  backgroundColor = Colors.WHITE_4,
  loading = false,
  indicatorColor,
  //
  style,
  onPress,
  disabled,
  label,
  labelStyle,
  labelVariant = 'body',
  labelWeight = 'medium',
  labelColor = Colors.DARK_1,
  numberOfLines,
}) => {
  const opacity = disabled ? 0.4 : 1

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[
        styles.container,
        { backgroundColor },
        { borderRadius: rounded },
        { width, height },
        style,
        { opacity },
      ]}
    >
      {icon}
      {loading ? (
        <Indicator size="small" color={indicatorColor} />
      ) : (
        <Text
          color="dark"
          variant={labelVariant}
          style={[styles.labelStyle, { color: labelColor }, icon ? styles.iconLabelStyle : {}, labelStyle]}
          weight={labelWeight}
          numberOfLines={numberOfLines}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = createStyles({
  container: {
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  labelStyle: {
    textAlign: 'center',
  },
  iconLabelStyle: {
    marginLeft: Mixins.Spacing.SCALE_6,
  },
  indicator: {
    marginLeft: Mixins.Spacing.SCALE_8,
  },
})
