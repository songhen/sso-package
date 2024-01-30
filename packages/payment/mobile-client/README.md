<p align="center">
  <a href="https://github.com/nopmengkoung/wing-b2c-modules/tree/feat/payment-sdk">
    <img width="160px" src="https://stage-new-wingmall.web.app/static/media/wing-mall-full-new.9d01c56b.png"><br/>
  </a>
  <h2 align="center">Wing B2C Modules - Payment Mobile SDK</h2>
</p>

Payment integrates across Wing B2C features and provides
you with ease of use for payment provider integration.

[> Learn More][(https://firebase.google.com/products/analytics/](https://github.com/nopmengkoung/wing-b2c-modules/tree/feat/payment-sdk))

## Installation

Requires `wing-b2c-payment-sdk` to be installed.

```bash
yarn add wing-b2c-payment-sdk@https://github.com/nopmengkoung/wing-b2c-modules.git#PaymentSDK-v1.0.3-beta wing-b2c-payment-mobile-sdk@https://github.com/nopmengkoung/wing-b2c-modules.git#PaymentMobileSDK-v1.0.1-beta
```

### iOS
Add below code to `Podfile`

```bash
pod 'wing-b2c-payment-mobile-sdk', :path => '../node_modules/wing-b2c-payment-mobile-sdk'
```

### Android
Add below code to `settings.gradle`

```bash
include ':wing-b2c-payment-mobile-sdk'
project(':wing-b2c-payment-mobile-sdk').projectDir = new File(rootProject.projectDir, '../node_modules/wing-b2c-payment-mobile-sdk/android')
```

Add below code to `build.gradle(app)`

```bash
implementation project(':wing-b2c-payment-mobile-sdk')
```




## Documentation

- [Quick Start](https://github.com/nopmengkoung/wing-b2c-modules/blob/main/docs/payment/usage/index.md)


## License

- See [LICENSE](/LICENSE)

---

<p>
  <img align="left" width="75px" src="https://static.invertase.io/assets/invertase-logo-small.png">
  <p align="left">
    Built and maintained with 💛 by <a href="https://invertase.io">Wing B2C Technogloy</a>.
  </p>
</p>

---
