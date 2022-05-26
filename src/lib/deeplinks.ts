import { bodyHelpers } from "./helpers/body";
import { getURLPath } from "./helpers/endpoint";
import { getAxiosInstance } from "./helpers/request";
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
    SetuUPIDeepLinkInstance,
    TriggerMockPaymentParams,
} from "./types";

export const SetuUPIDeepLink = (params: SetuUPIDeepLinkParams): SetuUPIDeepLinkInstance => {
    const collectAxiosInstance = getAxiosInstance(params);

    // Payment Link APIs
    const createPaymentLink = async (body: CreatePaymentLinkParams): Promise<CreatePaymentLinkResponseData> => {
        const { data } = await collectAxiosInstance.post<
            CreatePaymentLinkResponseData,
            SetuResponseBase<CreatePaymentLinkResponseData>
        >(getURLPath(params.mode, params.authType, API.PAYMENT_LINK_BASE), bodyHelpers.createPaymentLink(body));
        return data;
    };

    const getPaymentStatus = async (platformBillID: string): Promise<GetPaymentStatusResponseData> => {
        const { data } = await collectAxiosInstance.get<
            GetPaymentStatusResponseData,
            SetuResponseBase<GetPaymentStatusResponseData>
        >(`${getURLPath(params.mode, params.authType, API.PAYMENT_LINK_BASE)}/${platformBillID}`);
        return data;
    };

    const expireBill = async (platformBillID: string): Promise<void> => {
        await collectAxiosInstance.post<never, SetuResponseBase<never>>(
            getURLPath(params.mode, params.authType, API.EXPIRE_BILL).replace("%s", platformBillID)
        );
    };

    // Refund APIs
    const initiateRefund = async (body: InitiateRefundParams): Promise<InitiateRefundResponseData> => {
        const { data } = await collectAxiosInstance.post<
            InitiateRefundResponseData,
            SetuResponseBase<InitiateRefundResponseData>
        >(`${getURLPath(params.mode, params.authType, API.REFUND_BASE)}/batch`, bodyHelpers.initiateRefund(body));
        return data;
    };

    const getRefundBatchStatus = async (batchID: string): Promise<BatchRefundStatusResponseData> => {
        const { data } = await collectAxiosInstance.get<
            BatchRefundStatusResponseData,
            SetuResponseBase<BatchRefundStatusResponseData>
        >(`${getURLPath(params.mode, params.authType, API.REFUND_BASE)}/batch/${batchID}`);
        return data;
    };

    const getRefundStatus = async (refundID: string): Promise<RefundResponseSuccessData> => {
        const { data } = await collectAxiosInstance.get<
            RefundResponseSuccessData,
            SetuResponseBase<RefundResponseSuccessData>
        >(`${getURLPath(params.mode, params.authType, API.REFUND_BASE)}/${refundID}`);
        return data;
    };

    // Sandbox testing helper APIs
    const triggerMockPayment = async (body: TriggerMockPaymentParams): Promise<TriggerMockPaymentResponseData> => {
        const { data } = await collectAxiosInstance.post<
            TriggerMockPaymentResponseData,
            SetuResponseBase<TriggerMockPaymentResponseData>
        >(getURLPath(params.mode, params.authType, API.TRIGGER_MOCK_PAYMENT), bodyHelpers.triggerMockPayment(body));
        return data;
    };

    return {
        createPaymentLink,
        getPaymentStatus,
        expireBill,
        initiateRefund,
        getRefundBatchStatus,
        getRefundStatus,
        triggerMockPayment,
    };
};
