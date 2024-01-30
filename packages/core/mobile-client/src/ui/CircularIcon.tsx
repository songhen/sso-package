import React, { memo } from 'react'
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  ImageURISource,
  ImageRequireSource,
} from 'react-native'
import FAIcon from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { Colors, createStyles, Mixins } from '../themes'
import { Badge } from './Badge'

type CircularIconProps = {
  hitSlop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  name: string
  icon?: ImageURISource | ImageRequireSource
  size?: number
  solid?: boolean
  onPress?: () => void
  iconSize?: number
  disabled?: boolean
  loading?: boolean
  iconFamily?: 'FA' | 'Ionicons' | 'Image'
  iconColor?: (typeof Colors)[keyof typeof Colors]
  iconStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
  badgeCount?: number
}

export function CircularIcon(props: CircularIconProps) {
  const sizeStyle = {
    width: props.size || Mixins.Spacing.SCALE_32,
    height: props.size || Mixins.Spacing.SCALE_32,
    borderRadius: props.size ? props.size / 2 : Mixins.Radius.SCALE_16,
  }

  const hitSlop = props.hitSlop || { top: 10, bottom: 10, left: 10, right: 10 }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onPress}
      disabled={props.disabled || props.loading}
      hitSlop={hitSlop}
      style={[styles.wrapper, sizeStyle, styles.contentCenter, props.containerStyle]}
    >
      {props.loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <>
          <Icon {...props} />
          {props.badgeCount ? (
            <Badge value={props.badgeCount} badgeSize={props.badgeCount > 99 ? 'medium' : 'small'} />
          ) : null}
        </>
      )}
    </TouchableOpacity>
  )
}

const Icon = ({ iconFamily = 'FA', ...restProps }: CircularIconProps) => {
  const iconSize = restProps.iconSize || 16

  if (iconFamily === 'Ionicons') {
    return (
      <Ionicons
        name={restProps.name}
        color={restProps.iconColor || Colors.DARK_3}
        size={iconSize}
        {...(restProps.solid ? { solid: true } : {})}
        style={restProps.iconStyle}
      />
    )
  }

  if (iconFamily === 'FA') {
    return (
      <FAIcon
        name={restProps.name}
        color={restProps.iconColor || Colors.DARK_3}
        size={iconSize}
        {...(restProps.solid ? { solid: true } : {})}
        style={restProps.iconStyle}
      />
    )
  }

  if (iconFamily === 'Image' && restProps.icon) {
    return (
      <Image
        resizeMode="contain"
        source={restProps.icon}
        style={[
          { width: iconSize, tintColor: restProps.iconColor || Colors.DARK_3 },
          restProps.iconStyle as ImageStyle,
        ]}
      />
    )
  }

  return null
}

const styles = createStyles({
  wrapper: {
    backgroundColor: Colors.WHITE_4,
  },

  resizeContain: {
    resizeMode: 'contain',
  },
})
