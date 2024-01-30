import React from 'react';
import { Colors } from '../themes';
type RadioOptionProps = {
    size?: number;
    selected?: boolean;
    onPress?: () => void;
    color?: (typeof Colors)[keyof typeof Colors];
};
export declare function RadioOption({ size, color, selected, }: RadioOptionProps): React.JSX.Element;
export {};
