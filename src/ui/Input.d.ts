import React from 'react';
import { TextInputProps } from 'react-native';
type InputProps = {
    value: string;
    placeholder: string;
    type?: 'text' | 'phone' | 'select' | 'textarea';
    onChange?: (value: string) => void;
    onSelectPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
    textAlign?: TextInputProps['textAlign'];
    autoCorrect?: TextInputProps['autoCorrect'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    onPressIn?: TextInputProps['onPressIn'];
};
declare const Input: React.FC<InputProps>;
export { Input };
