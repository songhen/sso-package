/// <reference types="react" />
import WebView from 'react-native-webview';
import { Text } from './Text';
import { Button } from './Button';
import { Indicator } from './Indicator';
import { Image } from './Image';
import { Badge } from './Badge';
import { CircularIcon } from './CircularIcon';
import CircularCheck from './CircularCheck';
import { ContainerView } from './ContainerView';
import { Divider } from './Divider';
import { Modal } from './Modal';
import { RadioOption } from './RadioOption';
import { TagButton } from './TagButton';
import AbsoluteIndicator from './AbsoluteIndicator';
export { AbsoluteIndicator, Badge, Button, CircularCheck, CircularIcon, ContainerView, Divider, Image, Indicator, Modal, RadioOption, TagButton, Text, WebView, };
declare const _default: {
    AbsoluteIndicator: import("react").MemoExoticComponent<({ loading, indicatorColor, label, bgOpacity, }: {
        loading?: boolean | undefined;
        indicatorColor?: "dark" | "white" | "primary" | "secondary" | "positive" | "negative" | "warning" | "inactive" | "orange" | undefined;
        label?: string | undefined;
        bgOpacity?: number | undefined;
    }) => import("react").JSX.Element | null>;
    Badge: import("react").FC<{
        value: number;
        badgeSize?: string | undefined;
    }>;
    Button: import("react").FC<import("./Button").MyButtonProps>;
    CircularCheck: import("react").MemoExoticComponent<({ size, active, activeBackgroundColor, onPress, iconSize, disabled, style, }: {
        active?: boolean | undefined;
        activeBackgroundColor?: "#FFFFFF" | "#F9F9F9" | "#F3F3F3" | "#EDEDED" | "#E7E7E7" | "#E4E4E4" | "#201F1F" | "#6A6565" | "#888484" | "#A6A3A3" | "#C3C2C2" | "#D3D2D2" | "#FFCD00" | "#FDD331" | "#FBDC62" | "#F9E493" | "#F7EDC4" | "#F6F1DD" | "#f6f1dd80" | "#003595" | "#315BA7" | "#6282BB" | "#93A8CE" | "#C4CFE2" | "#DDE2EC" | "#FCFCFC" | "#D9D9D9" | "#F5F6F7" | "#E20808" | "#EA0C0C1A" | "#EA4E3D" | "#EA0C0C" | "#2DB433" | "#9EA7AD" | "#7E7E7E" | "rgba(248, 150, 30, 1)" | "rgba(39, 39, 39, 0.4)" | "rgba(0, 53, 148, 0.4)" | "rgba(0, 53, 148, 0.2)" | "rgba(245, 211, 211, 0.4)" | "rgba(245, 211, 211, 0.9)" | "rgba(0,0,0,0.1)" | "rgba(0,0,0,0.5)" | "transparent" | undefined;
        size?: number | undefined;
        iconSize?: number | undefined;
        onPress?: (() => void) | undefined;
        disabled?: boolean | undefined;
        style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
    }) => import("react").JSX.Element>;
    CircularIcon: typeof CircularIcon;
    Divider: import("react").FC<{
        height?: number | undefined;
        style?: import("react-native").ViewStyle | undefined;
    }>;
    Image: import("react").FC<import("./Image").MyImageProps & Omit<import("react-native").ImageProps, "source">>;
    Indicator: import("react").FC<import("react-native").ActivityIndicatorProps>;
    Modal: import("react").ForwardRefExoticComponent<{
        title?: string | undefined;
        backdropColor?: "#FFFFFF" | "#F9F9F9" | "#F3F3F3" | "#EDEDED" | "#E7E7E7" | "#E4E4E4" | "#201F1F" | "#6A6565" | "#888484" | "#A6A3A3" | "#C3C2C2" | "#D3D2D2" | "#FFCD00" | "#FDD331" | "#FBDC62" | "#F9E493" | "#F7EDC4" | "#F6F1DD" | "#f6f1dd80" | "#003595" | "#315BA7" | "#6282BB" | "#93A8CE" | "#C4CFE2" | "#DDE2EC" | "#FCFCFC" | "#D9D9D9" | "#F5F6F7" | "#E20808" | "#EA0C0C1A" | "#EA4E3D" | "#EA0C0C" | "#2DB433" | "#9EA7AD" | "#7E7E7E" | "rgba(248, 150, 30, 1)" | "rgba(39, 39, 39, 0.4)" | "rgba(0, 53, 148, 0.4)" | "rgba(0, 53, 148, 0.2)" | "rgba(245, 211, 211, 0.4)" | "rgba(245, 211, 211, 0.9)" | "rgba(0,0,0,0.1)" | "rgba(0,0,0,0.5)" | "transparent" | undefined;
        children?: import("react").ReactNode;
        contentHeight?: string | number | undefined;
        cancellable?: boolean | undefined;
        hideCloseButton?: boolean | undefined;
        onPressBackdrop?: (() => void) | undefined;
        onPressCloseButton?: (() => void) | undefined;
        onHardwareBackButtonPress?: (() => void) | undefined;
    } & import("react").RefAttributes<import("./Modal").ModalHandle>>;
    RadioOption: typeof RadioOption;
    TagButton: import("react").FC<{
        active?: boolean | undefined;
        label: string;
        disabled?: boolean | undefined;
        activeBackgroundColor?: "#FFFFFF" | "#F9F9F9" | "#F3F3F3" | "#EDEDED" | "#E7E7E7" | "#E4E4E4" | "#201F1F" | "#6A6565" | "#888484" | "#A6A3A3" | "#C3C2C2" | "#D3D2D2" | "#FFCD00" | "#FDD331" | "#FBDC62" | "#F9E493" | "#F7EDC4" | "#F6F1DD" | "#f6f1dd80" | "#003595" | "#315BA7" | "#6282BB" | "#93A8CE" | "#C4CFE2" | "#DDE2EC" | "#FCFCFC" | "#D9D9D9" | "#F5F6F7" | "#E20808" | "#EA0C0C1A" | "#EA4E3D" | "#EA0C0C" | "#2DB433" | "#9EA7AD" | "#7E7E7E" | "rgba(248, 150, 30, 1)" | "rgba(39, 39, 39, 0.4)" | "rgba(0, 53, 148, 0.4)" | "rgba(0, 53, 148, 0.2)" | "rgba(245, 211, 211, 0.4)" | "rgba(245, 211, 211, 0.9)" | "rgba(0,0,0,0.1)" | "rgba(0,0,0,0.5)" | "transparent" | undefined;
        inActiveBackgroundColor?: "#FFFFFF" | "#F9F9F9" | "#F3F3F3" | "#EDEDED" | "#E7E7E7" | "#E4E4E4" | "#201F1F" | "#6A6565" | "#888484" | "#A6A3A3" | "#C3C2C2" | "#D3D2D2" | "#FFCD00" | "#FDD331" | "#FBDC62" | "#F9E493" | "#F7EDC4" | "#F6F1DD" | "#f6f1dd80" | "#003595" | "#315BA7" | "#6282BB" | "#93A8CE" | "#C4CFE2" | "#DDE2EC" | "#FCFCFC" | "#D9D9D9" | "#F5F6F7" | "#E20808" | "#EA0C0C1A" | "#EA4E3D" | "#EA0C0C" | "#2DB433" | "#9EA7AD" | "#7E7E7E" | "rgba(248, 150, 30, 1)" | "rgba(39, 39, 39, 0.4)" | "rgba(0, 53, 148, 0.4)" | "rgba(0, 53, 148, 0.2)" | "rgba(245, 211, 211, 0.4)" | "rgba(245, 211, 211, 0.9)" | "rgba(0,0,0,0.1)" | "rgba(0,0,0,0.5)" | "transparent" | undefined;
        activeLabelColor?: "#FFFFFF" | "#F9F9F9" | "#F3F3F3" | "#EDEDED" | "#E7E7E7" | "#E4E4E4" | "#201F1F" | "#6A6565" | "#888484" | "#A6A3A3" | "#C3C2C2" | "#D3D2D2" | "#FFCD00" | "#FDD331" | "#FBDC62" | "#F9E493" | "#F7EDC4" | "#F6F1DD" | "#f6f1dd80" | "#003595" | "#315BA7" | "#6282BB" | "#93A8CE" | "#C4CFE2" | "#DDE2EC" | "#FCFCFC" | "#D9D9D9" | "#F5F6F7" | "#E20808" | "#EA0C0C1A" | "#EA4E3D" | "#EA0C0C" | "#2DB433" | "#9EA7AD" | "#7E7E7E" | "rgba(248, 150, 30, 1)" | "rgba(39, 39, 39, 0.4)" | "rgba(0, 53, 148, 0.4)" | "rgba(0, 53, 148, 0.2)" | "rgba(245, 211, 211, 0.4)" | "rgba(245, 211, 211, 0.9)" | "rgba(0,0,0,0.1)" | "rgba(0,0,0,0.5)" | "transparent" | undefined;
        inActiveLabelColor?: "#FFFFFF" | "#F9F9F9" | "#F3F3F3" | "#EDEDED" | "#E7E7E7" | "#E4E4E4" | "#201F1F" | "#6A6565" | "#888484" | "#A6A3A3" | "#C3C2C2" | "#D3D2D2" | "#FFCD00" | "#FDD331" | "#FBDC62" | "#F9E493" | "#F7EDC4" | "#F6F1DD" | "#f6f1dd80" | "#003595" | "#315BA7" | "#6282BB" | "#93A8CE" | "#C4CFE2" | "#DDE2EC" | "#FCFCFC" | "#D9D9D9" | "#F5F6F7" | "#E20808" | "#EA0C0C1A" | "#EA4E3D" | "#EA0C0C" | "#2DB433" | "#9EA7AD" | "#7E7E7E" | "rgba(248, 150, 30, 1)" | "rgba(39, 39, 39, 0.4)" | "rgba(0, 53, 148, 0.4)" | "rgba(0, 53, 148, 0.2)" | "rgba(245, 211, 211, 0.4)" | "rgba(245, 211, 211, 0.9)" | "rgba(0,0,0,0.1)" | "rgba(0,0,0,0.5)" | "transparent" | undefined;
        closeButtonStyle?: import("react-native").StyleProp<import("react-native").ViewStyle>;
        closeIconStyle?: import("react-native").StyleProp<import("react-native").ImageStyle>;
        helperLabel?: string | undefined;
        helperLabelStyle?: import("react-native").StyleProp<import("react-native").TextStyle>;
        onPress?: (() => void) | undefined;
        onPressClose?: (() => void) | undefined;
    }>;
    Text: import("react").ComponentType<Omit<import("react-i18next/helpers").$Subtract<import("./Text").MyTextProps & import("react-i18next").WithTranslation<undefined, undefined>, import("react-i18next").WithTranslationProps>, keyof import("react-i18next").WithTranslation<Ns, undefined>> & import("react-i18next").WithTranslationProps>;
    WebView: typeof WebView;
};
export default _default;
