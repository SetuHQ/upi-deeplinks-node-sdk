import {
    CreatePaymentLinkResponseData,
    GetPaymentStatusResponseData,
    Settlement,
    SetuResponseBase,
    TriggerMockPaymentResponseData,
    ValidationRules,
} from "./helpers/types";

/* Common */
export type AmountExactness = "ANY" | "EXACT" | "EXACT_UP" | "EXACT_DOWN" | "RANGE";

/* Create Payment Link */
export type CreatePaymentLinkParams = {
    readonly amountValue: number;
    readonly billerBillID: string;
    readonly amountExactness: AmountExactness;
    readonly payeeName?: string;
    readonly expiryDate?: string;
    readonly settlement?: Settlement;
    readonly validationRules?: ValidationRules;
    readonly transactionNote?: string;
    readonly additionalInfo?: Record<string, string>;
    readonly campaignID?: string;
};

export type CreatePaymentLinkResponse = SetuResponseBase & {
    readonly data: CreatePaymentLinkResponseData;
};

/* Get Payment Status */
export type GetPaymentStatusResponse = SetuResponseBase & {
    readonly data: GetPaymentStatusResponseData;
};

/* Trigger Mock Payment */
export type TriggerMockPaymentParams = {
    readonly amountValue: number;
    readonly vpa: string;
    readonly platformBillID: string;
};

export type TriggerMockPaymentResponse = SetuResponseBase & {
    readonly data: TriggerMockPaymentResponseData;
};
