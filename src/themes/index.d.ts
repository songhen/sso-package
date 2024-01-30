import { StyleSheet } from 'react-native';
import * as Colors from './colors';
import * as Mixins from './mixins';
import * as Typography from './typography';
declare function createStyles(overrides?: StyleSheet.NamedStyles<any>): Mixins.BaseStyles & StyleSheet.NamedStyles<any>;
export { Typography, Colors, Mixins, createStyles };
declare const _default: {
    Typography: typeof Typography;
    Colors: typeof Colors;
    Mixins: typeof Mixins;
    createStyles: typeof createStyles;
};
export default _default;
