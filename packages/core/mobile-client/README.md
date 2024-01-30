<p align="center">
  <a href="https://github.com/nopmengkoung/wing-b2c-modules/tree/feat/core-sdk">
    <img width="160px" src="https://stage-new-wingmall.web.app/static/media/wing-mall-full-new.9d01c56b.png"><br/>
  </a>
  <h2 align="center">Wing B2C Modules - Core Mobile SDK</h2>
</p>

Core module integrates across Wing B2C features and provides
you with common ui, theme configuration, utils and so on.

[> Learn More](https://github.com/nopmengkoung/wing-b2c-modules/tree/feat/core-mobile-sdk)

## Installation

```bash
yarn add wing-b2c-core-mobile-sdk@https://github.com/nopmengkoung/wing-b2c-modules.git#CoreMobileSDK-v1.0.0-beta
```

### iOS
Add below code to `Podfile`

```bash
pod 'wing-b2c-core-mobile-sdk', :path => '../node_modules/wing-b2c-core-mobile-sdk'
```

### Android
Add below code to `settings.gradle`

```bash
include ':wing-b2c-core-mobile-sdk'
project(':wing-b2c-core-mobile-sdk').projectDir = new File(rootProject.projectDir, '../node_modules/wing-b2c-core-mobile-sdk/android')
```

Add below code to `build.gradle(app)`

```bash
implementation project(':wing-b2c-core-mobile-sdk')
```




## Documentation

- [Quick Start](https://github.com/nopmengkoung/wing-b2c-modules/blob/main/docs/core/usage/index.md)

### UI Components
- AbsoluteIndicator
- Badge
- Button
- CircularCheck
- CircularIcon
- Divider
- Image
- Indicator
- Modal
- RadioOption
- TagButton
- Text
- WebView

### Themes
- colors
- mixins
- typography

### Utils
- helpers
- precise-calculator



## License

- See [LICENSE](/LICENSE)

---

<p>
  <img align="left" width="75px" src="[https://static.invertase.io/assets/invertase-logo-small.png](https://stage-new-wingmall.web.app/static/media/wing-mall-full-new.9d01c56b.png">
  <p align="left">
    Built and maintained with 💛 by <a href="https://github.com/nopmengkoung/wing-b2c-modules.git">Wing B2C Technogloy</a>.
  </p>
</p>

---
