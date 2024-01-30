import React, { memo } from 'react'
import { View, TextInput, TouchableOpacity, ImageStyle, TextInputProps } from 'react-native'

import { createStyles, Colors, Mixins } from '../themes'
import images from '../assets/images'
import {
  FontSize,
  fontFamilyAndWeightByPlatform,
  FontWeightVariant,
  SupportedLocales,
} from '../themes/typography'
import Text from './Text'
import { CircularIcon } from './CircularIcon'
import Image from './Image'

type InputProps = {
  value: string
  placeholder: string
  type?: 'text' | 'phone' | 'select' | 'textarea'
  onChange?: (value: string) => void
  onSelectPress?: () => void
  disabled?: boolean
  loading?: boolean
  textAlign?: TextInputProps['textAlign']
  autoCorrect?: TextInputProps['autoCorrect']
  autoCapitalize?: TextInputProps['autoCapitalize']
  onPressIn?: TextInputProps['onPressIn']
}

const Input: React.FC<InputProps> = memo(
  ({
    value,
    onChange,
    placeholder,
    type = 'text',
    autoCapitalize,
    textAlign,
    autoCorrect,
    onSelectPress,
    disabled,
    loading,
    onPressIn,
  }) => {
    return (
      <View style={styles.inputWrapper}>
        {type !== 'select' ? (
          <TextInput
            value={value}
            multiline={type === 'textarea'}
            editable={!disabled}
            placeholder={placeholder}
            onChangeText={onChange}
            onPressIn={onPressIn}
            allowFontScaling={false}
            autoCorrect={autoCorrect}
            textAlign={textAlign}
            placeholderTextColor={Colors.DARK_20}
            textAlignVertical={type === 'textarea' ? 'top' : 'center'}
            autoCapitalize={autoCapitalize}
            keyboardType={type === 'phone' ? 'phone-pad' : 'default'}
            style={[
              type === 'textarea'
                ? styles.textArea
                : type === 'phone'
                  ? styles.phoneInput
                  : styles.formControl,
            ]}
          />
        ) : (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onSelectPress?.()}
            disabled={disabled || loading}
            style={[styles.formControl, styles.flexCenter, styles.flexRow]}
          >
            <View style={[styles.flex1, styles.selectContentWrapper]}>
              <Text variant="body" colorScaling={value ? '100' : '20'} numberOfLines={1} weight="normal">
                {value || placeholder}
              </Text>
            </View>
            <View style={styles.contentCenter}>
              <CircularIcon
                size={Mixins.Spacing.SCALE_24}
                iconSize={Mixins.Spacing.SCALE_12}
                iconColor={Colors.DARK_40}
                disabled
                name="chevron-down"
                onPress={() => {}}
                loading={loading}
                containerStyle={styles.selectIconWrapper}
              />
            </View>
          </TouchableOpacity>
        )}
        {type === 'phone' ? (
          <View style={[styles.flagWrapper, styles.flexRow, styles.contentCenter]}>
            <Image imageSrc={images.flag} style={styles.flagImage as ImageStyle} resizeMode="contain" />
            <Text weight="normal" colorScaling="60">
              +855
            </Text>
          </View>
        ) : null}
      </View>
    )
  }
)

export { Input }

const styles = createStyles({
  formControl: {
    color: Colors.DARK_1,
    fontSize: FontSize.body,
    backgroundColor: Colors.WHITE_3,
    height: Mixins.ButtonSize.SCALE_40,
    borderRadius: Mixins.Spacing.SCALE_8,
    paddingHorizontal: Mixins.Spacing.SCALE_14,
    ...fontFamilyAndWeightByPlatform(FontWeightVariant.regular, SupportedLocales.EN),
  },
  textArea: {
    color: Colors.DARK_1,
    fontSize: FontSize.body,
    backgroundColor: Colors.WHITE_3,
    borderRadius: Mixins.Spacing.SCALE_8,
    paddingHorizontal: Mixins.Spacing.SCALE_14,
    minHeight: 70,
    textAlignVertical: 'top',
    paddingTop: Mixins.Spacing.SCALE_8,
    ...fontFamilyAndWeightByPlatform(FontWeightVariant.regular, SupportedLocales.EN),
  },
  phoneInput: {
    paddingLeft: 100,
    color: Colors.DARK_1,
    fontSize: FontSize.body,
    backgroundColor: Colors.WHITE_3,
    height: Mixins.ButtonSize.SCALE_40,
    borderRadius: Mixins.Spacing.SCALE_8,
    paddingHorizontal: Mixins.Spacing.SCALE_14,
    ...fontFamilyAndWeightByPlatform(FontWeightVariant.regular, SupportedLocales.EN),
  },
  leftInput: {
    paddingLeft: Mixins.Spacing.SCALE_16,
    paddingRight: Mixins.Spacing.SCALE_8,
  },
  rightInput: {
    paddingLeft: Mixins.Spacing.SCALE_8,
    paddingRight: Mixins.Spacing.SCALE_16,
  },
  inputWrapper: {
    backgroundColor: Colors.WHITE_3,
    borderRadius: Mixins.Spacing.SCALE_8,
  },
  flagWrapper: {
    left: 0,
    top: 0,
    bottom: 0,
    width: 100,
    position: 'absolute',
  },
  flagImage: {
    width: 30,
    height: 20,
    marginRight: Mixins.Spacing.SCALE_8,
  },
  selectIconWrapper: {
    backgroundColor: Colors.WHITE_2,
  },
  selectContentWrapper: {
    marginRight: Mixins.Spacing.SCALE_12,
  },
})
