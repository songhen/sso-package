import { StyleSheet } from 'react-native'

import * as Colors from './colors'
import * as Mixins from './mixins'
import * as Typography from './typography'

function createStyles(overrides: StyleSheet.NamedStyles<any> = {}) {
  return StyleSheet.create({
    ...Mixins.BASE_STYLES,
    ...overrides,
  }) as Mixins.BaseStyles & typeof overrides
}

export { Typography, Colors, Mixins, createStyles }

export default { Typography, Colors, Mixins, createStyles }
