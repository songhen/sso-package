import React from 'react';
import { ViewStyle } from 'react-native';
import { Colors } from '../themes';
type ModalProps = {
    title?: string;
    backdropColor?: (typeof Colors)[keyof typeof Colors];
    children?: React.ReactNode;
    contentHeight?: ViewStyle['height'];
    cancellable?: boolean;
    hideCloseButton?: boolean;
    onPressBackdrop?: () => void;
    onPressCloseButton?: () => void;
    onHardwareBackButtonPress?: () => void;
};
export type ModalHandle = {
    onShow: () => Promise<unknown>;
    onHide: () => Promise<unknown>;
};
export declare const EasingPreset: {
    EASE_IN_CUBIC: import("react-native").EasingFunction;
    EASE_OUT_CUBIC: import("react-native").EasingFunction;
    EASE_IN_OUT_CUBIC: import("react-native").EasingFunction;
};
export declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<ModalHandle>>;
export {};
