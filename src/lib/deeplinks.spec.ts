/* eslint-disable functional/immutable-data */
import avaTest, { TestInterface } from "ava";

import { SetuUPIDeepLink } from "./deeplinks";
import { AmountExactness, SetuUPIDeepLinkInstance } from "./types";

const merchantAccount = {
    id: "987654321",
    ifsc: "KKBK0000001",
};

const primaryAccount = {
    id: "123456789",
    ifsc: "KKBK0000001",
};

const sleep = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

// eslint-disable-next-line functional/prefer-readonly-type
const test = avaTest as TestInterface<{ upiDL: SetuUPIDeepLinkInstance; v1UPIDL: SetuUPIDeepLinkInstance }>;

test.before((t) => {
    const upiDL = SetuUPIDeepLink({
        schemeID: "c4f57443-dc1e-428f-8c4e-e5fd531057d2",
        secret: "5b288618-473f-4193-ae1b-8c42f223798e",
        productInstanceID: "861023031961584801",
        mode: "SANDBOX",
        authType: "OAUTH",
    });
    t.context.upiDL = upiDL;

    const v1UPIDL = SetuUPIDeepLink({
        schemeID: "5bf4376b-6008-43c8-8ce0-a5ea196e3091",
        secret: "9975fd99-d5ed-416a-9963-5d113dc80582",
        productInstanceID: "861023031961584801",
        mode: "SANDBOX",
        authType: "JWT",
    });
    t.context.v1UPIDL = v1UPIDL;
});

test("Create and make payment for DL", async (t) => {
    const { upiDL } = t.context;

    const paymentLinkBody = {
        amountValue: 20000,
        billerBillID: "918147077472",
        amountExactness: "EXACT" as AmountExactness,
    };

    const createPaymentLinkResponse = await upiDL.createPaymentLink(paymentLinkBody);
    t.is(createPaymentLinkResponse.paymentLink.upiID, "refundtest@kaypay");
    const { platformBillID } = createPaymentLinkResponse;

    const paymentStatusResponse = await upiDL.getPaymentStatus(platformBillID);
    t.is(paymentStatusResponse.status, "BILL_CREATED");

    await upiDL.triggerMockPayment({
        amountValue: 200,
        platformBillID: platformBillID,
        vpa: "refundtest@kaypay",
    });

    await sleep(3000);

    const newPaymentStatusResponse = await upiDL.getPaymentStatus(platformBillID);
    t.is(newPaymentStatusResponse.status, "PAYMENT_SUCCESSFUL");
});

test("Make payment for DL and initiate refund", async (t) => {
    const { upiDL } = t.context;

    const paymentLinkBody = {
        amountValue: 20000,
        billerBillID: "918147077472",
        amountExactness: "EXACT" as AmountExactness,
        settlement: {
            parts: [
                {
                    account: merchantAccount,
                    remarks: "EXACT sample split",
                    split: {
                        unit: "INR",
                        value: 10000,
                    },
                },
            ],
            primaryAccount,
        },
    };

    const createPaymentLinkResponse = await upiDL.createPaymentLink(paymentLinkBody);
    t.is(createPaymentLinkResponse.paymentLink.upiID, "refundtest@kaypay");
    const { platformBillID } = createPaymentLinkResponse;

    await upiDL.triggerMockPayment({
        amountValue: 200,
        platformBillID: platformBillID,
        vpa: "refundtest@kaypay",
    });

    await sleep(3000);

    const initiateRefundResponse = await upiDL.initiateRefund({
        refunds: [
            {
                identifier: platformBillID,
                identifierType: "BILL_ID",
                refundType: "PARTIAL",
                refundAmount: 10000,
                deductions: [
                    {
                        account: merchantAccount,
                        split: {
                            unit: "INR",
                            value: 5000,
                        },
                    },
                    {
                        account: primaryAccount,
                        split: {
                            unit: "INR",
                            value: 5000,
                        },
                    },
                ],
            },
        ],
    });

    t.true(
        initiateRefundResponse.refunds[0].success === true && initiateRefundResponse.refunds[0].status === "Created"
    );

    const getRefundBatchStatusResponse = await upiDL.getRefundBatchStatus(initiateRefundResponse.batchID);
    t.is(getRefundBatchStatusResponse.refunds[0].billID, platformBillID);

    const getRefundStatusByBatchResponse = await upiDL.getRefundStatusByIdentifier(
        "batch",
        initiateRefundResponse.batchID
    );
    t.is(getRefundStatusByBatchResponse.refunds[0].billID, platformBillID);

    const getRefundStatusByBillResponse = await upiDL.getRefundStatusByIdentifier("bill", platformBillID);
    t.is(getRefundStatusByBillResponse.refunds[0].status, "Created");

    const getRefundStatusResponse = await upiDL.getRefundStatus(getRefundBatchStatusResponse.refunds[0].id);
    t.is(getRefundStatusResponse.billID, platformBillID);

    const newInitiateRefundResponse = await upiDL.initiateRefund({
        refunds: [
            {
                identifier: platformBillID,
                identifierType: "BILL_ID",
                refundType: "FULL",
                deductions: [
                    {
                        account: merchantAccount,
                        split: {
                            unit: "INR",
                            value: 10000,
                        },
                    },
                    {
                        account: primaryAccount,
                        split: {
                            unit: "INR",
                            value: 10000,
                        },
                    },
                ],
            },
        ],
    });

    t.true(newInitiateRefundResponse.refunds[0].success === false);
});

test("Create and expire DL using V1 auth", async (t) => {
    const { v1UPIDL: upiDL } = t.context;

    const paymentLinkBody = {
        amountValue: 20000,
        billerBillID: "918147077472",
        amountExactness: "EXACT" as AmountExactness,
    };

    const createPaymentLinkResponse = await upiDL.createPaymentLink(paymentLinkBody);
    t.is(createPaymentLinkResponse.paymentLink.upiID, "refundtest@kaypay");
    const newPlatformBillID = createPaymentLinkResponse.platformBillID;

    await upiDL.expireBill(newPlatformBillID);

    const paymentStatusResponse = await upiDL.getPaymentStatus(newPlatformBillID);
    t.is(paymentStatusResponse.status, "BILL_EXPIRED");
});

test("Create DL using invalid keys", async (t) => {
    const upiDL = SetuUPIDeepLink({
        schemeID: "invalid-scheme-id",
        secret: "invalid-secret",
        productInstanceID: "861023031961584801",
        mode: "SANDBOX",
        authType: "OAUTH",
    });

    try {
        const paymentLinkBody = {
            amountValue: 20000,
            billerBillID: "918147077472",
            amountExactness: "EXACT" as AmountExactness,
        };
        await upiDL.createPaymentLink(paymentLinkBody);
    } catch (err) {
        if (upiDL.isSetuError(err)) {
            t.is(err.code, "invalid-api-key");
        }
    }
});

test.skip("Refresh keys automatically", async (t) => {
    const { upiDL } = t.context;
    t.plan(5);

    // eslint-disable-next-line functional/no-loop-statement, functional/no-let
    for (let i = 0; i < 5; ++i) {
        try {
            const paymentLinkBody = {
                amountValue: 20000,
                billerBillID: "918147077472",
                amountExactness: "EXACT" as AmountExactness,
            };
            const createPaymentLinkResponse = await upiDL.createPaymentLink(paymentLinkBody);
            t.is(createPaymentLinkResponse.paymentLink.upiID, "refundtest@kaypay");
            await sleep(15000);
        } catch (err) {
            if (upiDL.isSetuError(err)) {
                t.log("This should not happen");
            }
        }
    }
});
