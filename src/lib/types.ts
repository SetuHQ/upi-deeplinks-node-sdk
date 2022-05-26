import {
    BatchRefundStatusResponseData,
    CreatePaymentLinkResponseData,
    Deduction,
    GetPaymentStatusResponseData,
    InitiateRefundAmount,
    InitiateRefundResponseData,
    RefundResponseSuccessData,
    Settlement,
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

/* Trigger Mock Payment */
export type TriggerMockPaymentParams = {
    readonly amountValue: number;
    readonly vpa: string;
    readonly platformBillID: string;
};

/* Refund */
export type InitiateRefundParams = {
    readonly refunds: readonly RefundRequest[];
};

type RefundRequest = InitiateRefundAmount & {
    readonly identifier: string;
    readonly identifierType: "BILL_ID";
    readonly deductions?: readonly Deduction[];
};

/* Global */
export type SetuUPIDeepLinkInstance = {
    readonly createPaymentLink: (body: CreatePaymentLinkParams) => Promise<CreatePaymentLinkResponseData>;
    readonly getPaymentStatus: (platformBillID: string) => Promise<GetPaymentStatusResponseData>;
    readonly expireBill: (platformBillID: string) => Promise<void>;
    readonly initiateRefund: (body: InitiateRefundParams) => Promise<InitiateRefundResponseData>;
    readonly getRefundBatchStatus: (batchID: string) => Promise<BatchRefundStatusResponseData>;
    readonly getRefundStatus: (refundID: string) => Promise<RefundResponseSuccessData>;
    readonly triggerMockPayment: (body: TriggerMockPaymentParams) => Promise<TriggerMockPaymentResponseData>;
};
