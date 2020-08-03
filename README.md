# Setu

This package helps you work with [Setu's](https://setu.co) deeplink APIs.

The following functions are supported

1. Generate UPI payment link
2. Check status of UPI payment link

## Installation

```
npm install @setuapis/upi-deep-link
```

## Configuration

```
const SetuUPIDeepLink = require("@setuapis/upi-deep-link")

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
    expiresInDays: Number,
    amountValue: Number,
    amountExactness: String,
    billerBillID: String,
    payeeName: String,
};

let data = await setu.createPaymentLink(paymentLinkBody);
```

### Check status of UPI payment link

```
let data = await setu.checkPaymentStatus("platformBillID");
```
