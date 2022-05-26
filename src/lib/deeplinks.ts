import { AxiosError } from "axios";

import { bodyHelpers } from "./helpers/body";
import { getURLPath } from "./helpers/endpoint";
import { getAxiosInstance, setuErrorHandler } from "./helpers/request";
import {
    API,
    BatchRefundStatusResponseData,
    CreatePaymentLinkResponseData,
    GetPaymentStatusResponseData,
    InitiateRefundResponseData,
    RefundResponseSuccessData,
    SetuResponseBase,
    SetuUPIDeepLinkParams,
    TriggerMockPaymentResponseData,
} from "./helpers/types";
import {
    CreatePaymentLinkParams,
    InitiateRefundParams,
    SetuError,
    SetuUPIDeepLinkInstance,
    TriggerMockPaymentParams,
} from "./types";

export const SetuUPIDeepLink = (params: SetuUPIDeepLinkParams): SetuUPIDeepLinkInstance => {
    const collectAxiosInstance = getAxiosInstance(params);

    // Payment Link APIs
    const createPaymentLink = async (body: CreatePaymentLinkParams): Promise<CreatePaymentLinkResponseData> => {
        try {
            const { data: response } = await collectAxiosInstance.post<SetuResponseBase<CreatePaymentLinkResponseData>>(
                getURLPath(params.mode, params.authType, API.PAYMENT_LINK_BASE),
                bodyHelpers.createPaymentLink(body)
            );
            return response.data;
        } catch (err) {
            return setuErrorHandler(err as AxiosError<SetuResponseBase<unknown>>);
        }
    };

    const getPaymentStatus = async (platformBillID: string): Promise<GetPaymentStatusResponseData> => {
        try {
            const { data: response } = await collectAxiosInstance.get<SetuResponseBase<GetPaymentStatusResponseData>>(
                `${getURLPath(params.mode, params.authType, API.PAYMENT_LINK_BASE)}/${platformBillID}`
            );
            return response.data;
        } catch (err) {
            return setuErrorHandler(err as AxiosError<SetuResponseBase<unknown>>);
        }
    };

    const expireBill = async (platformBillID: string): Promise<void> => {
        try {
            await collectAxiosInstance.post<SetuResponseBase<never>>(
                getURLPath(params.mode, params.authType, API.EXPIRE_BILL).replace("%s", platformBillID)
            );
        } catch (err) {
            return setuErrorHandler(err as AxiosError<SetuResponseBase<unknown>>);
        }
    };

    // Refund APIs
    const initiateRefund = async (body: InitiateRefundParams): Promise<InitiateRefundResponseData> => {
        try {
            const { data: response } = await collectAxiosInstance.post<SetuResponseBase<InitiateRefundResponseData>>(
                `${getURLPath(params.mode, params.authType, API.REFUND_BASE)}/batch`,
                bodyHelpers.initiateRefund(body)
            );
            return response.data;
        } catch (err) {
            return setuErrorHandler(err as AxiosError<SetuResponseBase<unknown>>);
        }
    };

    const getRefundBatchStatus = async (batchID: string): Promise<BatchRefundStatusResponseData> => {
        try {
            const { data: response } = await collectAxiosInstance.get<SetuResponseBase<BatchRefundStatusResponseData>>(
                `${getURLPath(params.mode, params.authType, API.REFUND_BASE)}/batch/${batchID}`
            );
            return response.data;
        } catch (err) {
            return setuErrorHandler(err as AxiosError<SetuResponseBase<unknown>>);
        }
    };

    const getRefundStatus = async (refundID: string): Promise<RefundResponseSuccessData> => {
        try {
            const { data: response } = await collectAxiosInstance.get<SetuResponseBase<RefundResponseSuccessData>>(
                `${getURLPath(params.mode, params.authType, API.REFUND_BASE)}/${refundID}`
            );
            return response.data;
        } catch (err) {
            return setuErrorHandler(err as AxiosError<SetuResponseBase<unknown>>);
        }
    };

    // Sandbox testing helper APIs
    const triggerMockPayment = async (body: TriggerMockPaymentParams): Promise<TriggerMockPaymentResponseData> => {
        try {
            const { data: response } = await collectAxiosInstance.post<
                SetuResponseBase<TriggerMockPaymentResponseData>
            >(getURLPath(params.mode, params.authType, API.TRIGGER_MOCK_PAYMENT), bodyHelpers.triggerMockPayment(body));
            return response.data;
        } catch (err) {
            return setuErrorHandler(err as AxiosError<SetuResponseBase<unknown>>);
        }
    };

    // Helper methods
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isSetuError = (err: any): err is SetuError => {
        return typeof err.code === "string" && typeof err.detail === "string";
    };

    return {
        createPaymentLink,
        getPaymentStatus,
        expireBill,
        initiateRefund,
        getRefundBatchStatus,
        getRefundStatus,
        triggerMockPayment,
        isSetuError,
    };
};
