import { CreatePaymentLinkParams, InitiateRefundParams, TriggerMockPaymentParams } from "../types";

import { CreatePaymentLinkData, InitiateRefundData, RefundRequestItem, TriggerMockPaymentData } from "./types";

const createPaymentLink = ({
    amountValue,
    billerBillID,
    payeeName,
    expiryDate,
    amountExactness,
    settlement,
    validationRules,
    transactionNote,
    additionalInfo,
    campaignID,
}: CreatePaymentLinkParams): CreatePaymentLinkData => {
    return {
        amount: {
            currencyCode: "INR",
            value: amountValue,
        },
        amountExactness: amountExactness,
        billerBillID: billerBillID,
        ...(expiryDate && { expiryDate }),
        ...(payeeName && { name: payeeName }),
        ...(settlement && { settlement }),
        ...(validationRules && { validationRules }),
        ...(transactionNote && { transactionNote }),
        ...(additionalInfo && { additionalInfo }),
        ...(campaignID && { campaignID }),
    };
};

const initiateRefund = ({ refunds }: InitiateRefundParams): InitiateRefundData => {
    return {
        refunds: refunds.map(
            ({ identifier, identifierType, deductions, ...params }, seqNo) =>
                ({
                    seqNo,
                    identifier,
                    identifierType,
                    deductions,
                    refundType: params.refundType,
                    ...(params.refundType === "PARTIAL" && { refundAmount: params.refundAmount }),
                } as RefundRequestItem)
        ),
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
    initiateRefund,
    triggerMockPayment,
};
