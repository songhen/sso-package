import React from 'react'
import { View, Text } from 'react-native'
import { createStyles, Mixins } from '../themes'
import { FontWeight } from '../themes/typography'

type BadgeProps = {
  value: number
  badgeSize?: string
}

export const Badge: React.FC<BadgeProps> = ({ value, badgeSize = 'small' }) => {
  if (!value) {
    return null
  }

  let displayValue = value.toString()
  if (value > 99) {
    displayValue = '99+'
  }

  return (
    <View style={[badgeSize === 'small' ? styles.smallBadge : styles.mediumBadge]}>
      <Text style={styles.text}>{displayValue}</Text>
    </View>
  )
}

const styles = createStyles({
  smallBadge: {
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    right: -2,
    top: -2,
    width: 16,
    height: 16,
  },
  mediumBadge: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    right: -2,
    top: -2,
    height: 16,
    minWidth: 16,
    paddingHorizontal: Mixins.Spacing.SCALE_2,
  },
  text: {
    color: 'white',
    fontSize: 9,
    fontWeight: FontWeight.medium,
    lineHeight: 12,
  },
})
