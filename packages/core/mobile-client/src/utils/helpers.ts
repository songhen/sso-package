import { Dimensions, Platform, StatusBar } from 'react-native'

import { PreciseCalculator } from './precise-calculator'
import DeviceInfo from 'react-native-device-info'

export const TOP_BAR_HEIGHT = 48
export const WINDOW_WIDTH = Dimensions.get('window').width
export const WINDOW_HEIGHT = Dimensions.get('window').height
export const SCREEN_HEIGHT = Dimensions.get('screen').height

export function replaceAll(str: string, find: RegExp, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace)
}

export const isIOS = Platform.OS === 'ios'
export const isAndroid = Platform.OS === 'android'

export const isHasDynamicIsland = DeviceInfo.hasDynamicIsland()

export const isIphoneX = () => isIOS && WINDOW_HEIGHT >= 812
export const isIphoneSE = () => isIOS && WINDOW_HEIGHT <= 670

export const VersionOver30 = Number(Platform.Version) >= 30 && isAndroid
export const VersionOver33 = Number(Platform.Version) >= 33 && isAndroid

export const getStatusBarHeight = () => {
  const IOS_STATUS_BAR_HEIGHT = isIphoneX() ? 44 : 20
  const ANDROID_STATUS_BAR_HEIGHT = StatusBar.currentHeight || 20
  const STATUS_BAR_HEIGHT = isIOS ? IOS_STATUS_BAR_HEIGHT : ANDROID_STATUS_BAR_HEIGHT

  return STATUS_BAR_HEIGHT
}

export const getDefaultModalHeight = () => {
  return WINDOW_HEIGHT - getStatusBarHeight() - TOP_BAR_HEIGHT
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const centToDollar = (value: number): string => {
  const calculator = new PreciseCalculator(value)
  calculator.div(100)
  const dollarValue = calculator.val()
  return formatNumberWithAbbreviateSuffix({ value: dollarValue, abbrFromValue: 10000 })
}

export const centToWingcoin = (value: number): string => {
  return formatNumberWithAbbreviateSuffix({ value, abbrFromValue: 10000 })
}

/**
 * Formats a number with an abbreviated suffix.
 *
 * If the value is less than 10,000, it returns the value as a string.
 * If the value is greater than or equal to 10,000, it calculates the appropriate suffix (K for thousands, M for millions, B for billions, T for trillions, Q for quadrillions) based on the logarithm of the value divided by 1,000.
 * It then divides the value by 1,000 raised to the power of the logarithm and returns the result as a string with the suffix appended.
 *
 * @param value - The number to be formatted.
 * @param abbrFromValue - The starting point of value where to be formatted.
 * @returns The formatted number as a string.
 */
export const formatNumberWithAbbreviateSuffix = ({
  value,
  abbrFromValue = 1000,
}: {
  value: number
  abbrFromValue: number
}): string => {
  if (value < abbrFromValue) {
    return value.toString()
  }

  const exp = Math.floor(Math.log(value) / Math.log(1000))
  const suffix = 'KMBTQ'[exp - 1]
  const decimalDigits = (value / Math.pow(1000, exp)).toFixed(1)
  return `${decimalDigits}${suffix}`
}

export const formatPhoneNumber = (phoneNumber: string) => {
  return `+855${phoneNumber.replace(/^0/, '')}`
}

export const formatPhoneNumberToNumber = (phoneNumber: string) => {
  return phoneNumber.replace('+855', '')
}
