# Setu

This package helps you work with [Setu's](https://setu.co) deeplink APIs.

[![version](https://img.shields.io/npm/v/@setu/upi-deep-links)](https://www.npmjs.org/package/@setu/upi-deep-links)
[![codecov](https://codecov.io/gh/SetuHQ/npm-upi-deep-links/branch/master/graph/badge.svg)](https://codecov.io/gh/SetuHQ/npm-upi-deep-links)

The following functions are supported

1. Generate UPI payment link
2. Check status of UPI payment link

## Installation

```
npm install @setu/upi-deep-links
```

## Configuration

```
const SetuUPIDeepLink = require("@setu/upi-deep-links")

let setu = new SetuUPIDeepLink({
    schemeId: "YOUR SCHEME ID",
    jwtSecret: "YOUR JWT SECRET",
    setuProductInstanceId: "YOUR PRODUCT INSTANCE ID",
});
```

## Usage

### Generate UPI payment link

```
let paymentLinkBody = {
    amountValue: Number,
    billerBillID: String,
    amountExactness: String,
    dueDate: String, // Optional
    payeeName: String, // Optional
    expiryDate: String, // Optional
    settlement: Object, // Optional
    validationRules: Object // Optional
};

let data = await setu.createPaymentLink(paymentLinkBody);
```

### Check status of UPI payment link

```
let data = await setu.checkPaymentStatus("platformBillID");
```

## License

MIT
