import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Colors } from '../themes';
type CircularCheckProps = {
    active?: boolean;
    activeBackgroundColor?: (typeof Colors)[keyof typeof Colors];
    size?: number;
    iconSize?: number;
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
};
declare function CircularCheck({ size, active, activeBackgroundColor, onPress, iconSize, disabled, style, }: CircularCheckProps): React.JSX.Element;
declare const _default: React.MemoExoticComponent<typeof CircularCheck>;
export default _default;
