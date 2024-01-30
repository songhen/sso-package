import React, { memo, useRef, useState } from 'react'
import {
  View,
  Animated,
  Image as RNImage,
  ImageProps as RNImageProps,
  ImageStyle,
  ImageURISource,
  ImageRequireSource,
} from 'react-native'

import { Colors, createStyles } from '../themes'
import assets from '../assets/images'

export interface MyImageProps {
  imageWidth?: ImageStyle['width']
  imageHeight?: ImageStyle['height']
  imageSrc: ImageURISource | ImageRequireSource
  fallbackImage?: ImageURISource | ImageRequireSource
  animated?: boolean
}

export const Image: React.FC<MyImageProps & Omit<RNImageProps, 'source'>> = ({
  imageHeight,
  imageWidth,
  imageSrc,
  fallbackImage = assets.fallbackImage,
  style,
  animated = true,
  ...restProps
}) => {
  const isLocalImage = Boolean(typeof imageSrc === 'number')
  const isRemoteImage = Boolean(
    typeof imageSrc === 'object' && imageSrc.hasOwnProperty('uri') && imageSrc.uri
  )
  const [{ loading, error }, setError] = useState({
    loading: isRemoteImage,
    error: false,
  })

  const imageStyle = { width: imageWidth, height: imageHeight } as ImageStyle
  const imageAnimated = useRef(new Animated.Value(animated && isRemoteImage ? 0 : 1)).current

  if (!error && isRemoteImage) {
    return (
      <View style={[imageStyle, style]}>
        <View>
          <Animated.Image
            {...restProps}
            source={imageSrc}
            style={[imageStyle, style, { opacity: imageAnimated }]}
            onError={() => {
              setError(prev => ({ ...prev, error: true }))

              if (animated) {
                Animated.timing(imageAnimated, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }).start()
              }
            }}
            onLoad={() => {
              setError(prev => ({ ...prev, loading: false }))

              if (animated) {
                Animated.timing(imageAnimated, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                }).start()
              }
            }}
          />

          {loading ? (
            <View style={[imageStyle, style, styles.imageOverlay]}>
              {/* <RNImage source={images.fallbackImage} style={[imageStyle, style]} blurRadius={isAndroid ? 2 : 5} /> */}
            </View>
          ) : null}
        </View>
      </View>
    )
  }

  if (isLocalImage) {
    return (
      <View style={[imageStyle, style]}>
        <RNImage {...restProps} source={imageSrc} style={[imageStyle, style]} />
      </View>
    )
  }

  return (
    <View style={[imageStyle, style]}>
      <RNImage {...restProps} source={fallbackImage} style={[imageStyle, style]} />
    </View>
  )
}

const styles = createStyles({
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.PLACEHOLDER,
  },
})

export default memo(
  Image,
  (prev, next) =>
    next.style === prev.style &&
    prev.imageSrc === next.imageSrc &&
    prev.imageWidth === next.imageWidth &&
    prev.imageHeight === next.imageHeight
)
