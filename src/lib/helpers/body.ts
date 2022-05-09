import { CreatePaymentLinkParams, TriggerMockPaymentParams } from "../types";

import { CreatePaymentLinkData, TriggerMockPaymentData } from "./types";

const createPaymentLink = ({
    amountValue,
    billerBillID,
    payeeName,
    dueDate,
    expiryDate,
    amountExactness,
    settlement,
    validationRules,
    transactionNote,
}: CreatePaymentLinkParams): CreatePaymentLinkData => {
    return {
        amount: {
            currencyCode: "INR",
            value: amountValue,
        },
        amountExactness: amountExactness,
        billerBillID: billerBillID,
        ...(dueDate && { dueDate }),
        ...(expiryDate && { expiryDate }),
        ...(payeeName && { name: payeeName }),
        ...(settlement && { settlement }),
        ...(validationRules && {}),
        ...(transactionNote && { transactionNote }),
    };
};

const triggerMockPayment = ({ amountValue, vpa, platformBillID }: TriggerMockPaymentParams): TriggerMockPaymentData => {
    return {
        amount: amountValue,
        destinationAccount: {
            accountID: vpa,
        },
        sourceAccount: {
            accountID: "customer@vpa",
        },
        transactionReference: platformBillID,
        type: "UPI",
    };
};

export const bodyHelpers = {
    createPaymentLink,
    triggerMockPayment,
};
