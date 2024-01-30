import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'

import { Indicator } from './Indicator'
import { MyTextProps, Text } from './Text'

const AbsoluteIndicator = ({
  loading = false,
  indicatorColor = 'primary' as MyTextProps['color'],
  label = '',
  bgOpacity = 0.3,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start()
    } else {
      fadeAnim.setValue(0)
    }
  }, [loading])

  return loading ? (
    <Animated.View
      style={[
        styles.wrapper,
        {
          backgroundColor: `rgba(0, 0, 0, ${fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, bgOpacity],
          })})`,
        },
      ]}
    >
      <View>
        <Indicator size={60} color={indicatorColor} />
      </View>
      {label ? (
        <Text color={indicatorColor} variant="caption2">
          {label}
        </Text>
      ) : null}
    </Animated.View>
  ) : null
}

const styles = StyleSheet.create({
  wrapper: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default React.memo(AbsoluteIndicator)
