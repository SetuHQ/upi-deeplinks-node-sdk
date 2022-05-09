import test from "ava";

import { CreatePaymentLinkParams, TriggerMockPaymentParams } from "../types";

import { bodyHelpers } from "./body";
import { CreatePaymentLinkData, TriggerMockPaymentData } from "./types";

test("createPaymentLink", (t) => {
    const createPaymentLinkParams: CreatePaymentLinkParams = {
        amountValue: 123,
        billerBillID: "Test Create Payment Link",
        amountExactness: "EXACT",
    };

    const createPaymentLinkBody: CreatePaymentLinkData = {
        amount: {
            currencyCode: "INR",
            value: 123,
        },
        billerBillID: "Test Create Payment Link",
        amountExactness: "EXACT",
    };

    t.deepEqual(bodyHelpers.createPaymentLink(createPaymentLinkParams), createPaymentLinkBody);
});

test("triggerMockPayment", (t) => {
    const triggerMockPaymentParams: TriggerMockPaymentParams = {
        amountValue: 123,
        platformBillID: "888321883001325112",
        vpa: "nareshlocal@kaypay",
    };

    const triggerMockPaymentBody: TriggerMockPaymentData = {
        amount: 123,
        destinationAccount: {
            accountID: "nareshlocal@kaypay",
        },
        sourceAccount: {
            accountID: "customer@vpa",
        },
        transactionReference: "888321883001325112",
        type: "UPI",
    };

    t.deepEqual(bodyHelpers.triggerMockPayment(triggerMockPaymentParams), triggerMockPaymentBody);
});
