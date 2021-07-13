# Setu

This package helps you use [Setu’s](https://setu.co/payments/upi-deeplinks) [DeepLink](https://docs.setu.co/collect/biller/upi-deep-links) APIs.

[![version](https://img.shields.io/npm/v/@setu/upi-deep-links)](https://www.npmjs.org/package/@setu/upi-deep-links)

The following functions are supported—

1. Generate UPI payment link
2. Check status of UPI payment link

## Installation

```
npm install @setu/upi-deep-links

(OR)

yarn add @setu/upi-deep-links
```
---

## Configuration

```
const SetuUPIDeepLink = require("@setu/upi-deep-links")

let setu = new SetuUPIDeepLink({
    schemeId: "YOUR SCHEME ID",
    jwtSecret: "YOUR JWT SECRET",
    setuProductInstanceId: "YOUR PRODUCT INSTANCE ID",
    mode: "PRODUCTION | SANDBOX",
    authType: "OAuth | JWT"
});
```
---

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
---

### Check status of UPI payment link

```
let data = await setu.checkPaymentStatus("platformBillID");
```
---

## License

MIT. Have at it.
