import { AmountExactness } from "../types";

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
    TRIGGER_MOCK_PAYMENT = "/triggers/funds/addCredit",
    EXPIRE_BILL = "/utilities/bills/%s/expire",
    REPORTS_BASE = "/reports",
}

export type SetuResponseBase = {
    readonly status: number;
    readonly success: boolean;
};

/* Entry point */
export type SetuUPIDeepLinkParams = {
    readonly schemeID: string;
    readonly secret: string;
    readonly productInstanceID: string;
    readonly mode: `${SetuEnv}`;
    readonly authType: `${AuthScheme}`;
};

/* Token Fetch Types */
export type FetchTokenResponse = SetuResponseBase & {
    readonly data: FetchTokenResponseData;
};

type FetchTokenResponseData = {
    readonly expiresIn: number;
    readonly token: string;
};

/* Create Payment Link Types */
export type CreatePaymentLinkData = {
    readonly amount: Amount;
    readonly amountExactness: AmountExactness;
    readonly billerBillID: string;
    readonly expiryDate?: string;
    readonly name?: string;
    readonly settlement?: Settlement;
    readonly transactionNote?: string;
    readonly validationRules?: ValidationRules;
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
    readonly amount: AmountValidation;
    readonly sourceAccounts: SourceAccounts;
};

type AmountValidation = {
    readonly minimum: number;
    readonly maximum: number;
};

type SourceAccounts = {
    readonly items: SourceAccountItem;
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
    readonly status: string;
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
