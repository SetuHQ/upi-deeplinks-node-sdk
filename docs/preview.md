```ts
import { SetuUPIDeepLink } from "@setu/upi-deep-links";

const upidl = SetuUPIDeepLink({
    schemeID: "YOUR SCHEME ID",
    secret: "YOUR SECRET",
    productInstanceID: "YOUR PRODUCT INSTANCE ID",
    mode: "SANDBOX" | "PRODUCTION",
    authType: "JWT" | "OAUTH",
});

const paymentLinkResponse = await upiDL.createPaymentLink({
    amountValue: 10000,
    billerBillID: "ABCDE12345",
    amountExactness: "ANY" | "EXACT" | "EXACT_UP" | "EXACT_DOWN" | "RANGE",
});

const setuBillID = paymentLinkResponse.platformBillID;
const vpa = paymentLinkResponse.paymentLink.upiID;

const paymentResponse = await upiDL.triggerMockPayment({
    amountValue: 100,
    platformBillID: setuBillID,
    vpa,
});

const statusResponse = await upiDL.getPaymentStatus(setuBillID);
```
