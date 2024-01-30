import React, { useImperativeHandle, useRef, useState } from 'react'
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native'

import { useBackHandler } from '../hooks/useBackHandler'
import { createStyles, Colors, Mixins } from '../themes'
import { getDefaultModalHeight } from '../utils/helpers'
import Text from './Text'
import FAIcon from 'react-native-vector-icons/FontAwesome5'

type ModalProps = {
  title?: string
  backdropColor?: (typeof Colors)[keyof typeof Colors]
  children?: React.ReactNode
  contentHeight?: ViewStyle['height']
  cancellable?: boolean
  hideCloseButton?: boolean
  onPressBackdrop?: () => void
  onPressCloseButton?: () => void
  onHardwareBackButtonPress?: () => void
}

export type ModalHandle = {
  onShow: () => Promise<unknown>
  onHide: () => Promise<unknown>
}

export const EasingPreset = {
  EASE_IN_CUBIC: Easing.bezier(0.32, 0, 0.67, 0),
  EASE_OUT_CUBIC: Easing.bezier(0.33, 1, 0.68, 1),
  EASE_IN_OUT_CUBIC: Easing.bezier(0.65, 0, 0.35, 1),
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableWithoutFeedback)
const Visibility = {
  SHOW: 1,
  HIDE: 0,
}

const ALLOW_HARDWARE_BACK_BUTTON_PRESS = false
const DISALLOW_HARDWARE_BACK_BUTTON_PRESS = true

const backHandler = (enabled: boolean, callback?: () => void) => {
  if (enabled) {
    callback?.()
    return ALLOW_HARDWARE_BACK_BUTTON_PRESS
  }
  return DISALLOW_HARDWARE_BACK_BUTTON_PRESS
}

export const Modal = React.forwardRef<ModalHandle, ModalProps>(
  (
    {
      children,
      title,
      cancellable,
      hideCloseButton,
      contentHeight = getDefaultModalHeight(),
      onHardwareBackButtonPress,
      onPressCloseButton,
      onPressBackdrop,
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false)
    const fadeAnimation = useRef(new Animated.Value(0)).current
    const fadeInUpAnimation = useRef(new Animated.Value(0)).current

    useBackHandler(() => backHandler(Boolean(cancellable), onHardwareBackButtonPress))

    useImperativeHandle(ref, () => ({
      onShow: _onShow,
      onHide: _onHide,
    }))

    const _onShow = React.useCallback(async () => {
      setVisible(true)
      await onToggle(Visibility.SHOW)
    }, [])

    const _onHide = React.useCallback(async () => {
      await onToggle(Visibility.HIDE)
      setVisible(false)
    }, [])

    const onToggle = (toValue: number) => {
      return new Promise(resolve => {
        Animated.parallel([
          Animated.timing(fadeInUpAnimation, {
            toValue,
            duration: 300,
            easing: EasingPreset.EASE_OUT_CUBIC,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnimation, {
            toValue,
            duration: 100,
            useNativeDriver: true,
            easing: EasingPreset.EASE_IN_CUBIC,
          }),
        ]).start(result => {
          if (result.finished) {
            resolve('done')
          }
        })
      })
    }

    const cardOpacity = fadeInUpAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    })

    const translateY = fadeInUpAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [200, 0],
      extrapolate: 'clamp',
    })

    if (!visible) {
      return null
    }

    return (
      <View style={styles.container}>
        <AnimatedTouchable
          onPress={async () => {
            if (!onPressBackdrop) {
              return
            }
            await _onHide()
            onPressBackdrop?.()
          }}
          style={[{ opacity: fadeAnimation }]}
        >
          <View style={[styles.backdrop]} />
        </AnimatedTouchable>

        <Animated.View
          style={[
            styles.card,
            { height: contentHeight },
            { opacity: cardOpacity, transform: [{ translateY }] },
          ]}
        >
          <BottomSheetDragIndicator />

          <View style={styles.titleWrapper}>
            {title ? (
              <View style={[styles.flex1, styles.title]}>
                <Text color="dark" colorScaling="100" variant="title">
                  {title}
                </Text>
              </View>
            ) : null}
            {hideCloseButton ? null : (
              <ButtonClose
                onPress={async () => {
                  if (!onPressCloseButton) {
                    return
                  }

                  await _onHide()
                  onPressCloseButton?.()
                }}
              />
            )}
          </View>

          {children}
        </Animated.View>
      </View>
    )
  }
)

const BottomSheetDragIndicator: React.FC = () => {
  return <View style={styles.bottomSheetDragIndicator} />
}

type ButtonCloseProps = {
  onPress: () => void
}

const ButtonClose: React.FC<ButtonCloseProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
      hitSlop={{ right: 10, left: 10, top: 10, bottom: 10 }}
    >
      <FAIcon size={12} name="times" color={Colors.DARK_4} />
    </TouchableOpacity>
  )
}

const styles = createStyles({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  backdrop: {
    backgroundColor: Colors.MODAL_BACKDROP_50,
    ...StyleSheet.absoluteFillObject,
  },

  titleWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Mixins.Spacing.SCALE_12,
  },

  title: {
    marginHorizontal: Mixins.Spacing.SCALE_16,
  },

  card: {
    width: '100%',
    maxHeight: '90%',
    backgroundColor: Colors.WHITE_1,
    borderTopStartRadius: Mixins.Spacing.SCALE_12,
    borderTopEndRadius: Mixins.Spacing.SCALE_12,
  },

  bottomSheetDragIndicator: {
    marginTop: 8,
    height: 4,
    alignSelf: 'center',
    width: '10%',
    backgroundColor: Colors.DARK_4,
    borderRadius: 12,
  },

  buttonContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE_5,
    alignSelf: 'flex-start',
    alignItems: 'center',
    marginRight: 16,
    marginLeft: 'auto',
  },
})
