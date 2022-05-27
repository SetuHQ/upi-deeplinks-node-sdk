# Setu UPI Deeplinks: NodeJS SDK

`@setu/upi-deep-links` is a NodeJS SDK for accessing Setu’s [UPI Deeplinks](https://docs.setu.co/collect/biller/upi-deep-links) APIs. The SDK is designed with ease of access in mind, with full TypeScript support.

[![Version](https://img.shields.io/npm/v/@setu/upi-deep-links?color=%2320014B)](https://www.npmjs.org/package/@setu/upi-deep-links)
[![Downloads](https://img.shields.io/npm/dw/@setu/upi-deep-links?color=%23FEB452)](https://www.npmjs.org/package/@setu/upi-deep-links)
[![Size](https://img.shields.io/bundlephobia/min/@setu/upi-deep-links?color=%2336A168)](https://bundlephobia.com/package/@setu/upi-deep-links)
[![License](https://img.shields.io/npm/l/@setu/upi-deep-links?color=%23FE90A0)](LICENSE.md)

<img src="https://raw.githubusercontent.com/SetuHQ/node-upi-deep-links/master/docs/deeplinks.png" alt="SDK in action" width="100%">

## Getting started

[SDK documentation →](https://opensource.setu.co/node-upi-deep-links)  
[Full documentation →](https://docs.setu.co/payments/upi-deeplinks)  
[Product overview →](https://setu.co/payments/upi-deeplinks)

### Installation

-   npm

```bash
npm install @setu/upi-deep-links
```

-   yarn

```bash
yarn add @setu/upi-deep-links
```

### Features

-   Full support for latest UPI Deeplinks APIs
-   Type definitions for all inputs & outputs
-   Allows both [JWT](https://docs.setu.co/payments/upi-deeplinks/resources/jwt) & [OAuth](https://docs.setu.co/payments/upi-deeplinks/resources/oauth) authentication mechanisms
-   `SANDBOX` mode to test integration & `PRODUCTION` for live data
-   Internal mechanism for OAuth authentication to automatically re-fetch token when current one expires, and retry all failed requests.

## Examples

### Setup

```js
import { SetuUPIDeepLink } from "@setu/upi-deep-links";

const upidl = SetuUPIDeepLink({
    schemeID: "5bf4376b-6008-43c8-8ce0-a5ea196e3091",
    secret: "9975fd99-d5ed-416a-9963-5d113dc80582",
    productInstanceID: "861023031961584801",
    mode: "SANDBOX",
    authType: "JWT",
});
```

### Generate UPI payment link

```ts
const paymentLinkBody = {
    amountValue: 20000, // amount in paisa
    billerBillID: "918147077472", // Unique merchant platform identifier for bill
    amountExactness: "EXACT",
    // Optional fields
    settlement: {
        parts: [
            {
                account: {
                    id: "987654321",
                    ifsc: "KKBK0000001",
                },
                remarks: "EXACT sample split",
                split: {
                    unit: "INR",
                    value: 10000,
                },
            },
        ],
        primaryAccount: {
            id: "123456789",
            ifsc: "KKBK0000001",
        },
    },
};

const data = await upiDL.createPaymentLink(paymentLinkBody);
```

### Check status of UPI payment link

```ts
const data = await upiDL.checkPaymentStatus("891365293916423373");
```

### Trigger mock payment for UPI payment link (Sandbox only)

```ts
const data = await upidl.triggerMockPayment({
    amountValue: 200, // amount in rupees
    platformBillID: "891365293916423373",
    vpa: "nareshlocal@kaypay", // Merchant VPA
});
```

### Expire a UPI payment link

```ts
const data = await upiDL.expireBill("891365293916423373");
```

### Initiate refunds

```ts
const data = await upiDL.initiateRefund({
    refunds: [
        {
            identifier: platformBillID,
            identifierType: "BILL_ID",
            refundType: "FULL",
            deductions: [
                {
                    account: {
                        id: "123456789",
                        ifsc: "KKBK0000001",
                    },
                    split: {
                        unit: "INR",
                        value: 10000,
                    },
                },
                {
                    account: {
                        id: "987654321",
                        ifsc: "KKBK0000001",
                    },
                    split: {
                        unit: "INR",
                        value: 10000,
                    },
                },
            ],
        },
    ],
});
```

### Get refund batch status

```ts
const data = await upiDL.getRefundBatchStatus(initiateRefundResponse.batchID);
```

### Get individual refund status

```ts
const data = await upiDL.getRefundStatus(getRefundBatchStatusResponse.refunds[0].id);
```

## Contributing

Have a look through existing [Issues](https://github.com/SetuHQ/node-upi-deep-links/issues) and [Pull Requests](https://github.com/SetuHQ/node-upi-deep-links/pulls) that you could help with. If you'd like to request a feature or report a bug, please [create a GitHub Issue](https://github.com/SetuHQ/node-upi-deep-links/issues) using the template provided.

[See contribution guide →](.github/CONTRIBUTING.md)

## License

MIT. Have at it.
