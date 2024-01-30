"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagButton = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const assets_1 = __importDefault(require("../assets"));
const themes_1 = require("../themes");
const Text_1 = require("./Text");
const TagButton = ({ active = false, disabled, activeBackgroundColor = themes_1.Colors.PRIMARY_5, inActiveBackgroundColor = themes_1.Colors.WHITE_3, activeLabelColor = themes_1.Colors.DARK_1, inActiveLabelColor = themes_1.Colors.DARK_2, label = '256 GB', helperLabel, helperLabelStyle, closeButtonStyle, closeIconStyle, onPress, onPressClose, }) => {
    let backgroundContainer = active
        ? { backgroundColor: activeBackgroundColor }
        : { backgroundColor: inActiveBackgroundColor };
    backgroundContainer = disabled ? { backgroundColor: themes_1.Colors.WHITE_3 } : backgroundContainer;
    let labelColor = active ? { color: activeLabelColor } : { color: inActiveLabelColor };
    labelColor = disabled ? { color: themes_1.Colors.DARK_5 } : labelColor;
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onPress, disabled: disabled, style: [styles.buttonContainer, backgroundContainer] },
            react_1.default.createElement(Text_1.Text, { color: "dark", variant: "body", style: labelColor }, label),
            onPressClose ? (react_1.default.createElement(react_native_1.TouchableOpacity, { style: [styles.closeButton, closeButtonStyle], onPress: onPressClose },
                react_1.default.createElement(react_native_1.Image, { source: assets_1.default.icons.closeIcon, style: [styles.iconClose, closeIconStyle] }))) : null),
        helperLabel ? (react_1.default.createElement(Text_1.Text, { variant: "caption", style: [styles.helperLabel, helperLabelStyle] }, helperLabel)) : null));
};
exports.TagButton = TagButton;
const styles = (0, themes_1.createStyles)({
    container: {
        paddingHorizontal: themes_1.Mixins.Spacing.SCALE_4,
        paddingVertical: themes_1.Mixins.Spacing.SCALE_4,
        alignSelf: 'flex-start',
    },
    buttonContainer: {
        borderRadius: 64,
        backgroundColor: themes_1.Colors.PRIMARY_5,
        paddingVertical: themes_1.Mixins.Spacing.SCALE_8,
        paddingHorizontal: themes_1.Mixins.Spacing.SCALE_16,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        width: 16,
        height: 16,
        borderRadius: 8,
        padding: themes_1.Mixins.Spacing.SCALE_4,
        backgroundColor: themes_1.Colors.PRIMARY_1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: themes_1.Mixins.Spacing.SCALE_4,
    },
    iconClose: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        tintColor: themes_1.Colors.SECONDARY_1,
    },
    helperLabel: {
        color: themes_1.Colors.DARK_RED,
        alignSelf: 'center',
        marginTop: themes_1.Mixins.Spacing.SCALE_2,
    },
});
