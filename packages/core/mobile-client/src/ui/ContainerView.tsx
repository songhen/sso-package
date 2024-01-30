import React from 'react'
import { ScrollView, ScrollViewProps, View, ViewProps } from 'react-native'

import { createStyles, Mixins } from '../themes'

interface ContainerViewPros extends ViewProps, ScrollViewProps {
  scrollable?: boolean
  scrollViewRef?: React.ForwardedRef<ScrollView | null>
}

export const ContainerView = ({
  scrollable,
  style,
  contentContainerStyle,
  scrollViewRef,
  ...restProps
}: ContainerViewPros) => {
  if (!scrollable) {
    return <View style={[styles.flex1, style]} {...restProps} />
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={style}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.scrollViewContent, contentContainerStyle]}
      {...restProps}
    />
  )
}

const styles = createStyles({
  scrollViewContent: {
    paddingBottom: Mixins.Spacing.SCALE_32,
  },
})
