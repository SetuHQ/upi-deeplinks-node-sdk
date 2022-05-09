import test from "ava";

import { CreatePaymentLinkParams, TriggerMockPaymentParams } from "../types";

import { bodyHelpers } from "./body";
import { CreatePaymentLinkData, TriggerMockPaymentData } from "./types";

test("createPaymentLink", (t) => {
    const dateNow = new Date();

    const createPaymentLinkParams: CreatePaymentLinkParams = {
        amountValue: 10000,
        billerBillID: "ABCDEF-121212",
        amountExactness: "EXACT",
        payeeName: "Naresh",
        expiryDate: dateNow.toISOString(),
        transactionNote: "Payment for your purchase at Setu",
        settlement: {
            parts: [
                {
                    account: {
                        id: "Biller-External-002",
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
                id: "Biller-External-001",
                ifsc: "KKBK0000001",
            },
        },
        validationRules: {
            amount: {
                maximum: 10000,
                minimum: 10000,
            },
            sourceAccounts: {
                items: [{ number: "9009120939129", ifsc: "SETU0000012" }],
            },
        },
        additionalInfo: {
            fruit: "strawberry",
            flower: "sunflower",
        },
        campaignID: "Fruits & flowers campaign",
    };

    const createPaymentLinkBody: CreatePaymentLinkData = {
        amount: {
            currencyCode: "INR",
            value: 10000,
        },
        billerBillID: "ABCDEF-121212",
        amountExactness: "EXACT",
        name: "Naresh",
        expiryDate: dateNow.toISOString(),
        transactionNote: "Payment for your purchase at Setu",
        settlement: {
            parts: [
                {
                    account: {
                        id: "Biller-External-002",
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
                id: "Biller-External-001",
                ifsc: "KKBK0000001",
            },
        },
        validationRules: {
            amount: {
                maximum: 10000,
                minimum: 10000,
            },
            sourceAccounts: {
                items: [{ number: "9009120939129", ifsc: "SETU0000012" }],
            },
        },
        additionalInfo: {
            fruit: "strawberry",
            flower: "sunflower",
        },
        campaignID: "Fruits & flowers campaign",
    };

    t.deepEqual(bodyHelpers.createPaymentLink(createPaymentLinkParams), createPaymentLinkBody);
});

test("triggerMockPayment", (t) => {
    const triggerMockPaymentParams: TriggerMockPaymentParams = {
        amountValue: 10000,
        platformBillID: "888321883001325112",
        vpa: "nareshlocal@kaypay",
    };

    const triggerMockPaymentBody: TriggerMockPaymentData = {
        amount: 10000,
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
