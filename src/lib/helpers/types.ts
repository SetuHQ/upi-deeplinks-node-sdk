import { AmountExactness, SetuError } from "../types";

/* Base Types */
export enum SetuEnv {
    SANDBOX = "SANDBOX",
    PRODUCTION = "PRODUCTION",
}

export enum AuthScheme {
    OAUTH = "OAUTH",
    JWT = "JWT",
}

export enum API {
    FETCH_TOKEN = "/auth/token",
    PAYMENT_LINK_BASE = "/payment-links",
    REFUND_BASE = "/refund",
    TRIGGER_MOCK_PAYMENT = "/triggers/funds/addCredit",
    EXPIRE_BILL = "/utilities/bills/%s/expire",
    REPORTS_BASE = "/reports",
}

export type SetuResponseBase<T> = {
    readonly status: number;
    readonly success: boolean;
    readonly error: SetuError;
    readonly data: T;
};

export type BillStatus =
    | "BILL_CREATED"
    | "PAYMENT_SUCCESSFUL"
    | "PAYMENT_FAILED"
    | "CREDIT_RECEIVED"
    | "SETTLEMENT_SUCCESSFUL"
    | "SETTLEMENT_FAILED"
    | "BILL_EXPIRED";

/* Entry point */
export type SetuUPIDeepLinkParams = {
    readonly schemeID: string;
    readonly secret: string;
    readonly productInstanceID: string;
    readonly mode: `${SetuEnv}`;
    readonly authType: `${AuthScheme}`;
};

/* Token Fetch Types */
export type FetchTokenResponseData = {
    readonly expiresIn: number;
    readonly token: string;
};

/* Create Payment Link Types */
export type CreatePaymentLinkData = {
    readonly name?: string;
    readonly transactionNote?: string;
    readonly amount: Amount;
    readonly expiryDate?: string;
    readonly billerBillID: string;
    readonly amountExactness: AmountExactness;
    readonly validationRules?: ValidationRules;
    readonly settlement?: Settlement;
    readonly additionalInfo?: Record<string, string>;
    readonly campaignID?: string;
};

export type Settlement = {
    readonly parts: readonly SettlementPart[];
    readonly primaryAccount: Account;
};

type SettlementPart = {
    readonly account: Account;
    readonly remarks: string;
    readonly split: Split;
};

type Split = {
    readonly unit: string;
    readonly value: number;
};

type Account = {
    readonly id: string;
    readonly ifsc: string;
};

type Amount = {
    readonly currencyCode: string;
    readonly value: number;
};

export type ValidationRules = {
    readonly amount?: AmountValidation;
    readonly sourceAccounts?: SourceAccounts;
};

type AmountValidation = {
    readonly minimum: number;
    readonly maximum: number;
};

type SourceAccounts = {
    readonly items: readonly SourceAccountItem[];
};

type SourceAccountItem = {
    readonly number: string;
    readonly ifsc: string;
};

export type CreatePaymentLinkResponseData = {
    readonly name: string;
    readonly paymentLink: PaymentLink;
    readonly platformBillID: string;
};

type PaymentLink = {
    readonly shortURL: string;
    readonly upiID: string;
    readonly upiLink: string;
};

/* Get Payment Status Types */
export type GetPaymentStatusResponseData = {
    readonly amountPaid: Amount;
    readonly billerBillID: string;
    readonly createdAt: string;
    readonly expiresAt: string;
    readonly name: string;
    readonly payerVpa: string;
    readonly paymentLink: PaymentLink;
    readonly platformBillID: string;
    readonly receipt: Receipt;
    readonly status: BillStatus;
    readonly transactionNote: string;
};

type Receipt = {
    readonly date: string;
    readonly id: string;
};

/* Trigger Mock Payment Types */
export type TriggerMockPaymentData = {
    readonly amount: number;
    readonly destinationAccount: DestinationAccount;
    readonly sourceAccount: DestinationAccount;
    readonly transactionReference: string;
    readonly type: "UPI" | "ACCOUNT";
};

type DestinationAccount = {
    readonly accountID: string;
};

export type TriggerMockPaymentResponseData = {
    readonly utr: string;
};

/* Refund Types */
export type InitiateRefundData = {
    readonly refunds: readonly RefundRequestItem[];
};

type InitiateRefundPartialAmountParams = {
    readonly refundType: "PARTIAL";
    readonly refundAmount: number;
};

type InitiateRefundPartialAmount = {
    readonly refundType: "PARTIAL";
    readonly refundAmount: Amount;
};

type InitiateRefundFullAmount = {
    readonly refundType: "FULL";
};

export type InitiateRefundAmountParams = InitiateRefundPartialAmountParams | InitiateRefundFullAmount;
type InitiateRefundAmount = InitiateRefundPartialAmount | InitiateRefundFullAmount;

export type RefundRequestItem = InitiateRefundAmount & {
    readonly seqNo: number;
    readonly identifier: string;
    readonly identifierType: "BILL_ID";
    readonly deductions?: readonly Deduction[];
};

export type Deduction = {
    readonly account: Account;
    readonly split: Split;
};

export type InitiateRefundResponseData = {
    readonly batchID: string;
    readonly refunds: readonly RefundResponseDataItem[];
};

type RefundResponseErrorData = {
    readonly code: string;
    readonly detail: string;
    readonly title: string;
};

type RefundStatus = "Created" | "MarkedForRefund" | "QueuedForRefund" | "Rejected" | "Initiated";

export type RefundResponseSuccessData = {
    readonly id: string;
    readonly billID: string;
    readonly transactionRefID: string;
    readonly status: RefundStatus;
    readonly amount: Amount;
    readonly deductions: readonly Deduction[];
    readonly initiatedAt?: string;
};

type RefundResponseDataItem =
    | ({
          readonly success: true;
          readonly seqNo: number;
      } & RefundResponseSuccessData)
    | ({
          readonly success: false;
          readonly seqNo: number;
      } & RefundResponseErrorData);

export type BatchRefundStatusResponseData = {
    readonly batchID: string;
    readonly refunds: readonly RefundResponseSuccessData[];
};
