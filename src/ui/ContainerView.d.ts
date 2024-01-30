import React from 'react';
import { ScrollView, ScrollViewProps, ViewProps } from 'react-native';
interface ContainerViewPros extends ViewProps, ScrollViewProps {
    scrollable?: boolean;
    scrollViewRef?: React.ForwardedRef<ScrollView | null>;
}
export declare const ContainerView: ({ scrollable, style, contentContainerStyle, scrollViewRef, ...restProps }: ContainerViewPros) => React.JSX.Element;
export {};
