import React from 'react';
import { StyleProp, ViewStyle, ImageURISource, ImageRequireSource } from 'react-native';
import { Colors } from '../themes';
type CircularIconProps = {
    hitSlop?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    name: string;
    icon?: ImageURISource | ImageRequireSource;
    size?: number;
    solid?: boolean;
    onPress?: () => void;
    iconSize?: number;
    disabled?: boolean;
    loading?: boolean;
    iconFamily?: 'FA' | 'Ionicons' | 'Image';
    iconColor?: (typeof Colors)[keyof typeof Colors];
    iconStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    badgeCount?: number;
};
export declare function CircularIcon(props: CircularIconProps): React.JSX.Element;
export {};
